import puppeteer,{ PuppeteerNode, Browser, Page } from 'puppeteer';
import ErroDeAtualizacaoRepo from '../../database/ORM/repositorio/ErroDeAtualizacaoRepo';
import { valoresPadrao } from '../../SSOT/base_de_dados/exporter';
import Aprovado from '../../database/ORM/modelo/Aprovado';
import { GerenciadorDeAtualizacoes } from '../utilitarios/exporter';
import { bot } from '../../SSOT/exporter';

//  TODO:: Decidir se quem vai usar essa classe e apenas alguem com o papel de
//  administrador ou qualquer um
class BotsPuppeteer{
  //se o url nao for esse todo o processamento deve ser refeito
  protected static userAgentPadrao: string = "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
  protected static urlBuscaBB: string = "https://www49.bb.com.br/portalbb/resultadoConcursos/resultadoconcursos/arh0.bbx";

  protected botManager: PuppeteerNode;
  protected atualizando: boolean;

  constructor(){
    this.botManager = puppeteer;
    this.atualizando = false;
  }
  

  //  apenas uma instancia do puppeteer pode rodar por vez, para nao sobrecarregar o sistema do banco
  protected setAtualizando( valor: boolean ){
    this.atualizando = valor;
  }

  //  TODO:: criar propriedade com uma instancia do puppeteer
  protected async gerarBrowser(): Promise<Browser>{
    const browser = await this.botManager.launch({ 
      headless: "new",
      //  entender origem desse bug depois
       args: [
        '--no-sandbox',
      ]
    });

    return browser;
  }

  protected async gerarPagina( browser: Browser, token: string,userAgent?: string): Promise<Page>{

    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'User-Agent': userAgent ? userAgent : BotsPuppeteer.userAgentPadrao,
      'Accept':'*/*',
      'Accept-Language':'pr-BR,pt;q=0.8,en-US;q=0.5;q=0.3',
      'Accept-Encoding':'gzip, dflate, bt',
      'Connection':'keep-alive',
      'Sec-Fetch-Dest':'script',
      'Sec-Fetch-Mode':'no-cors',
      'Sec-Fetch-Site':'same-origin'
    });

    //  indica que a pagina do browser vai interceptar as requisicoes que esta enviado ao servidor
    await page.setRequestInterception(true);

    //  indica a quais eventos a interceptacao de requisicao responde.
    page.on('request', async request => {
      const isPost = request.method() === "POST";
      const isMainPage = request.url().endsWith('arh0.bbx');

    //  como o browser nao responde as requisicoes do captcha da pagina o unico post enviado e para o servidor do bb
      if ( isMainPage && isPost ) {
        const reqData = request.postData();

        if( reqData ){
          const postData = { postData: reqData.replace('g-recaptcha-response',`g-recaptcha-response=${token}`)};
          await request.continue(postData);
        }
      } else {
        await request.continue();
      }
    });

    return page;
  }

  protected async buscarPorAprovado( 
    page: Page, 
    url: string,
    input: string, 
    termoDeBusca: string 
  ): Promise<void>{
      await page.goto(url);
      //await page.keyboard.press('Enter'); await page.waitForSelector(input)

      await page.type(input,termoDeBusca);
      await page.keyboard.press("Enter")
      await page.waitForNavigation();
  }

  protected async atualizarPorNome(
    page: Page,
    seletorSituacao: string,
    aprovado: Aprovado,
    timeout: number = 4_000,
  ): Promise<void>{
    await page.waitForSelector(seletorSituacao, { timeout });
    const dados = await page.$eval(seletorSituacao,el => el.innerHTML);
    await GerenciadorDeAtualizacoes.atualizarAprovado(dados, aprovado);
  }

  protected async buscarEntreNomesRepetidos(
    page: Page,
    seletorNomes: string,
    seletorInscricao: string,
    seletorSituacao: string,
    aprovado: Aprovado,
    timeoutAtualizar: number = 4_000
  ){
    //  busca pela tag que tem os nomes repetidos
    await page.waitForSelector(seletorNomes);
    const tagIds : string[] = await page.$$eval(seletorNomes,(elementos,regiao,certame)=>{
      let matches: string[] = [];
      elementos.forEach((v) => {
        if(
          //  se a regiao for a mesma do concurso
          //  e a data do concurso estiver correta, o seletor e colocado na lista
          v.children[2].innerHTML === regiao && 
          v.children[3].children[0].innerHTML === certame
        ){
          matches.push(v.children[0].children[0].id);
        }
      })
      return matches;
    },"TI","2022/001");

    //  clica em cada um dos seletores com nomes repetidos
    //  checa se e a pessoa certa pelo numero da inscricao
    console.log(tagIds)
    for ( let id of tagIds ){
      id = `[id='${id}']`
      //  tenta encontrar o usuario checando o nome da inscricao e o nome
      try{

        await page.waitForSelector(id)
        const link = await page.$(id);
        //  se foi encontrado, o link vai existir
        await link!!.click();
        await page.waitForNavigation();
        await page.waitForSelector(seletorInscricao);

        const inscricaoPagina = await page.$eval(seletorInscricao, el => el.innerHTML.split(' ')[1]);
        const inscricaoAprovado = aprovado.inscricao.split('-')[0].replaceAll(' ','');


        if( inscricaoAprovado === inscricaoPagina ) {
          await this.atualizarPorNome(page, seletorSituacao,aprovado,timeoutAtualizar)
          break;
        } else {
          //  se os nomes estao repetidos o bot volta para a pagina anterior
          //  corrigindo os nomes
          await page.goBack() 
        }
      //  e possivel que exista mais de um aprovado com o mesmo nome
        //  como e um erro possivel e o bot tem erros (exceto os de conexao) nesse ponto
        //  nao vou inserir esses logs na base de dados
      } catch(e){
        console.log(e)
      }
    }

    console.log('after')
  }

  //  talvez seja uma boa ideia receber o user agent do cliente que resolveu a requisicao
  //  TODO:: interessante abstrait a atualizazao
  //  TODO:: Realizar testes de desenvolvimento
  public async atualizarAprovados(
    token: string,
    aprovados: Aprovado[],
    userAgent?: string,
  ): Promise<void>{
    //  inicializa uma pagina do bot
    //  WARNING:: atualizar para verdadeiro antes de colocar em producao
    if(this.atualizando){
      return;
    } 

    this.setAtualizando(true);

    const input = "input[name='formulario:nomePesquisa']";
    const situation = "table[border='0'] tr:nth-of-type(3) td b";
    const nomesRepetidos = "table[data-filter='#filter'] tbody tr";
    const tdInscricao = 'tbody tr:nth-of-type(2) td:nth-of-type(2)'

    //const browser: Browser = await this.gerarBrowser();
    const browser = await this.gerarBrowser();

    let page: Page = await this.gerarPagina(browser, token);
    
    for ( let i = 0; i < aprovados.length; i++ ){
      //  provavelmente o servidor esta parando o bot
      //  o que nao acontece se a sessao for reiniciada
      if ( i % 150 === 0) {
        await page.close()
        page = await this.gerarPagina(browser, token)
        //  gerando o bug inicial
        try{
          await this.buscarPorAprovado( page, BotsPuppeteer.urlBuscaBB , input, 'tanto faz, e pra forcar erro kkkkk');
        } catch(e) {
          //  TODO: armazenar logs de erros
          //  console.log(`erro!: ${e}`)
          await ErroDeAtualizacaoRepo.cadastrarErroDeAtualizacao(
            'timeout na busca do input para buscar o usuario',
            valoresPadrao.ErroDeAtualizacao.Puppeteer,
            aprovados[i].posicao
          )
        }
      }
      //  tenta encontrar a pessoa como se so houvesse ela com aquele nome
      try{
        await this.buscarPorAprovado( page, BotsPuppeteer.urlBuscaBB , input, aprovados[i].nome);
        //  nesse ponto pode  da erro
        await this.atualizarPorNome(page,situation,aprovados[i],4_000);
      } catch(e){
        //  caso nao a encontra, buscar por outras pessoas com o mesmo nome
        //  selecionando uma lista de pessoas com o mesmo nome, 
        //  da mesma microrregiao e concurso
        //  verificando que me quem pelo numero de inscricao depois
        /*
          await ErroDeAtualizacaoRepo.cadastrarErroDeAtualizacao(
            'timeout na busca do input para buscar o usuario',
            valoresPadrao.ErroDeAtualizacao.Puppeteer,
            aprovados[i].posicao
          )
        */
        //  nao tenho certeza se vale a pena armazenas esse logs...
        //  e comum encontrar mais de um aprovado com o mesmo nome
        try {
          await this.buscarEntreNomesRepetidos(page,nomesRepetidos,tdInscricao,situation,aprovados[i],4_000);
        } catch(e) {
          await ErroDeAtualizacaoRepo.cadastrarErroDeAtualizacao(
            'erro apos tentar buscar aprovados com nomes iguais num mesmo concurso',
            valoresPadrao.ErroDeAtualizacao.Puppeteer,
            aprovados[i].posicao
          )
          //  TODO: armazenar logs de erros
        }
      }
    }
    this.setAtualizando(false);
    await browser.close()
  }

  //  escala MUITO mal
  //  deve ser usado com um controle de concorrencia
  public async verificarConta(
    cpf: string,
    aprovado: Aprovado,
    token: string = bot.TOKEN
  ): Promise<boolean>{
    //  buscando pela pessoa no site
    const cpfLimpo = cpf.replace('.','').replace('-','');
    const browser = await this.gerarBrowser();
    const page = await this.gerarPagina(browser,token);
    const input = "input[name='formulario:nomePesquisa']";
    //TODO:: tratar erros
    await this.buscarPorAprovado(page,BotsPuppeteer.urlBuscaBB,input,cpfLimpo);
    //obtendo o numero da inscricao dela
    const tdInscricao = 'tbody tr:nth-of-type(2) td:nth-of-type(2)'
    const inscricaoAprovado = aprovado.inscricao.split('-')[0].replaceAll(' ','');
    const inscricaoPagina = await page.$eval(tdInscricao, el => el.innerHTML.split(' ')[1]);
    
    await browser.close()
    return inscricaoAprovado === inscricaoPagina;
  }
}

export default new BotsPuppeteer();

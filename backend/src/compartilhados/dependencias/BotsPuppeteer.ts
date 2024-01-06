import puppeteer,{ PuppeteerNode } from 'puppeteer';
import Aprovado from '../../database/ORM/modelo/Aprovado';
import { GerenciadorDeAtualizacoes } from '../utilitarios/exporter';

//  TODO:: Decidir se quem vai usar essa classe e apenas alguem com o papel de
//  administrador ou qualquer um
class BotsPuppeteer{
  //se o url nao for esse todo o processamento deve ser refeito
  protected static userAgentPadrao: string = "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
  protected static urlBuscaBB: string = "https://www49.bb.com.br/portalbb/resultadoConcursos/resultadoconcursos/arh0.bbx";

  protected botManager: PuppeteerNode;

  constructor(){
    this.botManager = puppeteer;
  }

  //  TODO:: criar propriedade com uma instancia do puppeteer
  public async gerarBot(): Promise<BotsPuppeteer>{

    return new BotsPuppeteer();
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
    const browser = await this.botManager.launch({ 
      headless: "new",
      //  entender origem desse bug depois
       args: [
        '--no-sandbox',
      ]
    });


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

    const input = "input[name='formulario:nomePesquisa']";
    const situation = "table[border='0'] tr:nth-of-type(3) td b";
    const nomesRepetidos = "table[data-filter='#filter'] tbody tr";
    const tdInscricao = 'tbody tr:nth-of-type(2) td:nth-of-type(2)'

    try{
      await page.goto(BotsPuppeteer.urlBuscaBB);
      
      await page.keyboard.press('Enter');
      await page.type(input,"tanto faz, da erro da primeira vez!");
      await page.keyboard.press("Enter")
      await page.waitForNavigation();
    } catch(e){
      //  TODO: armazenar logs de erros
      console.log(`erro!: ${e}`)
    }

    console.log(aprovados.length);
    for (let i = 0; i < aprovados.length; i++ ){
      console.log(i);
      try{

        await page.goto(BotsPuppeteer.urlBuscaBB);
        await page.waitForSelector(input)

        await page.type(input,aprovados[i].nome);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
      } catch(e){
        await browser.close();

        throw e;
      }

      try {
        await page.waitForSelector(situation);
        const dados = await page.$eval(situation,el => el.innerHTML);
        await GerenciadorDeAtualizacoes.atualizarAprovado(dados, aprovados[i]);
      } catch(e) {
        try{
          await page.waitForSelector(nomesRepetidos);
          const tagIds : string[] = await page.$$eval(nomesRepetidos,(elementos,regiao,certame)=>{
            let matches: string[] = [];
            elementos.forEach((v) => {
              if(
                v.children[2].innerHTML === regiao && 
                v.children[3].children[0].innerHTML === certame
              ){
                matches.push(v.children[0].children[0].id);
              }
            })
            return matches;
          },"TI","2022/001");

          for await (let id of tagIds){
            id = `[id='${id}']`
            await page.waitForSelector(id)
            const link = await page.$(id);
            //  se foi encontrado, o link vai existir
            await link!!.click();
            await page.waitForNavigation();
            await page.waitForSelector(tdInscricao);

            const inscricaoPagina = await page.$eval(tdInscricao, el => Number(el.innerHTML.split(' ')[1]));
            const inscricaoAprovado = Number(aprovados[i].inscricao);

            if( inscricaoAprovado === inscricaoPagina ) {
              await page.waitForSelector(situation);
              const dados = await page.$eval(situation, el => el.innerHTML);
              await GerenciadorDeAtualizacoes.atualizarAprovado(dados, aprovados[i]);
              break;
            }
          }
        }catch(e){
          console.log(`erro!: ${e}`)
          //  TODO: armazenar logs de erros
        }
      }
    }
    await browser.close()
  }
}

export default new BotsPuppeteer();

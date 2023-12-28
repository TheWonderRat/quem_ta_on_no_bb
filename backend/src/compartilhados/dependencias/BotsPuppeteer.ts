import puppeteer,{ Browser, PuppeteerNode } from 'puppeteer';
import AprovadoRepo from 'src/database/ORM/repositorio/AprovadoRepo';

export default class BotsPuppeteer{
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
  public async atualizarAprovados(
    token: string,
    userAgent: string = BotsPuppeteer.userAgentPadrao
  ): Promise<void>{
    //  inicializa uma pagina do bot
    const browser = await this.botManager.launch({headless: false})
    const page = await browser.newPage();

    //  indica que a pagina do browser vai interceptar as requisicoes que esta enviado ao servidor
    await page.setRequestInterception(true);

    //  indica a quais eventos a interceptacao de requisicao responde.
    page.on('request', async request =>{
      const isPost = request.method() === "POST";
      const isMainPage = request.url().endsWith('arh0.bbx');
      const reqData = request.postData();

    //  como o browser nao responde as requisicoes do captcha da pagina o unico post enviado e para o servidor do bb
      if ( isMainPage && isPost && reqData ) {

        const postData = { postData: reqData.replace('g-recaptcha-response',`g-recaptcha-response=${token}`)}
        await request.continue(postData);
      } else {
        await request.continue();
      }
    });

    page.on('response', async response => {
      //  a unica pagina que traz o parametro "cid" e a que tem os dados do usuario
      const hasUser = response.request().url().split('cid') .length > 0;
      const isGet = response.request().method() === "GET";
      //  porem o tipo de resposta deve ser o "get" para obtermos as informacoes desejadas
      if ( hasUser && isGet ) {
        //  acredito que um regexp e mais rapido e pratico do que esperar a pagina carregar
        //  e depois fazer a requisicao
        const content = await response.text();
      }
    });

    const aprovados = await AprovadoRepo.buscarPorTurma("ultima");
    //buscar por todos os aprovados da turma em questao
    for( const aprovado of aprovados){
      await page.goto(BotsPuppeteer.urlBuscaBB);
      await page.type("input[name='formulario:nomePesquisa']", aprovado.nome)

      await page.keyboard.press("Enter");
      await page.waitForNavigation();

    }
  }
}

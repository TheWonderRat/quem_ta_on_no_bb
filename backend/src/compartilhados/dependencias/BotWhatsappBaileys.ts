import makeWASocket, { 
  BufferJSON, 
  DisconnectReason, 
  MessageUpsertType,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom'
import GerenciadorDeMensagens from '../utilitarios/GerenciadorDeMensagens';


class BotWhatsapp{
  protected enviar: ( uuid: string, text: string ) => Promise<void>;

  constructor(
    enviar: ( uuid: string, text: string ) => Promise<void>,
  ){
    this.enviar = enviar;
  }

  public async enviarMensagem(uuid: string, text: string ): Promise<void>{
    this.enviar(uuid,text);
  }

  public async receberMensagem(uuid: string, text: string ): Promise<string[]>{
    return await GerenciadorDeMensagens.receberMensagem(uuid,text);
  }
}

async function connectToWhatsApp (): Promise<BotWhatsapp>{

  //mantem a sessao aberta apos o logout
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

  const sock = makeWASocket({
      // can provide additional config here
      printQRInTerminal: true,
      auth: state,
  });
  //  salva as credenciais se necessario
  sock.ev.on ('creds.update', saveCreds)
  
  //  reestabelece a conexao se ela for perdida
  sock.ev.on('connection.update', ( update ) => {
      const { connection, lastDisconnect } = update
      if( connection === 'close' ) {
          const shouldReconnect = ( lastDisconnect?.error as Boom )?.output?.statusCode !== DisconnectReason.loggedOut
          console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
          // reconnect if not logged out
          if ( shouldReconnect ) {
              connectToWhatsApp()
          }
      } else if( connection === 'open' ) {
          console.log('opened connection')
      }
  });
  
  const enviar = async ( uuid: string, text: string ) => {
    await sock.sendMessage(uuid, { text });
  };

  const bot = new BotWhatsapp( enviar );


  sock.ev.on('messages.upsert', async ( m ) => {
    //  console.log(`\nraw message from the socket: ${ JSON.stringify(m) }\n`)
    const uuid = m.messages[0].key.remoteJid;
    const textoRecebido = m.messages[0].message?.conversation ;
    const selfSent = m.messages[0].key.fromMe;

    if( uuid && textoRecebido && !selfSent ){
      const textList = await bot.receberMensagem( uuid, textoRecebido );
      for( let i = 0; i < textList.length; i++ ){
        await sock.sendMessage(uuid, { text: textList[i] })
      }
    }
  })

  return bot;
}

async function whatsappBotFactory(): Promise<BotWhatsapp>{
  return await connectToWhatsApp();
}
/*
const WhatsappBot = whatsappBotFactory()
  .then((ok) => ok )
  .catch(( err ) => undefined );
*/
//  esse aqui e usado para evitar a conexao com o whatsapp
//  e apenas retornar a mensagem para o cliente http
const WhatsappBot: BotWhatsapp= new BotWhatsapp(async (miau: string) => {})


export default WhatsappBot;

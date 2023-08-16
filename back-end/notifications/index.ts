/* Imports/Requires */
import { create, Client, decryptMedia, ev, smartUserAgent, NotificationLanguage, Message } from "@open-wa/wa-automate"
import dotenv from 'dotenv';
//import { PoolConnection } from "mysql";
const mime = require('mime-types');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
//const mysql = require('mysql');

/* Constantes */
const uaOverride = 'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15';
const tosBlockGuaranteed = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/79.0.3945.88 Safari/537.36";
const ON_DEATH = (fn: () => Promise<void>) => process.on("exit", fn);
const SESSION_TIMEOUT = 30; // Em minutos

/* Globais/Configurações */
dotenv.config({path: __dirname+'/../.env'});
const environment = process.env;
const app = express()
let globalClient: Client;

/*let dbConnection: PoolConnection = mysql.createPool({
  connectionLimit : 10,
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  database : environment.DB_DATABASE,
  user: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  queryFormat: (query: string, values: any) => {
    return !values ? query : query.replace(/\:(\w+)/g, (txt: any, key: string) => (values.hasOwnProperty(key) ? dbConnection.escape(values[key]) : txt));
  }  
});*/

/* Ao finalizar o processo, finaliza o client */
ON_DEATH(async () => {
  console.log('killing session');
  if(globalClient) await globalClient.kill();
});

/* Inicializa o whatsapp */
create({
  sessionId: 'customer-support',
  //executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  useChrome: true,
  restartOnCrash: start,
  headless: true,
  throwErrorOnTosBlock: true,
  qrTimeout: 0, //set to 0 to wait forever for a qr scan
  authTimeout: 0, //set to 0 to wait forever for connection to phone
  killProcessOnBrowserClose: true,
  autoRefresh: true, //default to true
  safeMode: true,
  disableSpins: true,
  hostNotificationLang: NotificationLanguage.PTBR,
  viewport: { height: 1200 },
  popup: 3012,
  defaultViewport: null,
}).then(async client => await start(client))
.catch(e => { console.log('Error',e.message); });

async function start(client: Client) {
  /* Inicializa o Express */
  app.use(express.json({limit: '200mb'}));
  app.use(client.middleware()); /* Criar rota para enviar notificação buscando do banco de dados */
  app.listen(environment.NOTIFICACOES_PORT, function () {
    console.log(`\n• Listening on port ${environment.NOTIFICACOES_PORT}!`);
  });

  /* Inicializa o WA */
  globalClient = client;
  console.log('starting');
  const me = await client.getMe();
  console.log("start -> me", me);

  // const chats = await client.getAllChatsWithMessages(false);
  // console.log("TCL: start -> chats", chats)
  // console.log("TCL: getAllChatsWithMessages ->", chats.length, chats[0]);
  // console.log("TCL: start ->chats", chats[0].msgs);

  // const newMessages = await client.getAllUnreadMessages();
  // console.log("TCL: start -> newMessages", newMessages)
  // console.log("TCL: getAllNewMessages ->", newMessages.length, newMessages[0]);

  //client.onAck((c: any) => console.log(c.id, c.body, c.ack));
  //client.onAddedToGroup(newGroup => console.log('Added to new Group', newGroup.id));
  //client.onIncomingCall(call=>console.log('newcall',call));
  //const prods = await client.getBusinessProfilesProducts(me.wid)
  //console.log(prods)

  // client.onParticipantsChanged("XXXXXXXX-YYYYYYYY@g.us", (participantChangedEvent:any) => console.log("participant changed for group", participantChangedEvent));
  
  //Returns 'CONNECTED' or 'TIMEOUT' or 'CONFLICT' (if user opens whatsapp web somewhere else)
  client.onStateChanged(state => {
    console.log('statechanged', state)
    if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
  });

  // setTimeout(_=> client.kill(), 3000);
  // const allmsgs = await client.loadAndGetAllMessagesInChat('XXXXXXXX-YYYYYYYY@g.us",true,false);
  // console.log("TCL: start -> allMessages", allmsgs.length);

  client.onAnyMessage(message => {
    console.log(message.type);
    if(message.body === 'DELETE') client.deleteMessage(message.from, message.id, false);
  });
  client.onMessage(async message => {
    try {

    //const mp3_message_id = await client.sendAudio(message.from,'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3', undefined)
    //console.log("start -> mp", mp3_message_id)

      const isConnected = await client.isConnected();
      console.log("TCL: start -> isConnected", isConnected)
      console.log(message.body, message.id, message?.quotedMsgObj?.id);
      if (message.mimetype) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;

        // if it is a sticker, you need to run this.
        let mediaData: Buffer;
        if( message.type==='sticker') {
          //getStickerDecryptable is an insiders feature! 
          let stickerDecryptable = await client.getStickerDecryptable(message.id);
          //@ts-ignore
          if(stickerDecryptable) mediaData = await decryptMedia(stickerDecryptable, uaOverride);
        } else {
          //@ts-ignore
          mediaData = await decryptMedia(message, uaOverride);
        }
        if(message.type==='video') {
            const mp4_as_sticker = await client.sendMp4AsSticker(message.from, mediaData!);
            console.log("start -> mp4_as_sticker", mp4_as_sticker)
        }
        // you can send a file also with sendImage or await client.sendFile
        await client.sendImage(
          message.from,
          `data:${message.mimetype};base64,${mediaData!.toString('base64')}`,
          filename,
          `You just sent me this ${message.type}`
        );
      
        //send the whole data URI so the mimetype can be checked.
        await client.sendImageAsSticker(message.from, `data:${message.mimetype};base64,${mediaData!.toString('base64')}`)
        //get this numbers products
        // const products = await client.getBusinessProfilesProducts(message.to);

        // //send a product from this number to that number
        //  await client.sendImageWithProduct(
        //   `data:${message.mimetype};base64,${mediaData.toString('base64')}`,
        //   message.from,
        //   'check out this product',
        //   message.to,
        //   products[0].id)

          // await client.forwardMessages(message.from,message,false);

        await client.forwardMessages(message.from,message.id,false);
        fs.writeFileSync(filename, mediaData!, function(err: any) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });

        /**
         * You can also send the file as a relative file reference. The library will automatically open the file and get the dataUrl
         */
        const message_id_from_file = await client.sendImage(message.from,
          './'+filename,
          filename,
          'from file',
          undefined,
          true,
          false
          )
        console.log("start -> message_id", message_id_from_file)

        /**
         * Now you can send an animated gif via url
         */
        const sticker_from_url_gif_id = await client.sendStickerfromUrl(message.from, "https://i.giphy.com/media/yJil9u57ybQ9movc6E/source.gif")
        console.log("start -> sticker_from_url_gif_id", sticker_from_url_gif_id)

      } else if (message.type === "location") {
        if(message.shareDuration) console.log('This user has started sharing their live location', message.author || message.from)
        console.log("TCL: location -> message", message.lat, message.lng, message.loc)
        await client.sendLocation(message.from, `${message.lat}`, `${message.lng}`, `Youre are at ${message.loc}`)
      } else {
      // var sentMessageId = await client.sendText(message.from, message.body);
      // console.log("start -> sentMessageId", sentMessageId)
      // //send a giphy gif
      //   await client.forwardMessages(message.from,message,false);
      // await client.sendGiphy(message.from,'https://media.giphy.com/media/oYtVHSxngR3lC/giphy.gif','Oh my god it works');
      // console.log("TCL: start -> message.from,message.body,message.id.toString()", message.from,message.body,message.id.toString())
      // await client.reply(message.from,message.body,message);
      }
    } catch (error) {
      console.log("TCL: start -> error", error)
    }
  });
}

type OptionKey = string[] | string | RegExp;

type Option = {
  key: OptionKey,
  option?: string,
  state: string | State,
};

type State = {
  state: string,
  message?: string,
  options?: Option[],
  states?: State[],
  handle?: (phone: string, user: any, session: Snapshot, message?: ChatMessage) => Snapshot | undefined | void,
  before?: (phone: string, user: any, session: Snapshot, message?: ChatMessage) => Snapshot | undefined | void,
  after?: (phone: string, user: any, session: Snapshot, message?: ChatMessage) => Snapshot | undefined | void
}

type Snapshot = {
  state: string,
  data?: any
}

type ChatMessage = {
  id: string,
  from: string,
  body?: string,
  type?: string,
  mimetype?: string
}

let menu: State[] = [
  {
    state: "INICIO",
    message: "Bem vindo ao Chatbot do Petrvs.\nEscolha uma das opções abaixo:\n\n",
    options: [
      {key: "0", option: "0 - Finalizar chat", state: "FIM"},
      {key: "1", option: "1 - Ativar/Desativar notificações", state: "FIM"},
      {key: "2", option: "2 - Consultar demandas", state: "FIM"}
    ]
  }
];

async function findUser(phone: string) {
  if(phone.length == 10 || phone.length == 11) {
    const result = await axios.post(environment.NOTIFICACOES_SERVER_API_URL + "/find-by-phone", { telefone: phone }, { headers: { Authorization: environment.NOTIFICACOES_WHATSAPP_AUTHORIZATION } });
    /*const com9 = phone.length == 11 ? phone : phone.split("").splice(2, 0, 9).join("");
    const sem9 = phone.length == 10 ? phone : phone.split("").splice(2, 1).join("");
    const usuarios = await query("SELECT * FROM usuarios WHERE REGEXP_REPLACE(telefone, '[^0-9]', '') IN (:sem9, :com9)", {sem9, com9});*/
    return result?.status ? result.usuario : undefined;
  } else {
    return undefined;
  }
}

async function findSession(user: any) {
  if(user) {
    const result = await axios.post(environment.NOTIFICACOES_SERVER_API_URL + "/session", { usuario_id: user.id }, { headers: { Authorization: environment.NOTIFICACOES_WHATSAPP_AUTHORIZATION } });
    //const session = await query("SELECT * FROM notificacoes_whatsapp WHERE usuario_id = :usuarioId AND DATE_ADD(data_ultima_interacao, INTERVAL :minutes MINUTE) > NOW() AND data_fim_sessao IS NULL", {usuarioId: user.id, minutes: SESSION_TIMEOUT});
    return result?.status ? result.session : undefined;
  } else {
    return undefined;
  }
}

function sendMessage(phone: string, mensage: string) {
  //@ts-ignore
  if(globalClient) globalClient.sendText("55" + phone + "@c.us", message);
}

function matchKey(key: OptionKey, test?: string) {
  return Array.isArray(key) ? test && key.includes(test) : key instanceof RegExp ? !!test?.match(key) : key == test;
}

function findState(states: State[], state: string, root?: State): State | undefined {
  const regex = /(?<name>\w+)(\[(?<index>\w+)\])?/g;
  root = root || { state: "ROOT", states: states };
  return state.split(".").reduce((a: State | undefined, v: string) => {
    const property = v.matchAll(regex).next()?.value?.groups;
    const current = a?.states?.find(x => x.state == property?.name);
    const option = current?.options?.find(x => matchKey(x.key, property?.index));
    return property?.index && a ? (typeof option?.state == "string" ? findState(states, option.state.replace(/^$\./, ""), option.state.startsWith("$.") ? { state: "THIS", states: a.states } : undefined) : option?.state) : current;
  }, root);
}

function chatbot(phone: string, user: any, session: Snapshot, message?: ChatMessage) {
  const state = findState(menu, session.state);
  if(state) {
    let newState: Snapshot | undefined | void = undefined;
    if(state.handle) newState = state.handle(phone, user, session, message);
    if(state.options?.length) {
      const option = state.options.find(x => matchKey(x.key, message?.body));
      if(option) {
        
      }
    }


  } else {
    
  }
}

/*async function query(sql: string, params: any) {
  return new Promise<any>((resolve, reject) => {
    dbConnection.query(sql, params || {}, (error, rows, fields) => {
      if(error) {
        reject(error.message)
      } else {
        resolve(rows);
      }
    });
  });
}*/

/*function fetchFromObject(obj, prop) {
  let index = prop.indexOf('.');
  if(typeof obj === 'undefined') return false;
  if(index > -1) return fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
  return obj[prop];
}*/


/* Eventos */

/* Gera arquivo de imagem do QRCode */
ev.on('qr.**', async (qrcode, sessionId) => {
  const imageBuffer = Buffer.from(qrcode.replace('data:image/png;base64,',''), 'base64');
  fs.writeFileSync(`qr_code${sessionId ? '_' + sessionId : ''}.png`, imageBuffer);
});

/* Detecta quando a sessão for iniciada */
ev.on('STARTUP.**', async (data, sessionId) => {
  if(data === 'SUCCESS') console.log(`${sessionId} started!`)
})

/* Detecta todos os eventos 
ev.on('**', async (data,sessionId,namespace) => {
  console.log("\n----------")
  console.log('EV', data, sessionId, namespace)
  console.log("----------")
}) */

/* Dados da sessão 
ev.on('sessionData.**', async (sessionData, sessionId) =>{
  console.log("\n----------")
  console.log('sessionData',sessionId, sessionData)
  console.log("----------")
})*/

/* Dados da sessão em Base64
ev.on('sessionDataBase64.**', async (sessionData, sessionId) =>{
  console.log("\n----------")
  console.log('sessionData',sessionId, sessionData)
  console.log("----------")
})*/
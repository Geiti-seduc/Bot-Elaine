const venom = require('venom-bot');
const { db } = require("./models/db");
const nodemailer = require('nodemailer');
const { problemas,setores } = require('./options/options');
require("dotenv").config();

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  function start(client) {
    client.onMessage((message) =>{
      let  resp = getStage(message.from)
      console.log(resp)

       if (resp == 0) {
                // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
          stamp = new Date();
          hours = stamp.getHours();
          if(hours >= 18 && hours < 24){
              time = "Boa noite, nosso expediente é apenas de 7:00 AM até 18:00 PM.";
          } else if(hours >= 12 && hours < 18){
              time = "Boa tarde";
          }else if(hours >= 0 && hours < 12){
              time = "Bom dia";
          }
          stage(client, message, `${time}`, "Escolha o seu problema", "CLIQUE AQUI", problemas)
          db[message.from].stage = 1
          console.log(db[message.from])

       }else if (resp == 1){

          db[message.from].call.reason = message.body
          stage(client, message, "Escolha o seu setor", " ", "CLIQUE AQUI", setores)
          db[message.from].stage = 2
          console.log(db[message.from])

       }else if (resp == 2){

          db[message.from].call.location = message.body
          nome(client,message)
          db[message.from].stage = 3
          console.log(db[message.from])

      }
      else if(resp == 3){

          db[message.from].call.person = message.body
          email(message.from)
          console.log(db[message.from])
          gif(client,message)
          
      }
    });
  }
  //***** FUNÇÃO DOS STAGES *****
  function getStage(user) {   
    if (db[user]) {
      //se o usuário já estiver cadastrado
      return db[user].stage;
    } else {
      //se for a primeira vez entrando em contato
      db[user] = {
       stage:0,
        call: {
          location: "",
          person: "",
          reason: "",      
        },
      };    
      return db[user].stage;
    }
  }



// ***** FUNÇÕES PARA INTERAÇÃO DO USUÁRIO *****
function stage(client, sender, titulo, description, menu, lista) {
    
    client.sendListMenu(sender.from, titulo, 'subTitle', description, menu, lista)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    console.log(sender.body)
  
}

function nome(client,message) {
  client
  .sendText(message.from, 'Digite o seu nome:')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

function gif(client,message){
 client.sendVideoAsGif(
    message.from,
    './images/sendmail.mp4',
    'sendmail.gif',
    'E-mail enviado, estaremos enviando um técnico o mais rápido o possível! '
  ); 
}


//***** ENVIO DO EMAIL *****
function email(user) {
    let transpoter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    let mailOptions = {
        from: `${process.env.USER_EMAIL}`,
        to: "suporte@educ.al.gov.br",
        subject:`${ db[user].call.reason}, ${Math.floor(Math.random() * 50000)}`,
        text: `Local: ${db[user].call.location}\nPessoa: ${db[user].call.person}`
    };

    transpoter.sendMail(mailOptions).then((info) => {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        console.log(info);

    }).catch((error) => console.log(error));

    db[user].stage = 0;
}


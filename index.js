const venom = require('venom-bot');
const { db } = require('../Bot-Elaine/models/db');
const { step } = require('../Bot-Elaine/models/stages');
const {buttons,stag2} = require('../Bot-Elaine/options/options');



venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  function start(client) {
    
    client.onMessage(async (message) => {
      let resp = step[getStage(message.from)].obj.execute(
        message.from, //Usuário
        message.body, //Resposta do Usuário
        message.sender.name //Nome do usuário
      );
      console.log(db[message.from]);

      if (db[message.from].stage == 4) {
        step[getStage(message.from)].obj.execute(message.from);
      }
     
        if(resp){
          await client.sendButtons(message.from,"Titulo 1",buttons, 'sub')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
        }
      
     
    });
    
  }

  function getStage(user) {
    if (db[user]) {
      //se o usuário já estiver cadastrado
      return db[user].stage;
    } else {
      //se for a primeira vez entrando em contato
      db[user] = {
        stage: 0,
        call: {
          location: "",
          person: "",
          reason: "",
          subdescription: "",
        },
      };
  
      return db[user].stage;
    }
  }



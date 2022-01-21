const venom = require('venom-bot');
const { db } = require('../Bot-Elaine/models/db');
const { step } = require('../Bot-Elaine/models/stages');
const {buttons} = require('../Bot-Elaine/options/options');



venom
  .create()
  .then((client) => start(client))
  .catch((erro) => console.log(erro));

  function start(client) {
    
    client.onMessage((message) => {
        let resp = step[getStage(message.from)].obj.execute(
            message.from, //Usuário
            message.body, //Resposta do Usuário
            message.sender.name //Nome do usuário
          );
      
          console.log(db[message.from]);
      
          if (db[message.from].stage == 2) {
            step[getStage(message.from)].obj.execute(message.from);
          }
        client
          .sendText(message.from,resp)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          
      
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
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
     
          await client.sendButtons(message.from,"Titulo 1",buttons, 'sub')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
        
      
     
    });
    
  }

  
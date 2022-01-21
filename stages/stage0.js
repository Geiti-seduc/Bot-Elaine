const venom = require('venom-bot');
const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');


function execute(user){

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

    let menu = `${time}\n\nChatbot suporte- T.I\n\n`;

    venom
    .create()
    .then((client) => start(client))
    .catch((erro) => console.log(erro));


    
    client.onMessage((message) => {
        
        client
          .sendButtons(message.from,menu, buttons)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          
      
    });
  

    db[user].stage = 1;

    return menu;
}

exports.execute =  execute;
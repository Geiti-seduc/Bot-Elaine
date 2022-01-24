const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => execute(client))
  .catch((erro) => {
    console.log(erro);
  });

function execute(user, msg,client){
    client.onMessage(async (message) => {
       
        switch(db[user].call.reason){
            case "Computador":
                await client.sendButtons(message.from,"Titulo 2",stag2, 'sub')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
        }
    });
}


    
function listOptions(stag2){
    menu = `Escolha a opção referente ao seu problema: \n\n`;
    Object.values(stag2).forEach((data)=>{
        let element = stag2[data];
        menu += `${data} - ${element}\n`;
            
    });
    return menu;
}


exports.execute = execute
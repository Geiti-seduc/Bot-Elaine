const venom = require('venom-bot');
const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');


function execute(user,client){

    client.onMessage( async (message) => {
        await client
          .sendButtons(message.from,'Titulo', buttons,'sub'); 
    });
  

    db[user].stage = 1;

    return menu;
}

exports.execute =  execute;
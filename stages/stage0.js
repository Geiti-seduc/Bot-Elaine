const venom = require('venom-bot');
const { stag } = require('../index');
const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');


function execute(user){  
    let menu = `\n\nChatbot suporte- T.I\n\n`;

    Object.values(buttons).forEach((data)=>{
        let element = buttons[data];
        menu += `${data} - ${element}\n`;
    });

    db[user].stage = 1;
    return menu;
}



exports.execute =  execute;
const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');



function execute(user, msg){

    msg = parseInt(msg);

    let menu;

    db[user].call.reason = menu = listOptions(stag2);
    db[user].stage = 2;

    return menu;
}

function listOptions(stag2){
    menu = `Escolha a opção referente ao seu problema: \n\n`;

    Object.keys(stag2).forEach((value) => {
        let element = stag2[value];
        menu += `${value} - ${element.description}\n`;
    });

    return menu;
}

exports.execute = execute
const { db } = require('../models/db');
const { buttons, stag2 } = require('../options/options');



function execute(user, msg){

    let menu;
    switch (msg) {
        case 'Computador':
            
            db[user].call.reason  = "Computador";
            menu = listOptions(stag2)
            break;
    
        default:
            break;
    }
    
    db[user].stage = 2;

    return menu;
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
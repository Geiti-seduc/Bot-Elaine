const venom = require('venom-bot');
const { db } = require("./models/db");
const nodemailer = require('nodemailer');
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
      
          stage(client, message, "Escolha o seu problema", " ", "CLIQUE AQUI", list)
          db[message.from].stage = 1
          console.log(db[message.from])

       }else if (resp == 1){
          db[message.from].call.reason = message.body
          stage(client, message, "Escolha o seu setor", " ", "CLIQUE AQUI", list2)
          db[message.from].stage = 2
          console.log(db[message.from])
       }else if (resp == 2){
          db[message.from].call.location = message.body
          nome(client,message)
          db[message.from].stage = 3
          console.log(db[message.from])
      }
      else if(resp == 3){
          email(message.from)
          console.log(db[message.from])
          return ``
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
        subject: db[user].call.reason,
        text: `Local: ${db[user].call.location}\nPessoa: ${db[user].call.person}`
    };

    transpoter.sendMail(mailOptions).then((info) => {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        console.log(info);

    }).catch((error) => console.log(error));

    db[user].stage = 0;
}

const list = [
  {
    title: "Computador",
    rows: [
      {
        title: "Computador não liga",
        description: " ",
      },
      {
        title: "Remanejamento de computadores",
        description: " ",
      },
      {
        title: "Devolução de equipamento",
        description: " ",
      }
    ]
  },
  {
    title: "Suporte ao usuário",
    rows: [
      {
        title: "Instalação de programa",
        description: " ",
      }
    ]
  },
  {
    title: "Internet",
    rows: [
      {
        title: "Sem internet",
        description: " ",
      },
      {
        title: "Conectar dispositivo na rede",
        description: " ",
      }
    ]
  },
  {
    title: "Impressora",
    rows: [
      {
        title: "Conectar impressora",
        description: " ",
      },
      {
        title: "Não esta imprimindo",
        description: " ",
      },
      {
        title: "Troca de tôner",
        description: " ",
      }
    ]
  },
  {
    title: "Equipamento",
    rows: [
      {
        title: "Solicitação de equipamento: Mouse ou teclado",
        description: " ",
      },
      {
        title: "Teclado ou mouse com defeito",
        description: " ",
      }
    ]
  },
  {
    title: "Nobreak",
    rows: [
      {
        title: "Nobreak não liga",
        description: " ",
      }
    ]
  },
  
];

const list2 = [
  {
    title: "Lista de setor",
    rows: [
      {
        title: "SUVPE",
        description: " ",
      },
      {
        title: "SUVPE - SUBRF",
        description: " ",
      },
      {
        title: "SUFIC",
        description: " ",
      },
      {
        title: "SUPLOR",
        description: " ",
      },
      {
        title: "SUPLOR - ASSESSORIA",
        description: " ",
      },
      {
        title: "ESTATÍSTICA",
        description: " ",
      },
      {
        title: "SUAD - FROTA ADMINISTRATIVA",
        description: " ",
      },
      {
        title: "SUAD - CHEFIA ADMINISTRATIVA",
        description: " ",
      },
      {
        title: "SUAD - SUPERINTENDÊNCIA",
        description: " ",
      },
      {
        title: "SUAD - ALMOXARIFADO",
        description: " ",
      },
      {
        title: "SUAD - COMPRAS",
        description: " ",
      },
      {
        title: "13ª GERE",
        description: " ",
      },
      {
        title: "13ª GERE - FROTA ESCOLAR",
        description: " ",
      },
      {
        title: "SUETI - ARQUITETURA/ENGENHARIA",
        description: " ",
      },
      {
        title: "SUPED",
        description: " ",
      },
      {
        title: "ASE",
        description: " ",
      },
      {
        title: "ASCOM",
        description: " ",
      },
      {
        title: "GABINETE - SURE/SUSE",
        description: " ",
      },
      {
        title: "GABINETE - PROTOCOLO",
        description: " ",
      },
      {
        title: "GABINETE - COMISSÃO DE TRANSPORTE",
        description: " ",
      },
      {
        title: "CHEFIA DE GABINETE",
        description: " ",
      },
      {
        title: "NUCAD",
        description: " ",
      },
      {
        title: "CENFOR",
        description: " ",
      },
      {
        title: "CENFOR - SURE",
        description: " ",
      },
    ]
  },
];
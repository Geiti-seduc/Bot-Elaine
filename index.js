const venom = require('venom-bot');




venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
  function start(client) {
    stage0(client)

    
  }




  const list = [
    {
      title: "Lista de problemas",
      rows: [
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        },
      ]
    },
    
  ];
//STAGES////

function stage0(client) {
  client.onMessage( async (message) => {
    await client.sendListMenu(message.from,'Lista de Problemas', 'subTitle', 'Escolha seu problema clicando no menu BASTA LER!!!!','menu',list)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    console.log(message.body)
  });
}


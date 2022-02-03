
let stages = {
	0:{
		descricao: "Boas vindas",
		obj: require('../index')
	},

	1:{
		descricao: "Motivo do chamado",
		obj: require('../index')
	},

	2:{
		descricao: "Subdescrição do chamado",
		obj: require('../index')
	},
	
	3: {
		descricao: "Local do chamado",
		obj: require('../index')
	},

	4: {
		descricao: "Solicitante",
		obj: require('../index')
	},
	5: {
		descricao: "Envio do e-mail",
		obj: require('../index')
	}
}


exports.step = stages;
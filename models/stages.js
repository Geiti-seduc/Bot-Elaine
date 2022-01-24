/* Estagios do bot e seus respectivos arquivos */ 

let stages = {
	0:{
		descricao: "Boas vindas",
		obj: require('../stages/stage0')
	},

	1:{
		descricao: "Motivo do chamado",
		obj: require('../stages/stage1')
	},
	2:{
		descricao: "Subdescrição",
		obj: require('../stages/stage2')
	},
}


exports.step = stages;
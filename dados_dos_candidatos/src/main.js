
const fs = require('fs').promises;
const hash = require('bcryptjs').hash;
//const {MongoClient} = require('mongodb');

const DIRETAS = './data/nomes_diretas'
const CR = './data/nomes_cr'
//const MONGO_URI = "mongodb+src://<uname>:<password>@<cluster>/test?retryWrites=true&w=majority";
//const MONGO_CLIENT = new MongoClient(MONGO_URI);

async function obterCandidatos(nomeLista, cr){
  return await fs.readFile(nomeLista).then(async (data) => {
      const clean = data.toString().replace(/\n|\r/g,"").trim();
      const arr = clean.split("/");

      //let listaAmpla = []; let listaPCD = []; let listaPPP = [];
      let aprovados= []

      for (let i = 0; i < arr.length; i++){
        const element = arr[i];
        //
        //0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
        const values = element.split(';')
        aprovados.push(await gerarCandidato(values,cr));
        
      /*
        listaAmpla.push([ Number(values[3]), values[0] ]);
        listaPCD.push([ Number(values[4]), values[0] ]);
        listaPPP.push( [Number(values[5]), values [0]]);
      */
      }

    return aprovados;
    /*
      listaAmpla = bubbleSort(listaAmpla.filter(e => e[0] > 0));
      listaPPP = bubbleSort(listaPCD.filter(e => e[0] > 0));
      listaPCD = bubbleSort(listaPPP.filter(e => e[0] > 0));
    */

      //return [listaAmpla, listaPPP, listaPCD ];
  }).catch((e) => { 
    console.log("error!")
    console.log(e)
  });
}

async function gerarCandidato(dados,cr){
    //0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
	//const inscricao = Number(dados[1].replace(" ","").replace("-",""));

	let inscricao;
	try{
		inscricao = Number(dados[1].split("-")[0]);
	} catch(e){
		inscricao = Number(dados[0]);
	}

  const numeroPCD = dados[4].replace(" ","").replace("-","");
  const numeroPPP = dados[5].replace(" ","").replace("-","");


	//const inscricao = inscricao_bruto.length > 1 ? Number(inscricao_bruto[0]) : Number(inscricao_bruto[1].split("-")[0]);


	const senha = await hash(inscricao.toString(),8) 
  return {
    inscricao,
    nome: dados[0],
    dataPosse: null,
    localPosse: null,
    cidadePosse: null,
	  cadastroReserva: cr,
    //TODO:: criptografar com o crypto
    senha,
    primeiroAcesso: true,
    //TODO:: criar timestamp
    atualizadoEm: Date(),
    posicaoAmpla: Number(dados[3]),
    posicaoPCD: Number(numeroPCD) > 0 ? Number(numeroPCD) : null,
    posicaoPPP: Number(numeroPPP) > 0 ? Number(numeroPPP) : null,
  }
}

function bubbleSort(lista){
  let swapped = true;

  while(swapped){
    swapped = false; 

    for(let i = 1; i < lista.length; i++){
      if(lista[i][0] < lista [i - 1][0]){
        const temp = lista[i - 1];

        lista[ i - 1 ] = lista[i] 
        lista[i]       = temp

        swapped = true;
      }
    }
  }
  const correct = lista.reduce((prev,curr) => { 
    return [ prev[1] < curr[0] && prev[0], curr[0]]
  }, [true,0]);

  if(correct){
    return lista;
  } 
  throw("A lista nao foi corretamente ordenada")
}


async function gerarArquivoDeImportacao(nomeArquivo,candidatos){
	const json = JSON.stringify(candidatos);
	await fs.writeFile(nomeArquivo,json, 'utf8',(err) => {
		if(err){
			console.log("an error occurred!");
			console.log(err);
		}
	})
}

obterCandidatos(DIRETAS,false).then(async (e) => {
  //e.forEach((c) => console.log(c))
  await gerarArquivoDeImportacao("diretas.json",e);
  console.log("everything is ok");
}).catch((e) => { 
  //console.log(e) 
});

obterCandidatos(CR,true).then(async (e) => {
  //e.forEach((c) => console.log(c))
	await gerarArquivoDeImportacao("cadastroReserva.json",e);
  console.log("everything is ok");
}).catch((e) => { 
  //console.log(e) 
});

//ordenarCandidatos(CR).then((e) => console.log(e)).catch((e) => console.log(e));
//





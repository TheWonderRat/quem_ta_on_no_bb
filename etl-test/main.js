
const fs = require('fs').promises;

const { MongoClient } = require('mongodb');

DIRETAS = './src/data/nomes_diretas'
CR = './src/data/nomes_cr'

async function ordenarCandidatos(nomeLista){
  return await fs.readFile(nomeLista).then((data) => {
      const clean = data.toString().replace(/\n|\r/g,"").trim();
      const arr = clean.split("/");

      //let listaAmpla = []; let listaPCD = []; let listaPPP = [];
      let aprovados= []

      for (let i = 0; i < arr.length; i++){
        const element = arr[i];
        //
        //0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
        const values = element.split(';')

        aprovados.push(gerarCandidato(values));
        
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
    console.log("there is an error!")
  });
}

function gerarCandidato(dados){
    //0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
  return {
    inscricao: dados[2],
    nome: dados[0],
    dataPosse: null,
    localPosse: null,
    cidadePosse: null,
    //TODO:: criptografar com o crypto
    senha: dados[0],
    primeiroAcesso: true,
    //TODO:: criar timestamp
    atualizadoEm: Date(),
    posicaoAmpla: dados[3],
    posicaoPCD: typeof dados[4] === Number ? dados[4] : null,
    posicaoPPP: typeof dados[5] === Number ? dados[5] : null,
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

ordenarCandidatos(DIRETAS).then((e) => {
  e.forEach((c) => console.log(c))
  //console.log(e[0])
}).catch((e) => { 
  //console.log(e) 
});
//ordenarCandidatos(CR).then((e) => console.log(e)).catch((e) => console.log(e));




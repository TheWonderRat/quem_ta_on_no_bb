import { promises as fs } from 'fs';

const DIRETAS = './src/data/nomes_diretas';

function gerarCandidato(dados) {
  // 0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
  return {
    inscricao: dados[2],
    nome: dados[0],
    dataPosse: null,
    localPosse: null,
    cidadePosse: null,
    // TODO:: criptografar com o crypto
    senha: dados[0],
    primeiroAcesso: true,
    // TODO:: criar timestamp
    atualizadoEm: Date(),
    posicaoAmpla: dados[3],
    posicaoPcd: typeof dados[4] === 'number' ? dados[4] : null,
    posicaoPpp: typeof dados[5] === 'number' ? dados[5] : null,
  };
}

async function ordenarCandidatos(nomeLista) {
  return fs.readFile(nomeLista).then((data) => {
    const clean = data.toString().replace(/\n|\r/g, '').trim();
    const arr = clean.split('/');

    // let listaAmpla = []; let listaPCD = []; let listaPPP = [];
    const aprovados = [];

    for (let i = 0; i < arr.length; i += 1) {
      const element = arr[i];
      //
      // 0 = nome 1 = inscricao 2 = pontuacao 3 = classi micro 4 = PCD 5 = PPP
      const values = element.split(';');

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

    // return [listaAmpla, listaPPP, listaPCD ];
  }).catch((e) => {
    console.log('there is an error!', e);
  });
}

ordenarCandidatos(DIRETAS).then((e) => {
  e.forEach((c) => console.log(c));
  // console.log(e[0])
}).catch((e) => {
  console.log(e);
});
// ordenarCandidatos(CR).then((e) => console.log(e)).catch((e) => console.log(e));

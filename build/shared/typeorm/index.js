"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const Aprovado_1 = require("../../modules/Aprovado/entity/Aprovado");
const Lista_1 = require("../../modules/Lista/entity/Lista");
const Situacao_1 = require("../../modules/Situacao/entity/Situacao");
const TipoLista_1 = require("../../modules/TipoLista/entity/TipoLista");
const Lotacao_1 = require("../../modules/Lotacao/entity/Lotacao");
const Turma_1 = require("../../modules/Turma/entity/Turma");
const Cidade_1 = require("../../modules/Cidade/entity/Cidade");
const Diretoria_1 = require("../../modules/Diretoria/entity/Diretoria");
exports.myDataSource = new typeorm_1.DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "aprovados_teste",
    "synchronize": true,
    //NAO MUDAR
    "entities": [
        "./src/modules/**/entity/*.ts"
    ],
    //NAO MUDAR
    "migrations": [
        "./src/shared/typeorm/migrations/*.ts"
    ]
});
exports.myDataSource.initialize()
    .then(async (e) => {
    //run migrations with e
    //insert data with e
    //kill database with e await runAfterInit();
    //await runAfterInit();
    console.log("initialized properly");
})
    .catch((e) => {
    console.log(`${e}`);
})
    .finally(async () => {
    await runAfterInit();
});
async function runAfterInit() {
    //await loadDOUData();
}
async function loadDOUData() {
    const AMPLA = require('../../../dados_dos_candidatos/src/diretas.json');
    const CADASTRO_RESERVA = require('../../../dados_dos_candidatos/src/cadastroReserva.json');
    Promise.all([
        cadastrarTurma([1, 2, 3]),
        cadastrarTipoLista([
            'ampla',
            'ampla_diretas',
            'ampla_cadastro_reserva',
            'ppp',
            'ppp_diretas',
            'ppp_cadastro_reserva',
            'pcd',
            'pcd_diretas',
            'pcd_cadastro_reserva',
            'tres_para_um',
            'quatro_para_um',
        ]),
        cadastrarSituacao([
            'em_preparacao',
            'convocacao_expedida',
            'em_qualificacao',
            'qualificado',
            'empossado',
            'desistente',
            'cancelado_por_prazo',
            'inapto',
            'nao_convocado',
            'fila_de_espera'
        ]),
        cadastrarCidade(['Sao Paulo', 'Brasilia']),
        cadastrarDiretoria(['DITEC', 'UAN', 'UCF']),
        cadastrarAprovados(AMPLA, "fila_de_espera"),
        cadastrarAprovados(CADASTRO_RESERVA, "fila_de_espera"),
    ]).then(async (ok) => {
        //vagas da ampla
        await cadastrarLista(CADASTRO_RESERVA, "ampla", "ppp", "pcd");
        await cadastrarLista(AMPLA, "ampla", "ppp", "pcd");
        //vagas das diretas
        await cadastrarLista(AMPLA, "ampla_diretas", "ppp_diretas", "pcd_diretas");
        //vagas do cr
        await cadastrarLista(CADASTRO_RESERVA, "ampla_cadastro_reserva", "ppp_cadastro_reserva", "pcd_cadastro_reserva");
        CADASTRO_RESERVA.forEach((e) => AMPLA.push(e));
        await cadastrarListaTresParaUm(CADASTRO_RESERVA, "tres_para_um")
            .then((e) => {
            cadastrarLotacaoMock(AMPLA.map((v) => {
                const diretorias = ['DITEC', 'UAN', 'UCF'];
                const cidades = ['Brasilia', 'Sao Paulo'];
                const data = {
                    inscricao: v.inscricao,
                    cidade: cidades[Math.round(Math.random())],
                    diretoria: diretorias[Math.round(Math.random() * 2)]
                };
                return data;
            }));
        });
    }).catch((err) => {
        console.log(`Error!:\n${err}`);
    });
}
async function testRedundancy() {
    const AMPLA = require('../../../dados_dos_candidatos/src/diretas.json');
    const CADASTRO_RESERVA = require('../../../dados_dos_candidatos/src/cadastroReserva.json');
    const promises = [
        cadastrarTurma([1, 2, 3]),
        cadastrarTipoLista(['ampla', 'ampla_diretas', 'ampla_cadastro_reserva', 'ppp', 'ppp_diretas', 'ppp_cadastro_reserva', 'pcd', 'pcd_diretas', 'pcd_cadastro_reserva', 'tres_para_um', 'quatro_para_um',]),
        cadastrarSituacao(['em_preparacao', 'convocacao_expedida', 'em_qualificacao', 'qualificado', 'empossado', 'desistente', 'cancelado_por_prazo', 'inapto', 'nao_convocado', 'fila_de_espera']),
        cadastrarCidade(['Sao Paulo', 'Brasilia']),
        cadastrarDiretoria(['DITEC', 'UAN', 'UCF']),
        cadastrarAprovados(AMPLA, "em_espera"),
        cadastrarAprovados(CADASTRO_RESERVA, "em_espera"),
        cadastrarLista(AMPLA, "ampla_diretas", "ppp_diretas", "pcd_diretas")
    ];
    promises.forEach((v, i) => {
        v.then((ok) => {
            console.log(ok);
        }).catch((err) => {
            console.log(err);
        });
    });
}
async function cadastrarTipoLista(lista) {
    lista.forEach(async (l) => {
        const tipoLista = exports.myDataSource.manager.create(TipoLista_1.TipoLista);
        tipoLista.nome = l;
        await exports.myDataSource.manager.save(tipoLista);
    });
}
async function cadastrarTurma(turmas) {
    turmas.forEach(async (l) => {
        const turma = exports.myDataSource.manager.create(Turma_1.Turma);
        turma.numero = l;
        await exports.myDataSource.manager.save(turma);
    });
}
async function cadastrarCidade(cidades) {
    cidades.forEach(async (c) => {
        const cidade = exports.myDataSource.manager.create(Cidade_1.Cidade);
        cidade.nome = c;
        await exports.myDataSource.manager.save(cidade);
    });
}
async function cadastrarDiretoria(diretorias) {
    diretorias.forEach(async (d) => {
        const diretoria = exports.myDataSource.manager.create(Diretoria_1.Diretoria);
        diretoria.nome = d;
        await exports.myDataSource.manager.save(diretoria);
    });
}
async function cadastrarSituacao(situacoes) {
    situacoes.forEach(async (e) => {
        const situacao = exports.myDataSource.manager.create(Situacao_1.Situacao);
        situacao.nome = e;
        await exports.myDataSource.manager.save(situacao);
    });
}
async function cadastrarAprovados(aprovados, situacao) {
    aprovados.forEach(async (apr) => {
        const aprovado = exports.myDataSource.manager.create(Aprovado_1.Aprovado);
        aprovado.inscricao = apr.inscricao;
        aprovado.nome = apr.nome;
        aprovado.senha = apr.senha;
        aprovado.situacao = situacao;
        aprovado.ppp = apr.posicaoPPP !== null;
        aprovado.pcd = apr.posicaoPCD !== null;
        await exports.myDataSource.manager.save(aprovado);
    });
}
//como os dados estao consistentes vou fingir que typescript nao existe
/*
async function cadastrarListaCR(aprovados: IAprovado[],tipoAmpla: string,tipoPPP: string,tipoPCD: string){

  const salvarAprovado = async (a: IAprovado,posicao: number, tipoLista: string) => {
    const lista = myDataSource.manager.create(Lista);
    lista.inscricao = a.inscricao;
    lista.tipoLista = tipoLista;
    lista.posicao = posicao;
    await myDataSource.manager.save(lista);
  };

  aprovados.forEach( async (apr) =>{


    await salvarAprovado(apr,crAmpla,tipoAmpla);

    if(apr.posicaoPPP !== null){
      await salvarAprovado(apr,crPPP,tipoPPP);
    }
    if(apr.posicaoPCD !== null){
      await salvarAprovado(apr,tipoPCD);
    }
  });
}
*/
//como os dados estao consistentes vou fingir que typescript nao existe
async function cadastrarLista(aprovados, tipoAmpla, tipoPPP, tipoPCD) {
    const salvarAprovado = async (a, posicao, tipoLista) => {
        const lista = exports.myDataSource.manager.create(Lista_1.Lista);
        lista.inscricao = a.inscricao;
        lista.tipoLista = tipoLista;
        lista.posicao = posicao;
        await exports.myDataSource.manager.save(lista);
    };
    aprovados.forEach(async (apr) => {
        await salvarAprovado(apr, apr.posicaoAmpla, tipoAmpla);
        if (apr.posicaoPPP !== null) {
            await salvarAprovado(apr, apr.posicaoPPP, tipoPPP);
        }
        if (apr.posicaoPCD !== null) {
            await salvarAprovado(apr, apr.posicaoPCD, tipoPCD);
        }
    });
}
async function cadastrarLotacaoMock(lotacoes) {
    lotacoes.forEach(async (v) => {
        const lotacao = exports.myDataSource.getRepository(Lotacao_1.Lotacao).create();
        lotacao.cidade = v.cidade;
        lotacao.diretoria = v.diretoria;
        lotacao.inscricao = v.inscricao;
        await exports.myDataSource.getRepository(Lotacao_1.Lotacao).save(lotacao);
    });
}
async function cadastrarListaTresParaUm(lista, nomeLista) {
    const bubbleSort = (arr, key) => {
        let ordered = false;
        while (!ordered) {
            ordered = true;
            for (let i = 1; i < arr.length; i++) {
                //key is the name of the hashmap key
                if (arr[i][key] < arr[i - 1][key]) {
                    const swap = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = swap;
                    ordered = false;
                }
            }
        }
    };
    const listaAmpla = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP === null; });
    const listaPPP = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP !== null; });
    const listaPCD = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP === null; });
    const listaPCDPPP = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP !== null; });
    listaPCDPPP.forEach((v) => {
        if (v.posicaoPCD > v.posicaoPPP) {
            listaPCD.push(v);
        }
        else {
            listaPPP.push(v);
        }
    });
    //acoplamento alto
    bubbleSort(listaPPP, "posicaoPPP");
    bubbleSort(listaPCD, "posicaoPCD");
    bubbleSort(listaAmpla, "posicaoAmpla");
    const salvarAprovado = async (lst, position, counter, lName) => {
        let i = 0;
        while (i < counter) {
            if (lst.length > 0) {
                const lista = exports.myDataSource.manager.create(Lista_1.Lista);
                lista.inscricao = lst[0].inscricao;
                lista.tipoLista = lName;
                lista.posicao = position + i;
                await exports.myDataSource.manager.save(lista);
                lst.splice(0, 1);
            }
            i++;
        }
    };
    let listCount = 1;
    while (listaAmpla.length > 0 || listaPPP.length > 0 || listaPCD.length > 0) {
        await salvarAprovado(listaAmpla, listCount, 3, nomeLista);
        listCount += 3;
        await salvarAprovado(listaPPP, listCount, 1, nomeLista);
        listCount++;
        await salvarAprovado(listaPCD, listCount, 1, nomeLista);
        listCount++;
    }
}
async function cadastrarListaQuatroParaUm(lista, nomeLista) {
    const bubbleSort = (arr, key) => {
        let ordered = false;
        while (!ordered) {
            ordered = true;
            for (let i = 1; i < arr.length; i++) {
                //key is the name of the hashmap key
                if (arr[i][key] < arr[i - 1][key]) {
                    const swap = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = swap;
                    ordered = false;
                }
            }
        }
    };
    const listaAmpla = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP === null; });
    const listaPPP = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP !== null; });
    const listaPCD = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP === null; });
    const listaPCDPPP = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP !== null; });
    listaPCDPPP.forEach((v) => {
        if (v.posicaoPCD > v.posicaoPPP) {
            listaPCD.push(v);
        }
        else {
            listaPPP.push(v);
        }
    });
    //acoplamento alto
    bubbleSort(listaPPP, "posicaoPPP");
    bubbleSort(listaPCD, "posicaoPCD");
    bubbleSort(listaAmpla, "posicaoAmpla");
    const salvarAprovado = async (lst, position, counter, lName) => {
        let i = 0;
        while (i < counter) {
            if (lst.length > 0) {
                const lista = exports.myDataSource.manager.create(Lista_1.Lista);
                lista.inscricao = lst[0].inscricao;
                lista.tipoLista = lName;
                lista.posicao = position + i;
                await exports.myDataSource.manager.save(lista);
                lst.splice(0, 1);
            }
            i++;
        }
    };
    let listCount = 1;
    while (listaAmpla.length > 0 || listaPPP.length > 0 || listaPCD.length > 0) {
        if (listaPPP.length > 0) {
            await salvarAprovado(listaAmpla, listCount, 3, nomeLista);
            listCount += 3;
            await salvarAprovado(listaPCD, listCount, 1, nomeLista);
            listCount++;
        }
        else {
            await salvarAprovado(listaAmpla, listCount, 4, nomeLista);
            listCount += 4;
        }
        await salvarAprovado(listaPPP, listCount, 1, nomeLista);
        listCount++;
    }
}

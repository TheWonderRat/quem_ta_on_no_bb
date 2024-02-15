import "reflect-metadata"
import fs from 'fs';
import path from 'path';


//  import { TODOS_OS_APROVADOS } from "../SSOT/scripts/script";
import dataSource from "../database/config";
import AprovadoRepo from "../database/ORM/repositorio/AprovadoRepo";
import CriptografiaBcrypt from "../compartilhados/dependencias/CriptografiaBcrypt";
import { TipoAprovado, TipoRanking } from "../tipos/exporter";



type TipoAp = { nome: string, posicao: number }
async function atualizarNome(){
  const aprovados = await AprovadoRepo.find();
  const arquivo = fs.readFileSync(path.join(__dirname,'..','..','dados_dos_aprovados','situacaoBruta.csv'),'utf8')

  const aprs = arquivo.split('\n');

  const listaFinal = aprs
    .slice(0,aprs.length - 1)
    .map((el) => {
      const data = el.split(',');
      const nome = data[1]; 
      const posicao = Number(data[2].split(' ')[0]);

      return { nome, posicao };
    })
    .sort((a: TipoAp , b: TipoAp) => {

      if( a.posicao > b.posicao ){
        return 1;
      } else if ( a.posicao < b.posicao ){
        return -1
      }
    return 0;
  });

  for(let i = 1; i < listaFinal.length; i++){
    if( listaFinal[ i - 1].posicao > listaFinal[i].posicao){
      throw `error at ${i}`
    }
  }

  for await ( const el of listaFinal ){

    for await ( const aprovado of aprovados ){

        if( el.posicao === aprovado.posicao ){

          aprovado.nome = el.nome.toLowerCase();
          await AprovadoRepo.save(aprovado);
          break;
        }
    }
  }

  //'../../dados_dos_aprovados/situacaoBruta.csv'
}

/*
async function atualizarInscricao(){
  const aprovados = await AprovadoRepo.find();
  let i = 0;
  for ( const apr of aprovados ){
    for( const data of TODOS_OS_APROVADOS) {
      if ( apr.posicao === data.posicaoAmpla ){
        i += 1;
      }
    }
  }
}
*/

async function atualizarSenha(){
  const aprovados = await AprovadoRepo.find();

  for await ( const apr of aprovados ){
    const novaSenha = await CriptografiaBcrypt.criptografarSenha(apr.posicao.toString());
    apr.setSenha(novaSenha);
  }

  await AprovadoRepo.save(aprovados);
}

async function executar(): Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    await atualizarSenha()
  } else {
    await atualizarSenha()
  }
}



executar()
  .then((ok) => { 
    console.log("called after")
  })
  .catch((err) => {
    console.log(err)
  });

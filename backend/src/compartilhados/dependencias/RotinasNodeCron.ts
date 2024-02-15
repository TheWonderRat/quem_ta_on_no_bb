import cron from 'node-cron';

import { AprovadoRepo } from '../../database/ORM/repositorio/exporter';
import { GerenciadorDeBots } from '../utilitarios/exporter';
import { bot } from '../../SSOT/exporter';


export default function carregarRotinas(){

  cron.schedule('30 8 * * *',async () =>{
    const aprovados = await AprovadoRepo.buscarTodos();
    const captcha = bot.TOKEN;

    GerenciadorDeBots.atualizarListas( captcha, aprovados, undefined)
      .then((ok) => {
        //TODO:: inserer nos erros
        console.log(`chamado apos todos os aprovados serem atualizados!\n${ok}`)
      })
      .catch((err) =>{
        //TODO:: inserer nos erros
        console.log(`erro em algum dos aprovados!:\n${err}`)
      });
  })

  console.log('rotinas carregadas!')
};

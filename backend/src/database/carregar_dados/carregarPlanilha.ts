import dataSource from "../config";



async function carregarDados(){

}

async function executar(){
  if(!dataSource.isInitialized){
    await dataSource.initialize()
      .then(async () => 
        await carregarDados()
    ).catch((e) => 
      console.log(e)
    )
  } else {
    await carregarDados();
  }
}
executar().then(() => console.log("Dados devidamente carregados!")).catch((e) => console.log(`ERRO!:\n${e}`))



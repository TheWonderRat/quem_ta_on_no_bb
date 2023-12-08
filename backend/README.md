
# `Back-end - pessoas aprovados no Concurso do Banco do Brasil  2023`

Olá!! Bem vindo ao backend da nossa aplicação.

Abaixo seguem informações sobre como foi montada a estrutura do backend, que tem como objetivo ser uma API de consulta para o frontend.

Esse serviço será responsável pela lógica de consulta, inserção, atualização e deleção ([CRUD](https://pt.wikipedia.org/wiki/CRUD)) de dados dos aprovados no certame!!

<hr>

## Como contribuir ##
Cada um dos serviços precisa de manutenção, melhoraria de performance e implementação de novas funcionalidades!!
Nos ajude fornecendo seu conhecimento e habilidades para implementar uma plataforma mais interessante e performática.

  > Para contribuir:
  >
  > 1. Escolha um ou mais serviços que tenha interesse em participar,
  >
  > 2. Leia o README.md do(s) serviço(s),
  >  
  > 3. Se estiver de acordo com os padrões de projeto utilizado, pode começar a escrever código :thumbsup:

:loudspeaker: **IMPORTANTE** :loudspeaker:

:telephone: [Não se esqueca de entrar em contato conosco.](#contatos) :telephone:

Informações sobre contato no menu abaixo :point_down::point_down::point_down:

<hr>

<details>

  <summary>
    <strong>
      <h3>
        Termos e acordos gerais
      </h3>
    </strong>
  </summary>

Aos interessados em particiar do projeto, segue abaixo as recomendações e regras a serem seguidas pelos contribuidores.
  - Cada serviço tem suas regras e recomendações específicas, consulte o README.md de cada serviço para mais detalhes.
  - Padrões de projeto devem ser seguidos, a fim de se evitar conflitos.
  - Para todos os serviços utilizamos a estrutura de [Git](https://blog.rocketseat.com.br/iniciando-com-git-github/) e [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04).
  - Todos os serviços se integram através de containers [docker](https://www.docker.com/) - para mais informações sobre containers [docker / docker compose / docker-cli](https://docs.docker.com/get-started/overview/) consulte a documentação.
  - Pull requests seomente serão mergeados após aprovação de pelo menos 1 (um) outro colaborador.

</details>

<hr>

<details>

  <summary>
    <strong>
      <h3>
        Termos e acordos do Back-end
      </h3>
    </strong>
  </summary>

Para o backend foi escolhida linguagem `TypeScript`, sendo executada através do **NODE.JS**, para criar um API RESTful, responsável por receber requisições da aplicação frontend, e implementar as lógicas e manipulações de dados necessárias para consultar ou modificar o banco de dados.

<br>

1. Especificações **gerais** para novas implementações e manutenção do backend:
  - linguagem - `TypeScript`,
  - padrão de escrita e linguagem:
     - [Camel case](https://pt.wikipedia.org/wiki/CamelCase),
     - Inglês para o código,
     - PT-BR para comentários,
  - Estrutura:
    - POO - [(Progamação Orientada a Objeto)](https://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos)
    - [API RESTful](https://aws.amazon.com/pt/what-is/restful-api/#:~:text=A%20API%20RESTful%20%C3%A9%20uma,terceiros%20para%20executar%20v%C3%A1rias%20tarefas.)
    - [SSOT - Single Source Of Truth](https://www.zup.com.br/blog/single-source-of-truth)
    - [Arquitetura MVC](https://www.geeksforgeeks.org/mvc-framework-introduction/)
      - Controller: camada responsável por receber e mapear as requisições feitas pelo cliente (comunicação restrita com camada service).
      - Service: camada responsável por estabelecer e processar as regras de negócio (comunicação estrita com camada repository).
      - Repository:  camada responsável por realizar a conexão com banco de dados (comunicação restrita com o ORM - [Object-Relational Mapping](https://blog.cubos.academy/orm-object-relational-mapper/#)).
  - Princípios:
    - [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)

<br>
<br>

2. Para garantir a padronização são utilizadas as seguintes ferramentas para verificação de código estático:
  - Linter:
    - [ESlint](https://eslint.org/)
    - [TypeScript-eslint](https://typescript-eslint.io/)

<br>
<br>

3. Para garantir a confiabailidade é **obrigatória** a implementação de testes. Os testes deverão seguir as seguintes especificações:
 - testes unitários:
     - biblioteca utilizada - [JEST](https://jestjs.io/pt-BR/)
 - testes de cobertura:
     - biblioteca utilizada - [JEST](https://jestjs.io/pt-BR/)
 - testes de integração:
     - biblioteca utilizada - [SuperTest](https://github.com/ladjs/supertest#readme)

<br>
<br>

⚠️
<strong>
Qualquer alteração no código, seja uma pequena correção de bug ou desenvolvimento de uma nova funcionalidade, somente será aceita se
</strong>
⚠️:
  -  Não houver erros de lint no código submetido.
  -  Aprovação em todos os testes preexistentes;
  -  Aprovação em todos os novos testes implementados;
  -  Taxa de cobertura do código, por testes, estiver acima do 90%;
  
</details>

<hr>

<details>

  <summary>
    <strong>
      <h3>
        Principais bibliotecas utilizadas
      </h3>
    </strong>
  </summary>

  > Para informações detalhadas sobre todas as bibliotecas de terceiros utilizadas nesse projeto acesse as informações diretamente no arquivo `package.json`

Acreditamos que será importante destacar quais são as principais bibliotecas de terceiros, frameworks e demais stacks que demandarão manutenção e conhecimento por aqueles que trabalharão diretamente no código da aplicação.

Assim como também documentar e deixar a disposição links úteis para consultas e aprendizados.

Bibliotecas:
1. Linguagem - [TypeScript](https://www.typescriptlang.org/docs/)
2. Runtime - [Node.js](https://nodejs.org/docs/latest/api/)
3. Web - [Express](https://expressjs.com/pt-br/starter/hello-world.html)
4. ORM - [Object-Relational Mapping](https://blog.cubos.academy/orm-object-relational-mapper/#):
   - [Sequelize](https://sequelize.org/)
   - [postgres](https://github.com/brianc/node-postgres)
6. Criptografia:
   - [JWT - Json Web Token](https://github.com/auth0/node-jsonwebtoken)
   - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
7. Testes:
   - [JEST](https://jestjs.io/pt-BR/)
   - [SuperTest](https://github.com/ladjs/supertest#readme)
8. Linter - [ESlint](https://eslint.org/)
  
</details>

<hr>

## Requisitos ##

<details>

  <summary>
    <strong>
      !! Requisitos obrigatórios !!
    </strong>
  </summary>

  <br>
  
  1. Docker :red_circle::

       - Para verificar a instalação do `docker` execute no terminal:

         ```
         $ docker --version
         ```

         caso o retorno seja algo como:

         ```
         $ docker: command not found
         ```

         siga pra este [link - Instalação do Docker Engine -](https://docs.docker.com/engine/install/) para realizar a instalação do Docker.

  <br>
  <br>

  2. Node.js :red_circle::
     
      - Para verificar a instalação do `node` execute no terminal:

        ```
        $ node --version
        ```
        
        caso o retorno seja algo como:

        ```
        $ Command 'node' not found, but can be installed with:
        $ sudo apt install nodejs
        ```

        siga pra este [link - Inslação do Node através do NVM -](https://github.com/nvm-sh/nvm#installing-and-updating) para realizar a instalação do node.js.

</details>

<br>

<details>
  <summary>
    <strong>
      !! Requisitos opcionais (desejáveis) !!
    </strong>
  </summary>

  <br>

  1. Python versão 3 ou superior :green_circle::

       - Para verificar a instalção do `python3` execute no terminal:
         ```
         $ python3 --version
         ```

         caso o retorno seja algo como:

         ```
         $ command not found: python
         ```

         siga para esse [link - Instalação do python -](https://wiki.python.org/moin/BeginnersGuide/Download) para realizar a instalação do python 3 ou superior.
  
</details>

<hr>

## Iniciando a aplicação ##

<details>

  <summary>
    <strong>
      ‼ Primeros passos !!
    </strong>
  </summary>

<br>

1. Clone o repositório
  
   - Use um dos comandos abaixo:
        - `git clone git@github.com:TheWonderRat/quem_ta_on_no_bb.git`
        - `git clone https://github.com/TheWonderRat/quem_ta_on_no_bb.git`
   - Entre na pasta do repositório que você acabou de clonar:
     - `cd <nome do repositório>`
   - Entre na pasta do backend:
     - `cd backend`

<br>
<br>
  
2. Crie um arquvivo `.env`:
   
   - User o comando abaixo para criar uma arquivo para definir as variáveis de ambiente:

     ```
     $ touch .env
     ```

   - Abra o arquivo `.env` no editor de códido de sua preferência e defina as seguintes variáveis de ambiente:

     ```
     1.  POSTGRES_DB=defina_o_nome_do_db
     2.  POSTGRES_USER=defina_um_usuário
     3.  POSTGRES_PASSWORD=defina_uma_senha
     4.  PORT_DB=defina_uma_porta
     5.  PORT_BACK=defina_uma_porta
     6.  HOST_BACK=defina_o_host
     7.  JWT_SECRET=segredo-jwt
     8.  JWT_EXPIRATION=tempo-de-expiracao
     ```

   - caso não tenha familiaridae com alguma das variáveis de ambiente citadas acima consulte:
     - [PostgresSQL](https://www.postgresql.org/docs/16/tutorial.html) ou [docker-postgres](https://hub.docker.com/_/postgres)
     - [JWT - Json Web Token](https://github.com/auth0/node-jsonwebtoken)

<br>
<br>
  
3. Inicie o conatainer do banco de dados com o Docker através de uma das opções abaixo:
   
   - <details>
       <summary>
         Através do <code>docker compose</code> (Recomendado):
       </summary>
     
     <br>
   
     - Retorne ao diretório superior com o comando:
     
       ```
       $ cd ..
       ```
     
     <br>
     
     - User o comando abaixo para criar uma arquivo para definir as variáveis de ambiente:

       ```
       $ touch .env
       ```
     
     <br>
     
     - Abra o arquivo `.env` no editor de códido de sua preferência e defina as seguintes variáveis de ambiente:

       ```
       1.  POSTGRES_DB=defina_o_nome_do_db
       2.  POSTGRES_USER=defina_um_usuário
       3.  POSTGRES_PASSWORD=defina_uma_senha
       4.  PORT_DB=defina_uma_porta
       5.  PORT_BACK=defina_uma_porta
       6.  HOST_BACK=defina_o_host
       7.  JWT_SECRET=segredo-jwt
       8.  JWT_EXPIRATION=tempo-de-expiracao
       ```

     **Observação**: As variáveis de ambiente definidas neste arquivo **DEVEM** coincidir com as variáveis definidas anteriormente no arquivo `.env` do diretório `backend` criadas no passo 2.

     <br>
     
     - Inicie o banco de dados através do comando:

       ```
       $ docker compose up db -d
       ```

       Caso esteja usando uma versão mais antiga do Docker, e o comando acima resultar em erro, tente o comando abaixo:

       ```
       $ docker-compose up db -d
       ```
  
     </details>
     
   - <details>
       <summary>
         Através do diretório do banco de dados:
       </summary>
     
     <br>
     
     - Mude para o diretório `database` na raiz do projeto com o comando:

       ```
       $ cd ../database
       ```

     <br>
     
     - User o comando abaixo para criar uma arquivo para definir as variáveis de ambiente:

       ```
       $ touch .env
       ```

     <br>
     
     - Abra o arquivo `.env` no editor de códido de sua preferência e defina as seguintes variáveis de ambiente:

       ```
       1.  PORT_DB=defina_uma_porta
       2.  POSTGRES_USER=defina_um_usuário
       3.  POSTGRES_PASSWORD=defina_uma_senha
       4.  POSTGRES_DB=defina_o_nome_do_db
       ```
       
     **Observação**: As variáveis de ambiente definidas neste arquivo **DEVEM** coincidir com as variáveis definidas anteriormente no arquivo `.env` do diretório `backend` criadas no passo 2.

     <br>
     
     - User os comandos abaixo para criar o banco de dados através do `Dockerfile` e iniciar uma `network`:

       ```
       $ docker build -t database .
       $ docker network create aprovados_bb
       $ docker run --name db --env-file .env -p 5432:5432 -v ./data:/var/lib/postgresql/data --rm --network=aprovados_bb -d database
       ```

     </details>
     
   - <details>
       <summary>
         Através da criação de containers manualmente:
       </summary>
     
     <br>
     
     - Use o comando abaixo para criar um container para o banco de dados, criar uma `network`, e configurar as variáveis de ambinte:

       ```
       $ docker network create aprovados_bb
       $ docker create --name db \
       --env-file .env \
       -p 5432:5432 \
       -v ${PWD}/../database/data:/var/lib/postgresql/data \
       --rm \
       --network=aprovados_bb \
       postgres:16

       $ docker cp ${PWD}/../database/uuid_install.sh:/docker-entrypoint-initdb.d/
       $ docker start db
       ```

     </details>

<br>
<br>

4. Após iniciado o banco, verifique se o container está ativo e operacional com uma das opções abaixo:
     - Inicie alguma aplicação para acesso ao postgres. Ex.: [Dbeaver](https://dbeaver.io/download/), [pgAdmin](https://www.pgadmin.org/)
       
       ou
   
     - Acesse via terminal com os comandos:
       
       ```
       $ docker exec -i -t db sh
       $ psql -U $POSTGRES_USER -d $POSTGRES_DB -h localhost -p 5432 -W
       ```

</details>

<br>

<details>

  <summary>
    <strong>
      ‼ Iniciando a aplicação backend !!
    </strong>
  </summary>

  <br>

  Uma vez que o **banco de dados** está operacional, será possível iniciar o backend da aplicação.
  
  > Ressaltamos que não é possível inicar o serviço backend sem a devida conexão a um banco de dados, em razão da integração entre a biblioteca de ORM - (Object-Relational Mapping) e o banco de dados (database/db).

  <br>
  
  Para iniciar a aplicação em ambiente de `desenvolvimento` use os seguintes comandos:
    
  ```
  $ npm install
  $ npm run dev
  ```

  Para iniciar a aplicação em ambiente de `produção` use os seguintes comandos:

  ```
  $ cd ..
  $ docker compose up backend -d
  ```

</details>

<hr>

## Comandos úteis ##

<details>

  <summary>
    <strong>
      <strong>🎛 Linter</strong>
    </strong>
  </summary>

  <br>

  Para garantir a qualidade do código, utilizamos neste projeto o `Eslint`.
  Assim garantimos o alinhamento com as boas práticas de desenvolvimento, legíbilidade do código e facilita a manutenção!
  
  Para poder executar o `Eslint` certifique-se que realizou a instalação das dependências do projeto.
  Se você seguiu o passo-a-passo até aqui é esperado que tenha uma pasta com nome `node_modules` dentro do diretório `backend`.
  
  Caso tenha pulado alguma etapa, e não tenha a pasta acima mencionada dentro do diretório `backend`, execute o comando:
  
  ```
  $ npm install
  ```

  <br>

  Uma vez que os pacotes estão devidamente instalados, para executar localmente a avaliação do linter - `Eslint` - execute o comando abaixo:
  
  ```
  $ npm run lint
  ```

  > Se a análise do `Eslint` encontrar irregularidades no seu código, estas serão exibidas no
  > seu terminal. Se a avaliação do `Eslint` não encontrar irregularidades nada será impresso no terminal.

  <br>

  A biblioteca `Eslint` é capaz de consertar automaticamente várias irregularidades. Para realizar a correção automática basta executar o comando abaixo:
  
  ```
  $ npm run lint:fix
  ```

⚠️ **Observação**: Apesar da biblioteca ser capaz de consertar várias irregularidades automaticamente, **NÃO** quer dizer que ela seja capaz de consertar **TODAS**. Portanto, depois de executar o comando para autocorreção execute a avaliação novamente!! Para resolver as irregularidades remanescentes será necessário que você **DESENVOLVEDOR** realize as correções manualmente. ⚠️

<br>
<br>

  Recomendação
  ------------
  
  Recomendamos que você instale o plugin do `Eslint` na sua `IDE`. Todas as principais `IDE's` disponíveis no mercado tem plugins para `Eslint`. Segue abaixo links para instalação do puglin:
  - [VSCODE](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [IntelliJ](https://plugins.jetbrains.com/plugin/7494-eslint)
  - [PhpStorm](https://plugins.jetbrains.com/plugin/7494-eslint)
  - [Eclipse](https://marketplace.eclipse.org/content/wild-web-developer-html-css-javascript-typescript-nodejs-angular-json-yaml-kubernetes-xml)
  - para outras IDE's consulte a página oficial [nesse link](https://eslint.org/docs/latest/use/integrations)

<br>

⚠️ **PULL REQUESTS COM IRREGULARIDADES DE LINTER (`Eslint`) NÃO SERÃO APROVADOS. ATENTE-SE PARA RESOLVER A IRREGULARIDADES ANTES
DE SUBMETER AS ALTERAÇÕES!** ⚠️
  
</details>

<br>

<details>
  <summary>
    <strong>🛠 Testes</strong>
  </summary>

<br>

  Utilizamos para o backend duas bibliotecas de testes, sendo elas o [JEST](https://jestjs.io/pt-BR/) e o [SuperTest](https://github.com/ladjs/supertest#readme).
  
  A biblioteca de teste principal é o [JEST](https://jestjs.io/pt-BR/), que está sendo utilizada para desenvolver testes unitários e testes de cobertura.

  A segunda biblioteca de teste - [SuperTest](https://github.com/ladjs/supertest#readme) - tem a função de realizar os testes de integração, uma vez essa biblioteca foi craida para simular requisições HTTP, e é plenamente integrável com o JEST.

  Os testes estão dividos em baterias ("suitcases"), e numeradas de forma crescente, a fim de otimizar a realização de testes específicos.

  <br>

  Para executar todos os testes execute o comando:
  
  ```
  $ npm test
  ```

  <br>

  Afim de otimizar tempo e recursos de processamento, é possível executar "suitcases" de teste de forma individual.
  Para executar apenas alguma bateria específica de testes execute o comando abaixo:
  
  ```
  $ npm run test -t "número do arquivo de teste"
  ```

  <br>

  A numeração dos testes **UNITÁRIOS** está subdividada da seguinte forma:
  
  - `0x-testName.test.ts`: Testes unitários referentes à camada controller;
  - `1x-testName.test.ts`: Testes unitários referentes à camada service;
  - `2x-testName.test.ts`: Testes unitários referentes à camada repository;
  - `3x-testName.test.ts`: Testes unitários referentes aos middlewares;
  - `4x-testName.test.ts`: Testes unitários referentes aos utilitários (utils);
  - `5x-testName.test.ts`: Testes unitários referentes aos helpers;

  A numeração dos tests **DE INTEGRAÇÃO** está subdividada da seguinte forma:
  
  - `eox-testName.test.ts`: Teste de integração referente à rota "/health";
  - `e1x-testName.test.ts`: Teste de integração referente à rota "/login";
  - `e2x-testName.test.ts`: Teste de integração referente à rota "/user";

  <br>

  Para testes de cobertura, execute o comando abaixo:

  ```
  $ npm run test:coverage
  ```

  **Observarção**: Para realizar a aferição da cobertura do código por testes, esse comando executará **TODOS** os testes. Portanto, é uma execução lenta e que consumirá muitos recursos da máquina. Ao final da avaliação será exibido, no terminal, todos os dados de cobertura de testes, e será criado automaticamente um diretório de nome `coverage` que armazenará esses dados.

  <br>
  <br>

  Executando apenas **UM** teste, ou pulando algum teste.
  -------------------------------------------------------

  Ainda quanto à execuções individuais de testes, a biblioteca do [JEST](https://jestjs.io/pt-BR/) detêm 2 palavras reservadas, sendo elas `only` e `skip`.
  
  Utilizando dessas palavras é possível executar apenas **UM** caso específico de teste, como no exemplo abaixo:

  ```
  test.only('it is raining', () => {

    // ... Esse teste será executado

    expect(inchesOfRain()).toBeGreaterThan(0);
  });

  test('it is not snowing', () => {

    // ... Esse teste será ignorado.

    expect(inchesOfSnow()).toBe(0);
  });
  ```

  Ou executar apenas **UMA** "suitcase" específica, como no exemplo abaixo:

  ```
  describe.only('my beverage', () => {

    // ... Essa suitcase será executada

    test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
    });
  });

  describe('my other beverage', () => {

    // ... Esta suitcase será ignorada

  });
  ```

  A outra palavra reservada, `skip`, pulará o teste ou "suitcase". Como nos exemplos a seguir:

  Caso em que **UM** teste é pulado:
  
  ```
  test('it is raining', () => {

    // ... Esse teste será executado

    expect(inchesOfRain()).toBeGreaterThan(0);
  });

  test.skip('it is not snowing', () => {

    // ... Esse teste será ignorado

    expect(inchesOfSnow()).toBe(0);
  });
  ```

  Caso em que **UMA** "suitcase" de teste é pulada:

  ```
  describe('my beverage', () => {

    // ... Essa suitcase será executada

    test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
    });
  });

  describe.skip('my other beverage', () => {

    // ... Essa suitcase será ignorada

  });
  ```

  ⚠️ **Observação**: Lembre-se que para executar apenas **UM** teste ou apenas **UMA** "suitcase" de testes é necessário usar o comando `npm run test -t "número do teste"`. Caso use o comando `npm test` todas as "suitcases" serão executadas, pois a biblioteca JEST executa os testes em paralelo para otimizar o tempo de execução e capacidade de processamento. ⚠️

<br>

:books: Para mais informações sobre a biblioteca de testes [JEST](https://jestjs.io/pt-BR/) utilize a documentação oficial. :books:

</details>

<hr>

## Contatos ##

<details>
  
### **Envie** uma mensagem para os nossos colaboradores. ###
>  Tire dúvidas!
>
> Proponha mudanças!
>
> Informe que tem interesse em colaborar, e em que parte pode ajudar!
>
> De feedback sobre as implementações!
>
> Nos ajude a fazer essa aplicação algo INCRÍVEL! :star_struck:

Colaboradores :busts_in_silhouette: :

  -  Felipe
      - ![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white) :: felipe.raindo+dev@gmail.com
        
      - ![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) :: @feliperaindo
        
      - ![image](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) :: @feliperaindo
        
      - ![image](https://dcbadge.vercel.app/api/shield/555185291770593302) :: @sazanh

</details>

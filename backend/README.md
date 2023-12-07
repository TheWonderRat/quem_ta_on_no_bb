
# `Back-end - pessoas aprovados no Concurso do Banco do Brasil  2023`

Olá!! Bem vindo ao backend da nossa aplicação.

Abaixo seguem informações sobre como foi montada a estrutura do backend, que tem como objetivo ser uma API de consulta para o frontend, onde armazenará toda a lógica de consulta, inserção, atualização e demais servicos de relacionados à manipulação do dados dos aprovados no certame!!

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

Aos interessados em particiar do projeto, segue abaixo as recomendações e regras a serem seguidas para os contribuidores.
  - Cada serviço tem suas regras e recomendações específicas, consulte o README.md de cada serviço para mais detalhes.
  - Padrões de projeto devem ser seguidos, a fim de se evitar conflitos.
  - Para todos os serviços utilizamos a estrutura de [Git](https://blog.rocketseat.com.br/iniciando-com-git-github/) e [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04).
  - Todos os serviços se integram através de containers [docker](https://www.docker.com/) - para mais informações sobre containers [docker / docker compose / docker-cli](https://docs.docker.com/get-started/overview/) consulte a documentação.
  - Aprovação e merge de cada pull requests deve ter aprovação de pelo menos 1 (um) outro colaborador.

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

Para o backend foi escolhida linguagem `TypeScript`, sendo executada através do **NODE.JS**, para criar um API RESTful, responsável por receber requisições da aplicação frontend, e implementar as lógicas necessárias para realizar as consultas necessárias ao banco de dados.

<br>
<br>

1. Especificações **gerais** para implementações de manutenção do backend:
  - linguagem - `TypeScript`,
  - padrão de escrita e linguagem:
     - [Camel case](https://pt.wikipedia.org/wiki/CamelCase),
     - Inglês para o código,
     - PT-BR para comentários,
  - Estrutura:
    - POO - [(Progamação Orientada a Objeto)](https://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos)
    - [API RESTful](https://aws.amazon.com/pt/what-is/restful-api/#:~:text=A%20API%20RESTful%20%C3%A9%20uma,terceiros%20para%20executar%20v%C3%A1rias%20tarefas.)
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
  -  Sem erros de lint no código submetido.
  -  Aprovação em todos os testes preexistentes;
  -  Aprovação em todos os novos testes implementados;
  -  taxa de cobertura do código, por testes, estiver acima do 90%;
  
</details>

<hr>

<details>

  <summary>
    <strong>
      <h3>
        Principais bibliotecas de terceiros utilizada
      </h3>
    </strong>
  </summary>

  >Para informações detalhadas sobre todas as bibliotecas de terceiros utilizadas nesse projeto acesse as informações diretamente no arquivo     `package.json`

Para novos contribuidores, acreditamos que será importante destacar quais são as principais bibliotecas de terceiros, frameworks e demais stacks que demadarão manutenção e conhecimento por aqueles que trabalharão diretamente no código da aplicação.

Assim como também documentar e deixar a disposição links úteis para consultas e aprendizados.

Bibliotecas:
1. Linguagem - [TypeScript](https://www.typescriptlang.org/docs/)
2. Runtime - [Node.js](https://nodejs.org/docs/latest/api/)
3. Web - [Express](https://expressjs.com/pt-br/starter/hello-world.html)
4. ORM:
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

<details>
  <summary>
    <strong>
      !! Requisitos opcionais (desejáveis) !!
    </strong>
  </summary>

  1. Python versão 3 ou superior :green_circle::

       - Para verificar a instalção do `Python` execute no terminal:
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
  
1. Clone o repositório
   - Use o comando:
     - `git clone <url do repositório>`
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
   - <details><summary>Através do <code>docker compose</code> (Recomendado):</summary>
     
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
     
   - <details><summary>Através do diretório do banco de dados:</summary>
     
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
       $ docker build .
       $ docker network create aprovados_bb
       $ docker run --name db --env-file .env -p 5432:5432 -v ./database:/docker-entrypoint-initdb.d/ --network=aprovados_bb -d database
       ```

     </details>
     
   - <details><summary>Através da criação de containers manualmente:</summary>
     
     <br>
     
     - Use o comando abaixo para criar um container para o banco de dados, criar uma `network`, e configurar as variáveis de ambinte:

       ```
       $ docker network create aprovados_bb
       $ docker run --name db --env-file .env -p 5432:5432 -v ./database:/docker-entrypoint-initdb.d/ --network=aprovados_bb -d postgres:16
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

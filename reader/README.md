
# `Leitor do DOU (Diário Oficial da União)`

Olá!! Bem vindo ao Leitor - `reader` - da nossa aplicação.

Abaixo seguem informações sobre como foi montada a estrutura do Leito, que tem como objetivo leitor dos dados divulgados no DOU - Diário Ofical da União.

Após ler os dados do DOU o `reader` separa os dados dos candidatos aprovados, e categoriza entre aqueles que compõe o cadastro de reserva e os demais classificados

Uma vez segregados os dados, o `reader`, por fim, se utilizará dos servicos `backend` e `database` para inserir os aprovados no banco de dados, através de requisições HTTP!!

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
        Termos e acordos do Leitor
      </h3>
    </strong>
  </summary>

O `reader` - Leitor - foi desenvolvido na linguagem `Python`. Será responsável por segregar os dados divulgados no DOU - Diário Oficial da União -, e implementar as lógicas e manipulações de dados necessárias para inserir esses dados no banco de dados através de requsições HTTP.

<br>

1. Especificações **gerais** para novas implementações e manutenção do Leitor:
   - linguagem - `Python`,
     - padrão de escrita e linguagem:
       - [Snake case](https://en.wikipedia.org/wiki/Snake_case),
       - Inglês para o código,
       - PT-BR para comentários,
   - Estrutura:
     - Servico de leitura e segregação de dados - disponível no diretório `src/seeder`
     - Servico de criação de requsições HTTP - disponível no diretório `src/requester`
   - Princípios:
     - [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)

<br>

2. Para garantir a padronização são utilizadas as seguintes ferramentas para verificação de código estático:
   - Linter:
     - [Flake8](https://github.com/pycqa/flake8)
     - [Black](https://black.readthedocs.io/en/stable/)

<br>

3. Para garantir a confiabailidade é **obrigatória** a implementação de testes. Os testes deverão seguir as seguintes especificações:
   - testes unitários:
     - biblioteca utilizada - [Pytest](https://docs.pytest.org/en/7.4.x/)
   - testes de cobertura:
     - biblioteca utilizada - [Pytest-cov](https://pytest-cov.readthedocs.io/en/latest/readme.html#)

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

  > Para informações detalhadas sobre todas as bibliotecas de terceiros utilizadas nesse projeto acesse as informações
  > diretamente nos arquivos `requirements.txt` e `dev-requirements.txt`

Acreditamos que será importante destacar quais são as principais bibliotecas de terceiros, frameworks e demais stacks que demandarão manutenção e conhecimento por aqueles que trabalharão diretamente no código da aplicação.

Assim como também documentar e deixar a disposição links úteis para consultas e aprendizados.

Bibliotecas:
1. Linguagem - [Python](https://docs.python.org/3/)
2. Web - [Requests](https://requests.readthedocs.io/en/latest/)
3. Leitor PDF - [PyPDF2](https://pypdf2.readthedocs.io/en/latest/)
4. Testes:
   - [Pytest](https://docs.pytest.org/en/7.4.x/)
   - [Pytest-cov](https://pytest-cov.readthedocs.io/en/latest/readme.html#)
5. Linter:
   - [Flake8](https://github.com/pycqa/flake8)
   - [Black](https://black.readthedocs.io/en/stable/)
  
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

         siga pra este link - [Instalação do Docker Engine](https://docs.docker.com/engine/install/) - para realizar a instalação do Docker.

  <br>
  <br>

  1. Python versão 3 ou superior :red_circle::

       - Para verificar a instalção do `python3` execute no terminal:
         ```
         $ python3 --version
         ```

         caso o retorno seja algo como:

         ```
         $ command not found: python
         ```

         siga para esse link - [Instalação do python](https://wiki.python.org/moin/BeginnersGuide/Download) - para realizar a instalação do python 3 ou superior.

</details>

<br>

<details>
  <summary>
    <strong>
      !! Requisitos opcionais (desejáveis) !!
    </strong>
  </summary>

  <br>

  1. Node.js :green_circle::
     
      - Para verificar a instalação do `node` execute no terminal:

        ```
        $ node --version
        ```
        
        caso o retorno seja algo como:

        ```
        $ Command 'node' not found, but can be installed with:
        $ sudo apt install nodejs
        ```

        siga pra este link - [Inslação do Node através do NVM](https://github.com/nvm-sh/nvm#installing-and-updating) - para realizar a instalação do node.js.
  
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
     - `cd quem_ta_on_no_bb`
   - Entre na pasta do backend:
     - `cd reader`

<br>
<br>
  
2. Crie um arquvivo `.env`:
   
   - Use o comando abaixo para criar uma arquivo para definir as variáveis de ambiente:

     ```
     $ touch .env
     ```

   - Abra o arquivo `.env` no editor de códido de sua preferência e defina as seguintes variáveis de ambiente:

     ```
     1.  PORT_BACK=porta_do_backend
     2.  SEED_ID=número_da_microrregião
     ```

   - dentro do diretório há um arquivo de nome `.env.example` a título ilustrativo.
     
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
     
     - Use o comando abaixo para criar uma arquivo para definir as variáveis de ambiente:

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
       6.  PORT_FRONT=defina_uma_porta
       7.  HOST_BACK=defina_o_host
       8.  JWT_SECRET=segredo-jwt
       9.  JWT_EXPIRATION=tempo-de-expiracao
       10. SEED_ID=número_da_microrregião
       ```
       
       > ⚠️ **Observação**: As variáveis de ambiente definidas neste arquivo **DEVEM** coincidir com as variáveis definidas
       > anteriormente no arquivo `.env` do diretório `backend` criadas no passo 2.

     - dentro do diretório há um arquivo de nome `.env.example` a título ilustrativo.

     <br>
     
     - Inicie o banco de dados através do comando:

       ```
       $ docker compose up backend -d
       ```

       Caso esteja usando uma versão mais antiga do Docker, e o comando acima resultar em erro, tente o comando abaixo:

       ```
       $ docker-compose up backend -d
       ```
  
     </details>

     <br>
     <br>

   - <details>
       <summary>
         Através dos diretórios <code>database</code> e <code>backend</code>:
       </summary>
     
     <br>
     
     - Mude para o diretório `database` na raiz do projeto com o comando:

       ```
       $ cd ../database
       ```

     <br>
     
     - Use o comando abaixo para criar uma arquivo `.env` para definir as variáveis de ambiente:

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

     - dentro do diretório há um arquivo de nome `.env.example` a título ilustrativo.
  
     - caso não tenha familiaridae com alguma das variáveis de ambiente citadas acima consulte:
       - [PostgresSQL](https://www.postgresql.org/docs/16/tutorial.html) ou [docker-postgres](https://hub.docker.com/_/postgres)

     <br>
     
     - User os comandos abaixo para criar o banco de dados através do `Dockerfile` e iniciar uma `network`:

       ```
       $ docker build -t database .
       $ docker network create aprovados_bb
       $ docker run --name db --env-file .env -p 5432:5432 -v ./data:/var/lib/postgresql/data --rm --network=aprovados_bb -d database
       ```

     <br>
       
     - Após iniciado o banco, verifique se o container está ativo e operacional com uma das opções abaixo:
       - Inicie alguma aplicação para acesso ao postgres. Ex.: [Dbeaver](https://dbeaver.io/download/), [pgAdmin](https://www.pgadmin.org/)
       
         ou

       - Acesse via terminal com os comandos:
       
         ```
         $ docker exec -i -t db sh
         $ psql -U $POSTGRES_USER -d $POSTGRES_DB -h localhost -p 5432 -W
         ```

     <br>
  
     - Mude para o diretório `backend` com o comando:
    
       ```
       $ cd ../backend
       ```

     <br>
  
     - Use o comando abaixo para criar uma arquivo `.env` para definir as variáveis de ambiente:

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
  
       > ⚠️ **Observação**: As variáveis de ambiente definidas neste arquivo **DEVEM** coincidir com as variáveis definidas
       > anteriormente no arquivo `.env` do diretório `database` criadas no passo anterior, e com as variáveis de ambiente
       > definidas no arquivo `.env` criado no passo 2.
  
     - dentro do diretório há um arquivo de nome `.env.example` a título ilustrativo.
    
     - caso não tenha familiaridae com alguma das variáveis de ambiente citadas acima consulte:
       - [PostgresSQL](https://www.postgresql.org/docs/16/tutorial.html) ou [docker-postgres](https://hub.docker.com/_/postgres)
       - [JWT - Json Web Token](https://github.com/auth0/node-jsonwebtoken)
       
     <br>

     - Inicie a aplicação `backend` em ambiente de `desenvolvimento` com os comandos:
    
       ```
       $ npm install
       $ npm run dev
       ```
       
     </details>

</details>

<br>

<details>

  <summary>
    <strong>
      ‼ Iniciando o Leitor - <code>reader</code> !!
    </strong>
  </summary>

  <br>

  Uma vez que o `database` e a aplicação `backend` estiverem operacionais será possível iniciar o Leitor - `reader`.
  
  > Ressaltamos que não é possível inicar o serviço `reader` sem a devida conexão a com o banco de dados e com o backend,
  > pois o `reader` realizará requisições diretamente para o `backend` que modificação o estado do `database`.

  <br>
  
  Para iniciar o Leitor - `reader` - em ambiente de `desenvolvimento` siga os seguintes passos:

  <br>

  1. Crie um ambiente virtual para desenvolvimento com os comandos:

     ```
     $ python3 -m venv .venv
     $ source .venv/bin/activate
     ```

  <br>
  
  2. Instale as dependências com o comando:

     ```
     $ python3 -m pip install -r dev-requirements.txt
     ```

  <br>

  3. Inicie a aplicação com o comando:

     ```
     env $(cat .env) python3 -m src.main
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

  Para garantir a qualidade do código, utilizamos neste projeto o [`flake8`](https://github.com/pycqa/flake8) e o [`black`](https://black.readthedocs.io/en/stable/).
  Assim garantimos o alinhamento com as boas práticas de desenvolvimento, legíbilidade do código e facilita a manutenção!
  
  Para poder executar o `flake8` ou o `black` certifique-se que realizou a instalação das dependências do projeto.
  Espera-se que tenha um diretório de nome `.venv` dentro do serviço `reader`.
  
  Caso tenha pulado alguma etapa, e não tenha instalado as dependências, execute os comandos:
  
  ```
  $ python3 -m venv .venv
  $ source .venv/bin/activate
  $ python3 -m pip install -r dev-requirements.txt
  ```

  <br>

  Uma vez que os pacotes estão devidamente instalados, para executar localmente a avaliação do linter - `flake8` - execute o comando abaixo:
  
  ```
  $ python3 -m flake8
  ```

  > Se a análise do `flake8` encontrar irregularidades no seu código, estas serão exibidas no
  > seu terminal. Se a avaliação do `flake8` não encontrar irregularidades nada será impresso no terminal.

  <br>

  A biblioteca `black` é capaz de consertar automaticamente várias irregularidades. Para realizar a correção automática basta executar o comando abaixo:
  
  ```
  $ python3 -m black src
  ```

⚠️ **Observação**: Apesar da biblioteca ser capaz de consertar várias irregularidades automaticamente, **NÃO** quer dizer que ela seja capaz de consertar **TODAS**. Portanto, depois de executar o comando para autocorreção execute a avaliação novamente!! Se houverem irregularidades remanescentes será necessário que você **DESENVOLVEDOR** realize as correções manualmente. ⚠️

<br>
<br>

  Recomendação
  ------------
  
  Recomendamos que você instale os plugins do `flake8` e do `black` na sua `IDE`. Todas as principais `IDE's` disponíveis no mercado tem plugins para ambas bibliotecas. Segue abaixo links para instalação do puglin:
  - `flake8`:
    - [VSCODE](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)
    - [IntelliJ](https://plugins.jetbrains.com/plugin/11563-flake8-support)
    - [PyCharm](https://plugins.jetbrains.com/plugin/11563-flake8-support)
    - [Sublime Text 3](https://packagecontrol.io/packages/SublimeLinter-flake8)
    - [Vim](https://www.vim.org/scripts/script.php?script_id=3927)
  - `black`:
    - [VSCODE](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)
    - [IntelliJ](https://plugins.jetbrains.com/plugin/14321-blackconnect)
    - [PyCharm](https://blog.jetbrains.com/pycharm/2023/07/2023-2-eap-5/)
    - [Sublime Text 3](https://packagecontrol.io/packages/python-black)
    - [Vim](https://vimawesome.com/plugin/black)

<br>

⚠️ **PULL REQUESTS COM IRREGULARIDADES DE LINTER (`flake8`) NÃO SERÃO APROVADOS. ATENTE-SE PARA RESOLVER A IRREGULARIDADES ANTES
DE SUBMETER AS ALTERAÇÕES!** ⚠️
  
</details>

<br>

<details>
  <summary>
    <strong>🛠 Testes</strong>
  </summary>

<br>

  Utilizamos para o backend duas bibliotecas de testes, sendo elas o [Pytest](https://docs.pytest.org/en/7.4.x/) e o [Pytest-cov](https://pytest-cov.readthedocs.io/en/latest/readme.html#).
  
  A biblioteca de teste principal é o [Pytest](https://docs.pytest.org/en/7.4.x/), que está sendo utilizada para desenvolver testes unitários.

  A segunda biblioteca de teste - [Pytest-cov](https://pytest-cov.readthedocs.io/en/latest/readme.html#) - tem a função de realizar os testes de cobertura, pois, é plenamente integrável com o Pytest.

  Os testes estão dividos em baterias ("suitcases"), e numeradas de forma crescente, a fim de otimizar a realização de testes específicos.

  <br>

  Para executar todos os testes execute o comando:
  
  ```
  $ python3 -m pytest
  ```

  <br>

  Afim de otimizar tempo e recursos de processamento, é possível executar "suitcases" de teste de forma individual.
  Para executar apenas alguma bateria específica de testes execute o comando abaixo:
  
  ```
  $ python3 -m pytest tests/nomedoarquivo.py
  ```

  <br>

  Para testes de cobertura, execute o comando abaixo:

  ```
  $ python3 -m pytest --cov=myproj tests/
  ```

  **Observarção**: Para realizar a aferição da cobertura do código por testes, esse comando executará **TODOS** os testes. Portanto, é uma execução lenta e que consumirá muitos recursos da máquina. Ao final da avaliação será exibido, no terminal, todos os dados de cobertura de testes.


:books: Para mais informações sobre as bibliotecas de testes [Pytest](https://docs.pytest.org/en/7.4.x/) e [Pytest-cov](https://pytest-cov.readthedocs.io/en/latest/readme.html#) utilize a documentação oficial. :books:

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

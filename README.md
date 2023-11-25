# `Consulta dos aprovados no Banco do Brasil  2023`

Olá!! Bem vindo ao repositório da nossa aplicação.

A aplicação tem o objetivo de facilitar a consulta, pelos aprovados, da colocação e da ordem de chamada!!

## Estrutura ##
A aplicação está estruturada em monorepositório, sendo que cada servico tem seu próprio diretório. Os principais diretório são:
  - banco de dados
  - back-end
  - front-end
  - web scraping
  - bot whatsapp
  - Daemon

## Requisitos ##

<details>

  <summary>
    <strong>
      !! Requisitos obrigatórios !!
    </strong>
  </summary>

  1. Docker :red_circle::

       - Para verificar a instalação do `docker` execute no terminal:
    
             $ docker --version

         caso o retorno seja algo como:

             $ docker: command not found

         siga pra este [link - Instalação do Docker Engine -](https://docs.docker.com/engine/install/) para realizar a instalação do Docker.

</details>

<details>
  <summary>
    <strong>
      !! Requisitos opcionais (desejáveis) !!
    </strong>
  </summary>

  1. Node.js :green_circle::
     
      - Para verificar a instalação do `node` execute no terminal:
        
            $ node --version

        caso o retorno seja algo como:

             $ Command 'node' not found, but can be installed with:
             $ sudo apt install nodejs

        siga pra este [link - Inslação do Node através do NVM -](https://github.com/nvm-sh/nvm#installing-and-updating) para realizar a instalação do node.js.
      

  2. Python versão 3 ou superior :green_circle::

       - Para verificar a instalção do `Python` execute no terminal:
    
             $ python3 --version

         caso o retorno seja algo como:

             $ command not found: python

         siga para esse [link - Instalação do python -](https://wiki.python.org/moin/BeginnersGuide/Download) para realizar a instalação do python 3 ou superior.
  
</details>

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

   
  2. Crie um arquvivo `.env`:
   
      - User o comando: `touch .env`
    
      - Abra o arquivo `.env` no editor de códido de sua preferência e defina as seguintes variáveis de ambiente:
    
            1.  PORT_BACK=defina_uma_porta
            2.  PORT_DB=defina_uma_porta
            3.  PORT_FRONT=defina_uma_porta
            4.  POSTGRES_USER=defina_um_usuário
            5.  POSTGRES_PASSWORD=defina_uma_senha
            6.  POSTGRES_DB=defina_o_nome_do_db
            7.  HOST_BACK=defina_o_host
            8.  JWT_SECRET=defina_uma_palavra_passe
            9.  JWT_EXPIRATION=defina_um_intervalo_de_tempo

      - caso não tenha familiaridae com alguma das variáveis de ambiente citadas acima consulte:
          - [PostgresSQL](https://www.postgresql.org/docs/16/tutorial.html) ou [docker-postgres](https://hub.docker.com/_/postgres)
          - [JWT - Json Web Token](https://jwt.io/introduction) ou [jwt - for node](https://www.npmjs.com/package/jsonwebtoken)
       
  3. Inicie os conatainers com o Docker:

       - User o comando
         
             $ docker compose up --build

       - Caso esteja usando uma versão mais antiga do Docker, e o comando acima resultar em erro, tente o comando abaixo:

              $ docker-compose up --build

  4. Após todo o processamento, e esperado que a aplicação esteja operacional.
       - Para verificar o funcionando do fron-end acesse `http://localhost:{PORT_FRONT}`
       - Para verificar o funcionamento do back_end acesse `http://{HOST_BACK}:{PORT_BACK}`
       - Para verificar o banco de dados inicie alguma aplicação para acesso a banco. Ex.: [Dbeaver](https://dbeaver.io/download/), [pgAdmin](https://www.pgadmin.org/)

## Termos e acordos ##
Aos interessados em particiar do projeto, segue abaixo as recomendações e regras a serem seguidas para os contribuidores.
  - Cada serviço tem suas regras e recomendações específicas, consulte o README.md de cada serviço para mais detalhes.
  - Padrões de projeto devem ser seguidos, a fim de se evitar conflitos.
  - Para todos os serviços utilizamos a estrutura de [Git](https://blog.rocketseat.com.br/iniciando-com-git-github/) e [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04).
  - Todos os serviços se integram através de containers [docker](https://www.docker.com/) - para mais informações sobre containers [docker / docker compose / docker-cli](https://docs.docker.com/get-started/overview/) consulte a documentação.
  - Aprovação e merge de cada pull requests deve ter aprovação de pelo menos 1 (um) outro colaborador.

</details>

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

## Contatos ##

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

:busts_in_silhouette: Colaboradores:

  -  Felipe
      - ![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white) :: felipe.raindo+dev@gmail.com
        
      - ![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) :: @feliperaindo
        
      - ![image](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) :: @feliperaindo
        
      - ![image](https://dcbadge.vercel.app/api/shield/555185291770593302) :: @sazanh

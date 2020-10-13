# AlugaHouse
## Tecnologias utilizadas:
Para desenvolver a aplicação foram usadas as seguintes tecnologias:
### Back-End:
- .NetCore 3.1
- Entity Framework Core 3.1
### Front-end:
- Angular 10
- Bootstrap 4
- HTML
### Banco de Dados:
- SqlServer

## Dependências:
As seguintes dependências são necessárias para o projeto:
- .NetCore SDK 3.1
- .NetCore Runtime
- NodeJs
- SQLServer
- git

## Como executar o projeto:
- Clone o repositório https://github.com/daniel98julio/AlugaHouse.git localmente;
- No Arquivo appsettings.Development.json, ajuste os dados da Connection String para o seu servidor.
- Verifique se as portas 5000 e 4200 estão disponíveis para serem usadas, pois os serviços de back-end e front-end, respectivamente, irão usá-las, caso não estejam, ajuste para portas que estejam disponíveis.
### Execute os seguintes comandos: 
- Com o serviço do SQLServer ativo, entre no diretório AlugaHouse.Repository, abra o terminal e execute o comando: dotnet ef --startup-project ../AlugaHouse.WebApi database update
- Entre no diretório AlugaHouse.WebApi e execute o comando: dotnet run
- Entre no diretório AlugaHouse-App e execute o comando: npm install
- Neste mesmo diretório, execute o comando: ng serve

### Após tais procedimentos e com os dois serviços rodando, o ambiente estará pronto para ser testado.
- Para acessar a aplicação, utilize o link: http://localhost:4200
- Inicie inserindo um tipo de residência.
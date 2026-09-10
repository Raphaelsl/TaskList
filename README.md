# TaskList API

API REST desenvolvida em Node.js para gerenciamento de tarefas com autenticação de usuários.

O projeto foi criado com o objetivo de praticar conceitos de desenvolvimento backend, incluindo autenticação com JWT, relacionamentos utilizando Sequelize, persistência de dados com PostgreSQL, middlewares e organização de uma API em controllers, models e rotas.

## Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* Sequelize
* Sequelize CLI
* JSON Web Token (JWT)
* bcryptjs
* Yup
* Nodemon
* Sucrase

## Funcionalidades

### Usuários

* Cadastro de usuário
* Autenticação utilizando email e senha
* Hash de senha com bcrypt
* Geração de token JWT

### Tarefas

* Criar tarefas
* Listar tarefas do usuário autenticado
* Atualizar tarefas
* Excluir tarefas
* Marcar tarefas como concluídas
* Associação das tarefas ao usuário responsável

## Autenticação

As rotas protegidas utilizam autenticação através de JSON Web Token.

Após realizar login, a API retorna um token que deve ser enviado nas requisições através do header:

```http
Authorization: Bearer SEU_TOKEN
```

O middleware de autenticação valida o token e identifica o usuário responsável pela requisição.

## Estrutura do projeto

```text
src/
├── app/
│   ├── controllers/
│   ├── middlewares/
│   └── models/
├── config/
├── database/
│   └── migrations/
├── app.js
├── route.js
└── server.js
```

## Configuração do ambiente

Clone o repositório:

```bash
git clone https://github.com/Raphaelsl/TaskList.git
```

Entre na pasta do projeto:

```bash
cd TaskList
```

Instale as dependências:

```bash
yarn
```

ou:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=tasklist

APP_SECRET=seu_segredo_jwt
```

Ajuste os valores de acordo com sua configuração local do PostgreSQL.

## Banco de dados

Com o PostgreSQL configurado e o banco criado, execute as migrations:

```bash
yarn sequelize db:migrate
```

ou:

```bash
npx sequelize db:migrate
```

## Executando o projeto

Para iniciar o servidor em ambiente de desenvolvimento:

```bash
yarn dev
```

## Principais conceitos praticados

Durante o desenvolvimento deste projeto foram trabalhados conceitos como:

* construção de APIs REST;
* autenticação e autorização;
* utilização de JWT;
* hash e validação de senhas;
* middlewares no Express;
* ORM com Sequelize;
* migrations;
* relacionamento entre entidades;
* variáveis de ambiente;
* organização de projetos backend.

## Próximos passos

Algumas melhorias planejadas para o projeto:

* melhorar o tratamento de erros;
* adicionar testes automatizados;
* adicionar paginação e filtros de tarefas;
* melhorar as validações;
* adicionar documentação das rotas;
* realizar deploy da API.

## Autor

**Raphael**

GitHub: https://github.com/Raphaelsl

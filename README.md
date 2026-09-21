# 🎓 Bolsa Acadêmica

Sistema web desenvolvido para **simular um processo de solicitação, análise e consulta de bolsa acadêmica**.

O projeto começou como uma aplicação simples em **HTML, CSS e JavaScript**, utilizando armazenamento local do navegador. Durante o desenvolvimento, a aplicação foi evoluída para uma arquitetura com **Frontend + API REST + PostgreSQL**, permitindo centralizar os dados e separar as responsabilidades do sistema.

---

## 🎯 Intuito do sistema

O principal objetivo do projeto é representar, de forma prática, um sistema de seleção de estudantes para uma bolsa acadêmica a partir de informações socioeconômicas.

A aplicação permite que o estudante:

- Preencha um questionário;
- Informe seus dados pessoais e socioeconômicos;
- Envie uma solicitação de bolsa;
- Receba o resultado da análise;
- Consulte posteriormente sua situação utilizando o CPF.

Também existe uma área administrativa para que usuários autorizados possam consultar os participantes e visualizar os resultados da análise.

> **Observação:** o sistema é um projeto acadêmico e utiliza critérios definidos para fins de demonstração. Ele não representa um processo oficial de concessão de bolsas.

---

## 🧩 Arquitetura do sistema

Atualmente, o projeto utiliza uma arquitetura dividida em três partes principais:

```text
┌─────────────────────┐
│      Frontend       │
│  HTML + CSS + JS    │
└──────────┬──────────┘
           │ HTTP / JSON
           ↓
┌─────────────────────┐
│       API REST      │
│   Node.js + Express │
└──────────┬──────────┘
           │ SQL
           ↓
┌─────────────────────┐
│     PostgreSQL      │
│    Banco de dados   │
└─────────────────────┘

backend/
├── src/
│   ├── controllers/
│   │   ├── participantes.controller.js
│   │   └── administradores.controller.js
│   │
│   ├── database/
│   │   └── connection.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── participantes.routes.js
│   │   └── administradores.routes.js
│   │
│   ├── services/
│   │   └── bolsa.service.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### 🛠️ Tecnologias utilizadas

## Frontend
```text
HTML5 — estrutura das páginas e formulários.
CSS3 — estilização e layout.
JavaScript — interações, validações, eventos e comunicação com a API.
Fetch API — comunicação HTTP entre frontend e backend.
LocalStorage — utilizado atualmente para manter o token de autenticação no navegador.
```
## Backend
```text
Node.js — ambiente de execução JavaScript no servidor.
Express.js — criação da API REST.
CORS — permite a comunicação entre frontend e API.
dotenv — gerenciamento de variáveis de ambiente.
pg — conexão do Node.js com PostgreSQL.
bcrypt — hash e comparação de senhas.
jsonwebtoken (JWT) — autenticação dos administradores.
Banco de dados
PostgreSQL
```

## 🔗 Principais endpoints da API
### Participantes
Método	Endpoint	Acesso	Função
```text
POST /api/participantes Público	Cadastrar participante
GET	/api/participantes	🔐 JWT	Listar participantes
GET	/api/participantes/:cpf	Público	Buscar participante por CPF
```

### Administradores
Método	Endpoint	Acesso	Função
```text
POST	/api/administradores	Público durante o desenvolvimento	Cadastrar administrador
POST	/api/administradores/login	Público	Realizar login
GET	/api/administradores/perfil	🔐 JWT	Verificar o administrador autenticado
```

## Responsabilidade de cada parte

### controllers
- Contém a lógica responsável por receber as requisições
- validar dados
- acessar os serviços/banco
- devolver as respostas da API.

### database
- Responsável pela conexão entre a aplicação Node.js e o PostgreSQL.

### middleware
- Contém funções executadas antes de determinadas rotas.
- Atualmente existe o middleware de autenticação por JWT.

### routes
- Define os endpoints da API
- conecta cada rota ao seu controller.

### services
Contém regras de negócio-
O serviço de bolsa é responsável pelo cálculo da pontuação e definição do status da solicitação.

### server.js
- Inicializa o Express
- configura CORS e JSON
- registra as rotas da aplicação.

## 👨‍🎓 Área do estudante

### O estudante preenche:

Nome;
CPF;
Renda;
Estrutura familiar;
Contato com o pai;
Histórico em escola particular;
Raça.

Depois do envio, o frontend envia os dados para:

```text
POST /api/participantes
```
A API valida os dados, calcula a pontuação e grava o participante no PostgreSQL.

O resultado retornado pela API informa:

Nome;
Pontuação;
Status da bolsa.

A API valida os dados, calcula a pontuação e grava o participante no PostgreSQL.

## O resultado retornado pela API informa:

Nome;
Pontuação;
Status da bolsa.
Consulta por CPF

O estudante também pode consultar sua situação através do CPF:

```text
GET /api/participantes/:cpf
```
A API procura o participante no PostgreSQL e retorna seus dados.

## 🔐 Área administrativa

A área administrativa possui autenticação.

### O administrador pode:

- Cadastrar um usuário administrador;
- Realizar login;
- Receber um token JWT;
- Acessar a lista de participantes;
- Visualizar aprovados;
- Visualizar reprovados;
- Consultar a pontuação;
- Sair da área administrativa.
- Login

O login é realizado através de:

```text
POST /api/administradores/login
```

Após a autenticação, a API gera um JWT com validade definida no backend.

O frontend armazena o token no localStorage do navegador para utilizá-lo nas requisições protegidas.

Rota protegida

A listagem dos participantes exige autenticação:

```text
GET /api/participantes/
```

### A requisição deve enviar:

Authorization: Bearer TOKEN

O middleware auth.middleware.js verifica o token antes de permitir o acesso.

## 🧮 Sistema de pontuação

A pontuação é calculada com base nas respostas do questionário socioeconômico.

Os critérios atualmente utilizados são:

### Critério	Pontos
- Renda dentro do limite definido	+3
- Pais não moram juntos	+3
- Não possui contato com o pai	+3
- Não estudou em escola particular	+3
- Raça preta ou indígena	+3

Atualmente, uma pontuação de 7 pontos ou mais resulta no status:
```text
aprovado
```

Pontuações abaixo desse valor resultam em:
```text
reprovado
```
Esses critérios são utilizados apenas como regra de demonstração do projeto.

## 🗄️ Banco de dados

O sistema utiliza PostgreSQL para armazenar os dados.

### Tabela participantes

Entre os principais campos estão:

```text
id
nome
cpf
renda
pais_juntos
contato_pai
estudou_escola_particular
raca
pontuacao
status_bolsa
criado_em
```

O CPF possui restrição de unicidade, evitando o cadastro duplicado do mesmo CPF.

### Tabela administradores

A tabela possui:
```text
id
login
senha_hash
criado_em
```

As senhas não são armazenadas em texto puro. O backend utiliza bcrypt para gerar o hash da senha.

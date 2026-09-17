# 🎓 Bolsa Acadêmica

Sistema web desenvolvido para simular um processo de solicitação e análise de bolsa acadêmica.

A aplicação permite que estudantes preencham um questionário socioeconômico e recebam uma pontuação de acordo com suas respostas. A partir dessa pontuação, o sistema informa se o estudante foi aprovado ou não para a bolsa.

Também existe uma área administrativa onde é possível visualizar os participantes aprovados e reprovados.

## 📌 Sobre o projeto

Desenvolvimento web utilizando **HTML, CSS e JavaScript**.

A ideia principal é criar uma pequena plataforma capaz de:

- Cadastrar estudantes;
- Coletar informações socioeconômicas;
- Calcular uma pontuação para solicitação da bolsa;
- Informar o resultado do estudante;
- Consultar informações utilizando CPF;
- Possibilitar acesso à área administrativa;
- Separar participantes aprovados e reprovados;
- Armazenar os dados no navegador utilizando `localStorage`.

  ## 🚀 Funcionalidades

### 👨‍🎓 Área do estudante

O estudante pode informar:

- Nome;
- CPF;
- Renda mensal;
- Estrutura familiar;
- Contato com o pai;
- Histórico em escola particular;
- Raça.

Após o preenchimento, o sistema calcula uma pontuação com base nas respostas.

A pontuação é utilizada para determinar o resultado da solicitação.

Também é possível consultar posteriormente as informações cadastradas utilizando o CPF.

---

### 🔐 Área administrativa

A aplicação possui uma área destinada ao administrador.

Nela é possível:

- Cadastrar um usuário administrador;
- Realizar login;
- Acessar a lista de participantes;
- Visualizar estudantes aprovados;
- Visualizar estudantes reprovados;
- Consultar a pontuação de cada participante;
- Retornar para a página inicial.

A autenticação e os dados administrativos são armazenados no `localStorage`.

## 🧮 Sistema de pontuação

O sistema utiliza critérios definidos no questionário para gerar a pontuação do estudante.

Exemplos de critérios:

- Renda familiar dentro do limite definido;
- Pais não morarem juntos;
- Falta de contato com o pai;
- Não ter estudado em escola particular;
- Determinadas opções de raça.

Cada critério atendido adiciona pontos à solicitação.

Atualmente, estudantes com **7 pontos ou mais** são considerados aprovados pelo sistema.

---

## 🛠️ Tecnologias utilizadas

### HTML5

Utilizado para construir a estrutura das páginas, formulários, campos de entrada, botões e demais elementos da aplicação.

### CSS3

Utilizado para estilização das páginas, organização dos elementos, formulários, botões e layout da aplicação.

### JavaScript

Responsável pela lógica da aplicação, incluindo:

- Manipulação do DOM;
- Eventos;
- Validação de formulários;
- Arrays e objetos;
- Funções;
- `filter()`;
- `find()`;
- `forEach()`;
- Condicionais;
- Armazenamento de dados;
- Navegação entre páginas.

### LocalStorage

Utilizado como armazenamento local no navegador.

Os principais dados armazenados são:

```text
participantes
adms

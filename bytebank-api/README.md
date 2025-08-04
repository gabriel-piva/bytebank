# Bytebank API

Esta pasta contém a API do Bytebank, desenvolvida com Express e JSON Server para simular um backend completo. Essa API serve de base para o front-end do Bytebank e permite realizar operações bancárias como login, listagem de contas e transações financeiras.

---

## 🚀 Status do Projeto

<h4 align="center">
  🚧 Em construção 🚧
</h4>

---

## 🛠️ Tecnologias Principais

As tecnologias utilizadas no desenvolvimento deste back-end são:

<br />

| Categoria                      | Tecnologias                                                                                                                                                                                                                                                              |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Back-End**                   | [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) |
| **Banco de Dados (Simulação)** | [![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json-server&logoColor=white)](https://github.com/typicode/json-server)                                                                                                          |

---

## ✔️ Endpoints

-   `POST /login`:
    Recebe email e senha e retorna um objeto com o usuário e um token (fake).

-   `GET /accounts/user/:id`:
    Recebe o id do usuário e retorna a conta bancária dele.

-   `POST /transactions`:
    Recebe as informaçõe necessárias para cadastrar uma transação (como valor, id da conta, categoria, possível arquivo, ect.), cadastra a transação no json-server e atualiza o balanço da conta.

-   `PUT /transactions/:id`:
    Recebe as o id da transação e as informações necessárias para atualizar uma transação (como novo valor, nova categoria, possível arquivo, ect.), atualiza a transação no json-server e atualiza o balanço da conta.

-   `GET /transactions/accounts/:id`:
    Recebe o id da conta do bancária do usuário e retorna as transações presentes naquela conta + dados da paginação. Também é possível passar parâmetros com filtros, paginação e ordenação, que são: A página atual, tamanho da página, ordem desejada, categoria desejada, valor máximo e valor mínimo (page, pageSize, order , category, maxAmount, minAmount).

---

## ⚙️ Como Rodar Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

### Pré-requisitos

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)
-   [Json Server](https://www.npmjs.com/package/json-server)

### Passos

1.  **Clone o repositório e acesse a pasta do back-end:**

    ```sh
    git clone https://github.com/gabriel-piva/bytebank.git
    cd bytebank
    cd bytebank-api
    ```

2.  **Instale as dependências:**

    ```sh
    npm install
    ```

3.  **Inicie a aplicação:**

    ```sh
    npm run dev
    ```

    O api estará disponível em `http://localhost:3003`.

---

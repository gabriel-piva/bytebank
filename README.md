# Bytebank

Este é o repositório do **Bytebank**, um projeto de aplicativo bancário digital desenvolvido durante a pós-graduação em Front-End Engineering da FIAP. O objetivo é demonstrar na prática os conceitos de design system, arquitetura de front-end, responsividade e integração com APIs.

---

## 🚀 Status do Projeto

<h4 align="center">
  🚧 Em construção 🚧
</h4>

---

## 💡 Sobre o Projeto

O **Bytebank** é uma aplicação front-end que simula um sistema bancário simples, permitindo o registro e gerenciamento de transações financeiras. Ele foi construído com foco em boas práticas de desenvolvimento, responsividade e fluidez de navegação.

O projeto inclui um **design system intuitivo e charmoso**, além da integração com um back-end que utiliza Docker.

---

## ✅ Funcionalidades

-   **Responsividade completa**: a aplicação se adapta perfeitamente a dispositivos desktop, tablet e mobile.
-   **Validação avançada**: Implementação de validação de entrada na dashboard com e-mail e senha.
-   **Gerenciamento de transações**: adicione, visualize, edite e remova transações financeiras.
-   **Filtro e Pesquisa**: implementação de filtros avançados e funcionalidade de busca para facilitar a navegação nas transações.
-   **Anexos**: Permite o upload de recibos ou documentos referentes a transações.
-   **Scroll Infinito**: adição de scroll infinito para otimizar o carregamento de grandes volumes de dados.
-   **Gráficos**: inclusão de gráficos e análises financeiras para oferecer uma visão detalhada do desempenho financeiro.
-   **Saldo em tempo real**: o saldo da conta é atualizado automaticamente por meio de triggers no banco de dados e possui respostas programadas para incongruências de saldo ao realizar transferências.
-   **Microfrontend**: Divisão da aplicação em microfrontends independentes.

---

## 🛠️ Tecnologias Principais

As principais tecnologias utilizadas no desenvolvimento deste projeto são:

<br />

| Categoria          | Tecnologias                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Front-End**      | [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/) |
| **Back-End**       | [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)                                                                                                                     |
| **Banco de Dados** | [![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json-server&logoColor=white)](https://github.com/typicode/json-server)                                                                                                                                                                                                                              |
| **Containers**     | [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)                                                                                                                                                                                                                                                             |

---

## 💻 Layouts

Aqui estão algumas capturas de tela da aplicação em diferentes tamanhos de tela.

### Desktop

<p align="center">
  <img src="https://github.com/user-attachments/assets/ab762a8e-0524-4d3c-a265-d689b808d4c6" alt="Layout Desktop" width="800">
</p>

### Tablet

<p align="center">
  <img src="https://github.com/user-attachments/assets/894a9fc8-289a-4e4a-b5d9-55713eab392f" alt="Layout Tablet" width="600">
</p>

### Mobile

<p align="center">
  <img src="https://github.com/user-attachments/assets/92266287-30df-41a2-9599-d170eb315c23" alt="Layout Mobile" width="300">
</p>

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   [Node.js](https://nodejs.org/)
-   [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
-   [npm](https://www.npmjs.com/)

### Passos

1.  **Clone o repositório**: Primeiro, clone o repositório do projeto.

    ```sh
    git clone https://github.com/gabriel-piva/bytebank.git
    cd bytebank-api
    ```

2.  **Inicie o back-end**: A partir da pasta do repositório da **API**, use o Docker Compose.

    ```sh
    cd bytebank-api
    docker-compose up --build
    ```

    A API estará disponível em `http://localhost:3003`.

3.  **Instale as dependências e inicie o front-end**: Na pasta do seu repositório (**banking-ui**), execute os comandos abaixo.
    ```sh
    npm install
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:3000`.

> **⚠️ Observação:** Se você fizer alterações nos arquivos do Docker, lembre-se de derrubar e recriar os containers.
>
> ```sh
> docker-compose down -v
> docker-compose up --build
> ```

---

## 💙 Agradecimentos

Este projeto foi desenvolvido com dedicação para fins educacionais. Sinta-se à vontade para explorar, adaptar e aprender com ele!

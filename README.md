# 🏦 Bytebank

Este é o repositório do **Bytebank**, um projeto de aplicativo bancário digital desenvolvido durante a pós-graduação em Front-End Engineering da FIAP. O objetivo é demonstrar na prática os conceitos de design system, arquitetura de front-end, responsividade e integração com APIs.

---

## 💡 Sobre o Projeto

O **Bytebank** é uma aplicação front-end que simula um sistema bancário simples, permitindo o registro e gerenciamento de transações financeiras. Ele foi construído com foco em boas práticas de desenvolvimento, responsividade e fluidez de navegação.

Para acessar mais detalhes do front-end e do back-end do **Bytebank**, acesse as pastas **bytebank-ui** e **bytebank-api**, e veja os arquivos README.md específicos de cada parte do projeto.

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
-   [npm](https://www.npmjs.com/)

### Passos

1.  **Clone o repositório**: Primeiro, clone o repositório do projeto.

    ```sh
    git clone https://github.com/gabriel-piva/bytebank.git
    ```

2.  **Instale as dependências e inicie o back-end**: Acesse a pasta do back-end no repositório (**bytebank-api**) e execute os comandos de instalação e execução.

    ```sh
    cd bytebank-api
    npm install
    npm run dev
    ```

    A API estará disponível em `http://localhost:3003`.

3.  **Configure variáveis de ambiente do front-end:**: Acesse a pasta do front-end no repositório (**bytebank-ui**),

    ```env
    cd bytebank-ui
    ```

    Na raiz da pasta do front-end, crie o arquivo `.env.local` com o conteúdo:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3003
    TRANSFERS_DOMAIN=http://localhost:4201
    ```

4.  **Instale as dependências e inicie o front-end**: Continuando na pasta (**bytebank-ui**), execute os comandos de instalação e execução.

    ```sh
    npm install
    npm run dev
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

5.  **Instale as dependências e inicie o microfrontend**: Acesse a pasta do microfrontend no repositório (**bytebank-ui/microfrontends/transfers-mf**) e execute os comandos de instalação e execução.

    ```sh
    cd bytebank-ui/microfrontends/transfers-mf
    npm install
    npm start
    ```

    O microfrontend estará disponível em `http://localhost:4201`, e via proxy `http://localhost:3000/transfers`.

    \*Mais detalhes no README.md presente na pasta do front-end.

---

## 📦 Como Rodar com o Docker

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

1.  **Clone o repositório**: Primeiro, clone o repositório do projeto.

    ```sh
    git clone https://github.com/gabriel-piva/bytebank.git
    ```

2.  **Rode o projeto usando o Docker**: Na pasta do repositório (**bytebank**), execute o comando abaixo.

    ```sh
    docker compose up --build -d
    ```

    A API estará disponível em `http://localhost:3003`, o microfrontend em `http://localhost:4201` e o aplicativo estará disponível em `http://localhost:3000`.

> **⚠️ Observação:** Se você fizer alterações nos arquivos do Docker, lembre-se de derrubar e recriar os containers.
>
> ```sh
> docker-compose down -v
> docker-compose up --build
> ```
### ⚙️ Como rodar em produção

Para que o seu projeto funcione corretamente, é crucial que o **backend esteja em execução**.

Você pode optar por uma das seguintes abordagens:

1.  **Rodar o backend localmente:** Certifique-se de que a API do backend está ativa na sua máquina.
2.  **Usar o Docker:** Se você estiver utilizando Docker, garanta que o contêiner do backend esteja em execução.

Após confirmar que o backend está ativo, você poderá acessar a aplicação através da API em produção no seguinte link:
 ```sh
https://bytebank-production.up.railway.app/institucional
 ```
## 📱 Acesso ao Aplicativo

Após realizar a execução da aplicação localmente ou via docker, basta acessar a rota `http://localhost:3000/institucional` para ver a página inicial da aplicação, e seguir para a página de login (`http://localhost:3000/login`). Para realizar o login, basta utilizar o email *maria.eduard@bytebank.com*, com a senha _12345_, e seguir para testar as funcionalidades da aplicação!

---

## 💙 Agradecimentos

Este projeto foi desenvolvido com dedicação para fins educacionais na pós-graduação em Front-End Engineering da FIAP.

Sinta-se à vontade para explorar, aprender e contribuir! 🚀

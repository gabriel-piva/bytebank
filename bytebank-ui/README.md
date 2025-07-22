# Banking APP

<p>Esta é a aplicação desenvolvida na pós-graduação em Front-End Enginnering da FIAP! :rocket:
Nela aprendemos e aplicamos conhecimentos de front-end utilizando Next.js e React.js.

## :white_check_mark: Status do projeto

<h4 align="center"> 
	🚧  Bytebank 🚀 Em construção...  🚧
</h4>

## :grey_exclamation: Sobre o Projeto

Este projeto foi criado para ajudar nos estudos de front-end, simulando um sistema bancário digital simples. Com ele, você pode registrar transações e organizar suas finanças por categorias, tudo seguindo uma ideia de design system intuitivo e charmoso. O objetivo é mostrar, na prática, o design system adotado, como funciona as boas práticas, a responsividade e fluidez do front-end, juntamente da integração com banco de dados, o uso do Docker e a documentação de APIs.

Além disso, este front-end pode ser integrado a um Back-end disponível no repositório Bytebank. A proposta é ser um ambiente de aprendizado para quem quer entender como definir um guia de estilo, responsidade e simplicidade de design, e construir e organizar uma API para aplicações financeiras de forma clara e didática.

## :white_check_mark: Funcionalidades:

- [x] Responsividade de tela, se adaptando a desktop, tablet e mobile
- [x] Registro, consulta, alteração e remoção de transações financeiras
- [x] Atualização automática de saldo via triggers no banco de dados
- [x] Documentação interativa via Swagger

---

#### Ainda em desenvolvimento:

- [ ] Cadastro e autenticação de usuários
- [ ] Gerenciamento de contas bancárias
- [ ] Controle de categorias de transações (entrada/saída)
---

## :computer: WEB Layout

![localhost_3000 - Brave 2025-06-01 20-08-20](https://github.com/user-attachments/assets/ab762a8e-0524-4d3c-a265-d689b808d4c6)

---

## 📱 TABLET Layout

![localhost_3000 - Brave 2025-06-01 20-18-37](https://github.com/user-attachments/assets/894a9fc8-289a-4e4a-b5d9-55713eab392f)

---

## :iphone: MOBILE Layout

![localhost_3000 - Brave 2025-06-01 20-21-13](https://github.com/user-attachments/assets/92266287-30df-41a2-9599-d170eb315c23)

---

## 🛠 Tecnologias

As tecnologias principais utilizadas durante o desenvolvimento deste projeto são:

- [Next.js](https://nextjs.org/)
- [React.js](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [CORS](https://www.npmjs.com/package/cors)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Swagger (OpenAPI)(https://swagger.io/)](https://swagger.io/)

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/)
- [API](https://github.com/dbento-dev/banking-api)

### Passos

1. **Clone o repositório:**

   É necessário fazer um git clone do repositório do Back-End que abriga a API, o link se encontra nos pré-requisitos (clicar em API)

   ```sh
   git clone <url-do-repo>
   cd banking-api
   ```

   ```sh
   git clone <url-do-repo>
   cd banking-app
   ```

3. **Suba o banco de dados e a API com Docker Compose:**

   ```sh
   docker-compose up --build
   ```

   A API estará disponível em: [http://localhost:4000](http://localhost:4000)

4. **Acesse a documentação Swagger:**
   Ela fornece uma interface interativa para testar os endpoints da API.

   [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

5. **(Opcional) Rodar localmente sem Docker:**
   - Configure as variáveis de ambiente do banco de dados
   - Instale as dependências:

     ```sh
     npm install
     ```

   - Inicie a aplicação:

     ```sh
     npm run dev
     ```

> **Atenção:**
> Sempre que fizer alterações na estrutura do banco de dados, scripts de inicialização ou variáveis de ambiente, é necessário **derrubar os containers Docker e recriá-los** para garantir que as mudanças sejam aplicadas corretamente.
> Para isso, utilize:
>
> ```sh
> docker-compose down -v
> docker-compose up --build
> ```

## Estrutura do Projeto

```.
📦src
 ┣ 📂api
 ┃ ┣ 📜accountService.ts
 ┃ ┣ 📜client.ts
 ┃ ┣ 📜transactionService.ts
 ┃ ┗ 📜userService.ts
 ┣ 📂app
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📂components
 ┃ ┃ ┃ ┣ 📂BalanceCard
 ┃ ┃ ┃ ┃ ┗ 📜BalanceCard.tsx
 ┃ ┃ ┃ ┣ 📂DashboardHeader
 ┃ ┃ ┃ ┃ ┗ 📜DashboardHeader.tsx
 ┃ ┃ ┃ ┣ 📂DeleteModal
 ┃ ┃ ┃ ┃ ┗ 📜DeleteModal.tsx
 ┃ ┃ ┃ ┣ 📂ExtractContent
 ┃ ┃ ┃ ┃ ┗ 📜ExtractContent.tsx
 ┃ ┃ ┃ ┣ 📂SideBar
 ┃ ┃ ┃ ┃ ┣ 📜SideBar.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SideBarItem.tsx
 ┃ ┃ ┃ ┣ 📂TransactionForm
 ┃ ┃ ┃ ┃ ┗ 📜TransactionForm.tsx
 ┃ ┃ ┃ ┣ 📂TransactionItem
 ┃ ┃ ┃ ┃ ┗ 📜TransactionItem.tsx
 ┃ ┃ ┃ ┗ 📂TransactionList
 ┃ ┃ ┃ ┃ ┗ 📜TransactionList.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜icon-arrow-negative.svg
 ┃ ┃ ┣ 📜icon-arrow-positive.svg
 ┃ ┃ ┣ 📜icon-avatar.svg
 ┃ ┃ ┣ 📜icon-creditcard.svg
 ┃ ┃ ┣ 📜icon-delete.svg
 ┃ ┃ ┣ 📜icon-edit.svg
 ┃ ┃ ┣ 📜icon-eye.svg
 ┃ ┃ ┣ 📜icon-flagcard.png
 ┃ ┃ ┣ 📜icon-home.svg
 ┃ ┃ ┣ 📜icon-investments.svg
 ┃ ┃ ┣ 📜icon-services.svg
 ┃ ┃ ┗ 📜icon-transfer.svg
 ┃ ┣ 📜fav.svg
 ┃ ┣ 📜logo.svg
 ┃ ┗ 📜logotipo.png
 ┣ 📂components
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┣ 📜loader.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┗ 📜under-construction.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAccountData.ts
 ┃ ┣ 📜useCreateTransaction.ts
 ┃ ┣ 📜useDeleteTransaction.ts
 ┃ ┣ 📜useEditTransaction.ts
 ┃ ┣ 📜useTransactionCategoriesData.ts
 ┃ ┣ 📜useTransactionsData.ts
 ┃ ┗ 📜useUserData.ts
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┣ 📂types
 ┃ ┣ 📜accountEntities.ts
 ┃ ┣ 📜transactionEntities.ts
 ┃ ┗ 📜userEntities.ts
 ┗ 📂utils
 ┃ ┣ 📂currency
 ┃ ┃ ┗ 📜formatCurrency.ts
 ┃ ┣ 📂date
 ┃ ┃ ┗ 📜formatDisplayDate.ts
 ┃ ┗ 📂string
 ┃ ┃ ┗ 📜maskCardNumber.ts
```

## Observações

- O saldo das contas é atualizado automaticamente via triggers no banco de dados.
- As senhas dos usuários são armazenadas em texto puro apenas para fins de demonstração. **Nunca faça isso em produção!**

---

Feito com 💙 para fins educacionais.

# Book Management App

Book Management App é uma aplicação de gerenciamento de livros desenvolvida em React com Typescript e estilizada com TailwindCSS. O sistema possui controle de acesso para diferentes tipos de usuários (usuário comum e administrador), permitindo que administradores gerenciem usuários e livros.

## 🚀 Funcionalidades

- **Autenticação de Usuário**:

  - Tela de login com validações para e-mail e senha.
  - Armazenamento da sessão no local storage.

- **Controle de Acesso**:

  - Usuário inicial (Administrador): Criado manualmente, com permissões para promover ou rebaixar outros usuários.
  - Usuários comuns podem se registrar, visualizar e acessar a lista e os detalhes dos livros.

- **Rotas protegidas**

  - Apenas usuários logados tem acesso a página de livros

- **Gerenciamento de Usuários (Apenas Administradores)**:

  - Controle sobre permissões dos usuários.
  - Promover ou rebaixar usuários comuns para administradores e vice-versa.
  - Apenas administradores podem modificar e visualizar usuários cadastrados.

- **CRUD de Livros**:
  - **Listagem de Livros**: Todos os usuários podem ver uma lista de livros com informações básicas.
  - **Adicionar Livros**: Apenas administradores podem adicionar novos livros.
  - **Editar e Remover Livros**: Apenas administradores podem modificar ou excluir livros existentes.
  - **Visualizar Detalhes do Livro**: Disponível para todos os usuários.

## 🛠️ Tecnologias Utilizadas

- **React com Typescript**: Interface de usuário e lógica principal do aplicativo.
- **TailwindCSS**: Estilização com design responsivo.
- **React Query**: Gerenciamento de estado para consultas de dados e sincronização com a API.
- **JSON Server**: Simulação de API REST para armazenamento e gerenciamento de dados em `db.json`.
- **formik yup**: Controle de formulários.

## 🎨 Estilização e UX

A aplicação é estilizada com **TailwindCSS** para garantir um design moderno e responsivo, proporcionando uma experiência agradável e intuitiva.

## 📦 Como Executar o Projeto

### Passos para configuração e execução:

1. **Clone o repositório**:

2. **Roda o Json-server na porta 3000:**

```bash
npx json-server --watch db.json --port 3000
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

4. **Usuário Administrador padrão:**

```json
  "email": "admin@admin.com",
  "password": "admin123"
```

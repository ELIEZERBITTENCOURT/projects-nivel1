# Blog de Posts

Este é um aplicativo de blog simples onde os usuários podem criar, editar, curtir e excluir posts, bem como adicionar, curtir e excluir comentários.

## Backend

### Configuração do Backend

1. **Clone o repositório**

   ```shell
   git clone <https://github.com/ELIEZERBITTENCOURT/projects-nivel1.git>
   ```

2. **Instale as dependências**

   ```shell
   cd backend
   npm install
   ```

3. **Configuração do Banco de Dados**

   Configure seu banco de dados no arquivo `config.js`. Você pode usar MongoDB, MySQL, PostgreSQL ou qualquer outro banco de dados de sua preferência. Certifique-se de fornecer as informações de conexão corretas.

4. **Inicie o servidor**

    ```shell
        node ./server.js
    ```

   O servidor será iniciado na porta `3000` por padrão. Você pode alterar a porta no arquivo `config.js` se desejar.

### Rotas da API

- **GET /posts**: Obtém todos os posts.
- **GET /posts/:id**: Obtém um post específico pelo ID.
- **POST /posts**: Cria um novo post.
  - Corpo da requisição: `{ "title": "Título do Post", "content": "Conteúdo do Post" }`
- **PUT /posts/:id**: Atualiza um post existente pelo ID.
  - Corpo da requisição: `{ "title": "Novo Título", "content": "Novo Conteúdo" }`
- **DELETE /posts/:id**: Exclui um post pelo ID.
- **PUT /posts/:id/like**: Incrementa o contador de curtidas de um post pelo ID.
- **POST /posts/:id/comments**: Adiciona um novo comentário a um post pelo ID.
  - Corpo da requisição: `{ "text": "Conteúdo do Comentário" }`
- **PUT /posts/:postId/comments/:commentId/like**: Incrementa o contador de curtidas de um comentário em um post pelo ID do post e ID do comentário.
- **DELETE /posts/:postId/comments/:commentId**: Exclui um comentário de um post pelo ID do post e ID do comentário.

## Frontend

### Configuração do Frontend

1. **Inicie o servidor de desenvolvimento**
   O aplicativo será iniciado e estará acessível em `http://localhost:3000`.

### Mudanças no Frontend

- **Criação de Posts**: Os usuários podem criar novos posts fornecendo um título e conteúdo. Os posts criados são exibidos na página principal.
- **Edição de Posts**: Os usuários podem editar posts existentes clicando no botão "Editar" em um post específico. Eles podem modificar o título e o conteúdo e salvar as alterações.
- **Exclusão de Posts**: Os usuários podem excluir posts existentes clicando no botão "Excluir" em um post específico.
- **Curtir Posts**: Os usuários podem curtir posts clicando no botão "Curtir". O número de curtidas é exibido ao lado do botão.
- **Adição de Comentários**: Os usuários podem adicionar comentários a um post específico fornecendo o conteúdo do comentário e clicando no botão "Comentar".
- **Edição de Comentários**: Os usuários podem editar comentários existentes clicando no botão "Editar" em um comentário específico. Eles podem modificar o conteúdo do comentário e salvar as alterações.
- **Exclusão de Comentários**: Os usuários podem excluir comentários existentes clicando no botão "Excluir" em um comentário específico.
- **Curtir Comentários**: Os usuários podem curtir comentários clicando no botão "Curtir" em um comentário específico. O número de curtidas é exibido ao lado do botão.

**Nota**: Certifique-se de ter o backend em execução enquanto estiver usando o aplicativo frontend. Você pode verificar a seção **Configuração do Backend** acima para obter informações sobre como iniciar o servidor backend.

Este projeto é uma ótima base para construir aplicativos de blog mais complexos com funcionalidades adicionais, como autenticação de usuários, categorias de postagem, tags e muito mais. Sinta-se à vontade para personalizá-lo e expandi-lo conforme suas necessidades!

## Autor

Este projeto foi desenvolvido por Eliezer Bittencourt.

Sinta-se à vontade para personalizar e expandir este README conforme necessário para se adequar ao seu projeto. Bom desenvolvimento!

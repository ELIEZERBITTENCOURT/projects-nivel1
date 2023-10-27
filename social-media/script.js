//Variável para controlar o tema
let isDarkTheme = false;

// Função para alternar entre os temas claro e escuro
function alternarTema() {
    const body = document.body;
    isDarkTheme = !isDarkTheme;
    body.classList.toggle('dark-theme', isDarkTheme);
}

// Array para armazenar os posts
let posts = [];

// Função para criar um novo post
function criarPost() {
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;

    // Verifica se ambos os campos foram preenchidos
    if (title && content) {
        let post = {
            title: title,
            content: content,
            likes: 0,
            comments: []
        };

        // Adiciona o post ao array de posts
        posts.unshift(post);

        // Limpa os campos do formulário
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";

        // Atualiza a lista de posts
        exibirPosts();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para exibir os posts na página
function exibirPosts() {
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(function (post, index) {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>
        <div id="editFormTemplate_${index}" style="display: none;">
        <h3>Editar Post</h3>
        <input type="text" id="editTitle_${index}">
        <textarea id="editContent_${index}"></textarea>
        <button id="saveEditButton_${index}">Salvar</button>
        </div>
        <div class="button-container">
        <button onclick="curtirPost(${index})">Curtir (${post.likes})</button>
        <button onclick="editarPost(${index})">Editar</button>
        <button onclick="excluirPost(${index})">Excluir</button>
        </div>
        <div id="comments${index}"></div>
        <p class="show-comments-link" id="showComments${index}">Ver todos os ${post.comments.length} comentários</p>
        <div class="hidden-comments" id="hiddenComments${index}"></div>
        <input type="text" id="commentInput${index}" placeholder="Adicione um comentário">
        <div class="button-container">
        <button onclick="adicionarComentario(${index})">Comentar</button></div>`;
        postsContainer.appendChild(postDiv);

        // Exibe os comentários
        let commentsContainer = document.getElementById(`comments${index}`);
        let hiddenCommentsContainer = document.getElementById(`hiddenComments${index}`);
        let showCommentsLink = document.getElementById(`showComments${index}`);

        commentsContainer.innerHTML = "";
        hiddenCommentsContainer.innerHTML = "";

        // Adiciona no máximo 2 comentários ao contêiner
        for (let i = 0; i < Math.min(2, post.comments.length); i++) {
            let commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            commentDiv.innerHTML = `
            <p>${post.comments[i].text}</p>
                <div class="button-container">
                    <button onclick="curtirComentario(${index}, ${i})">Curtir (${post.comments[i].likes})</button>
                    <button onclick="excluirComentario(${index}, ${i})">Excluir</button>
                </div>
                
            `;
            commentsContainer.appendChild(commentDiv);
        }

        // Se houver mais de 2 comentários, exiba o link "Ver todos os comentários"
        if (post.comments.length > 2) {
            showCommentsLink.style.display = "block"; // Exibe o link
            // Adiciona um evento de clique ao link para mostrar os comentários ocultos
            showCommentsLink.addEventListener('click', function () {
                // Adiciona os comentários ocultos ao contêiner
                for (let i = 2; i < post.comments.length; i++) {
                    let commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    commentDiv.innerHTML = `
                    <p>${post.comments[i].text}</p>
                        <div class="button-container">
                            <button onclick="curtirComentario(${index}, ${i})">Curtir (${post.comments[i].likes})</button>
                            <button onclick="excluirComentario(${index}, ${i})">Excluir</button>
                        </div>
                        
                    `;
                    hiddenCommentsContainer.appendChild(commentDiv);
                }
                // Exibe o contêiner de comentários ocultos
                hiddenCommentsContainer.style.display = "block";
                // Esconde o link "Ver todos os comentários" após mostrar todos os comentários
                showCommentsLink.style.display = "none";
            });
        } else {
            // Se houver 2 ou menos comentários, esconda o link
            showCommentsLink.style.display = "none";
        }
    });
}

// Função para editar um post
function editarPost(index) {
    const editFormTemplate = document.getElementById(`editFormTemplate_${index}`);
    const editTitleInput = document.getElementById(`editTitle_${index}`);
    const editContentInput = document.getElementById(`editContent_${index}`);
    const saveEditButton = document.getElementById(`saveEditButton_${index}`);

    // Preenche o formulário com os dados do post atual
    editTitleInput.value = posts[index].title;
    editContentInput.value = posts[index].content;

    // Adiciona um evento de clique ao botão "Salvar" para salvar as edições
    saveEditButton.onclick = function () {
        // Atualiza o título e o conteúdo do post no array de posts
        posts[index].title = editTitleInput.value;
        posts[index].content = editContentInput.value;

        // Atualiza a exibição dos posts
        exibirPosts();

        // Esconde o formulário de edição
        editFormTemplate.style.display = "none";
    };

    // Exibe o formulário de edição
    editFormTemplate.style.display = "block";
}

// Função para curtir um comentário em um post
function curtirComentario(postIndex, commentIndex) {
    posts[postIndex].comments[commentIndex].likes++;
    exibirPosts();
}

// Função para excluir um comentário de um post
function excluirComentario(postIndex, commentIndex) {
    posts[postIndex].comments.splice(commentIndex, 1);
    exibirPosts();
}

// Função para curtir um post
function curtirPost(index) {
    posts[index].likes++;
    exibirPosts();
}



// Função para excluir um post
function excluirPost(index) {
    // Remove o post no índice fornecido do array de posts
    posts.splice(index, 1);

    // Atualiza a exibição dos posts
    exibirPosts();
}

// Função para adicionar um comentário a um post
function adicionarComentario(index) {
    let commentInput = document.getElementById(`commentInput${index}`);
    let commentText = commentInput.value;

    if (commentText) {
        let newComment = {
            text: commentText,
            likes: 0
        };
        posts[index].comments.push(newComment);
        commentInput.value = "";
        exibirPosts();
    } else {
        alert("Por favor, digite um comentário.");
    }
}

// Adiciona um event listener ao botão de alternar tema
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', alternarTema);

// Chama a função exibirPosts() para exibir os posts inicialmente
exibirPosts();
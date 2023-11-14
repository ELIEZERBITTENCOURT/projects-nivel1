const BASE_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    const userGreeting = document.getElementById('userGreeting');

    if (name) {
        userGreeting.textContent = `Olá, ${name}!`;
    } else if (email) {
        userGreeting.textContent = `Olá, ${email}!`;
    } else {
        window.location.href = '/social-media/login.html';
    }

    const token = localStorage.getItem('token');
    const postsContainer = document.getElementById('posts-container');

    if (token && postsContainer) {
        exibirPosts();
    }

    const logoutButton = document.getElementById('sair');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            logout();
        });
    }

});

function exibirPosts() {
    const token = localStorage.getItem('token');

    if (token) {
        fetch(`${BASE_URL}/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'  
            },
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao obter os posts.');
            })
            .then(postsData => {
                let posts = postsData.reverse();
                let postsContainer = document.getElementById("posts-container");

                postsContainer.innerHTML = "";

                posts.forEach(function (post) {
                    const userId = post.userId;
                    let postDiv = document.createElement("div");
                    postDiv.classList.add("post");
                    postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <div class="edit-form" id="editFormTemplate_${post.id}" style="display: none;">
                    <h3>Editar postagem</h3>
                    <input type="text" id="editTitle_${post.id}" value="${post.title}">
                    <textarea id="editContent_${post.id}">${post.content}</textarea>
                    <div class="button-container">
                    <button class="save-button" data-post-id="${post.id}">Salvar</button>
                    <button class="cancel-button" onclick="cancelarEdicao(${post.id})">Cancelar</button>
                    </div>
                </div>
                <div class="button-container">
                    <button onclick="curtirPost(${post.id})">Curtir (${post.likes})</button>
                    <button onclick="editarPost(${post.id})">Editar</button>
                    <button onclick="excluirPost(${post.id})">Excluir</button>
                </div>
                
                <div class="comment-container" id="comments${post.id}"></div>
                <p class="show-comments-link" id="showComments${post.id}">Ver todos os ${post.comments.length} comentários</p>
                <div class="hidden-comments" id="hiddenComments${post.id}"></div>
                <input type="text" class="comment-input" id="commentInput${post.id}" placeholder="Adicionar um comentário">
                <div class="button-container">
                    <button id="btnAdicionarComentario" onclick="adicionarComentario(${post.id})">Comentar</button>
                </div>
            `;
                    postsContainer.appendChild(postDiv);

                    let commentsContainer = document.getElementById(`comments${post.id}`);
                    let hiddenCommentsContainer = document.getElementById(`hiddenComments${post.id}`);
                    let showCommentsLink = document.getElementById(`showComments${post.id}`);

                    if (commentsContainer && hiddenCommentsContainer && showCommentsLink) {
                        commentsContainer.innerHTML = "";
                        hiddenCommentsContainer.innerHTML = "";

                        for (let i = 0; i < Math.min(2, post.comments ? post.comments.length : 0); i++) {
                            if (post.comments && post.comments[i]) {
                                let commentDiv = document.createElement("div");
                                commentDiv.classList.add("comment");
                                commentDiv.innerHTML = `
                    <p>${post.comments[i].text}</p>
                    <div class="button-container">
                        <button onclick="curtirComentario(${post.comments[i].id})">Curtir (${post.comments[i].likes})</button>
                        <button onclick="excluirComentario(${post.id}, ${post.comments[i].id})">Excluir</button>
                    </div>
                `;
                                commentsContainer.appendChild(commentDiv);
                            }
                        }

                        if (post.comments.length > 2) {
                            showCommentsLink.style.display = "block";

                            showCommentsLink.addEventListener('click', function () {
                                for (let i = 2; i < post.comments.length; i++) {
                                    let commentDiv = document.createElement("div");
                                    commentDiv.classList.add("comment");
                                    commentDiv.innerHTML = `
                            <p>${post.comments[i].text}</p>
                            <div class="button-container">
                                <button onclick="curtirComentario(${post.comments[i].id})">Curtir (${post.comments[i].likes})</button>
                                <button onclick="excluirComentario(${post.id}, ${post.comments[i].id})">Excluir</button>
                            </div>
                        `;
                                    hiddenCommentsContainer.appendChild(commentDiv);
                                }
                                hiddenCommentsContainer.style.display = "block";
                                showCommentsLink.style.display = "none";
                            });
                        } else {
                            showCommentsLink.style.display = "none";
                        }
                    } else {
                        console.error(`Elementos não encontrados para post ${post.id}`);
                    }
                });
            })
            .catch(erro => console.error('Erro:', erro));
    } else {
        console.error('Token de autenticação não encontrado.');
    }
}

function createPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (title && content) {
        let postData = {
            userId: userId,
            title: title,
            content: content,
            like: 0,
            comments: []
        };

        fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                 'Authorization': `${token}`,
                'Content-Type': 'application/json'               
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao criar o post.');
                }
                return response.json();
            })
            .then(postData => {
                exibirPosts();
                document.getElementById("post-title").value = "";
                document.getElementById("post-content").value = "";
            })

    }
}

function curtirPost(postId) {
    fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                exibirPosts();
            } else {
                console.error('Erro ao curtir o post');
            }
        })
        .catch(error => console.error('Erro:', error));
}

function editarPost(postId) {
    const editForm = document.getElementById(`editFormTemplate_${postId}`);
    editForm.style.display = 'block';

    const currentTitle = document.getElementById(`editTitle_${postId}`).value;
    const currentContent = document.getElementById(`editContent_${postId}`).value;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    document.getElementById(`editTitle_${postId}`).value = currentTitle;
    document.getElementById(`editContent_${postId}`).value = currentContent;

    const saveButton = document.querySelector(`#editFormTemplate_${postId} .save-button`);
    saveButton.addEventListener('click', function () {
        const newTitle = document.getElementById(`editTitle_${postId}`).value;
        const newContent = document.getElementById(`editContent_${postId}`).value;

        fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({ 
                userId: userId,
                title: newTitle, 
                content: newContent
             })
        })
            .then(response => {
                if (response.ok) {
                    editForm.style.display = 'none';

                    exibirPosts();
                } else {
                    console.error('Erro ao editar o post');
                }
            })
            .catch(error => console.error('Erro:', error));
    });
}

function cancelarEdicao(postId) {
    const editForm = document.getElementById(`editFormTemplate_${postId}`);
    editForm.style.display = 'none';

    const originalTitle = editForm.getAttribute('data-original-title');
    const originalContent = editForm.getAttribute('data-original-content');

    const titleInput = document.getElementById(`editTitle_${postId}`);
    const contentTextarea = document.getElementById(`editContent_${postId}`);

    titleInput.value = originalTitle;
    contentTextarea.value = originalContent;
}

function excluirPost(postId) {
    fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao excluir o post');
            }
        })
        .then(data => {
            exibirPosts();
        })
        .catch(error => console.error('Erro:', error));
}

function adicionarComentario(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    const commentText = commentInput.value;

    if (commentText) {
        fetch(`${BASE_URL}/comments/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: commentText })
        })
            .then(response => {
                if (response.ok) {
                    exibirPosts();
                    commentInput.value = "";
                } else {
                    console.error('Erro ao adicionar o comentário');
                }
            })
            .catch(error => console.error('Erro:', error));
    }
}

function curtirComentario(commentId) {
    fetch(`${BASE_URL}/comments/comments/${commentId}/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                exibirPosts();
            } else {
                console.error('Erro ao curtir o comentário');
            }
        })
        .catch(error => console.error('Erro:', error));
}

function excluirComentario(postId, commentId) {
    commentId = parseInt(commentId);
    fetch(`${BASE_URL}/comments/${postId}/comments/${commentId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                exibirPosts();
            } else {
                console.error('Erro ao excluir o comentário');
            }
        })
        .catch(error => console.error('Erro:', error));
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

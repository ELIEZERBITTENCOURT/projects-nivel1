const BASE_URL_config = 'http://localhost:3000';


document.addEventListener("DOMContentLoaded", function() {
    const formSenha = document.getElementById("formSenha");
    const formPerfil = document.getElementById("formPerfil");
    const formComunicacao = document.getElementById("formComunicacao");

    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('userGreeting').textContent = `Olá, ${userName}!`;
    }

    formSenha.addEventListener("submit", async function(event) {
        event.preventDefault();
        const senhaAtual = document.getElementById("senhaAtual").value;
        const novaSenha = document.getElementById("novaSenha").value;
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${BASE_URL_config}/user/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ senhaAtual, novaSenha })
            });

            if (response.ok) {
                alert("Senha alterada com sucesso!");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Erro ao alterar a senha.");
            }
        } catch (error) {
            console.error('Erro ao alterar a senha:', error);
        }
    });

    const logoutButton = document.querySelector('.menu-link[onclick="mostrarConteudo(\'sair\')"]');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        logout();
    });

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    }

});

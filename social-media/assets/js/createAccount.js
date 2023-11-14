const BASE_URL_CreateAccount = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    const criarContaForm = document.getElementById('criarContaForm');

    criarContaForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const userData = {
            name: nome,
            email: email,
            password: senha
        };

        try {
            const response = await fetch(`${BASE_URL_CreateAccount}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensagem do servidor
                // Redirecionar ou realizar ações após o cadastro bem-sucedido
                window.location.href = '/social-media/login.html'; 
            } else {
                const errorData = await response.json();
                console.error(errorData.error); // Mensagem de erro do servidor
            }
        } catch (error) {
            console.error('Erro ao criar a conta:', error);
        }
    });
});

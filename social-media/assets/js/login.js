const BASE_URL_Login = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const input = document.getElementById('userEmail').value;
        const password = document.getElementById('password').value;

        let requestBody;
        if (input.includes('@')) {
            requestBody = {
                email: input,
                password: password
            };
        }
                
        try {
            const response = await fetch(`${BASE_URL_Login}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, name, email } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email);

                // Redirecionar ou realizar ações após o login bem-sucedido
                window.location.href = '/social-media/index.html'; 
            } else {
                console.error('Erro ao fazer login. Por favor, verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    });
});

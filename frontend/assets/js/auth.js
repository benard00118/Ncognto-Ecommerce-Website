// assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (email === '' || password === '') {
                alert('Please fill in all fields');
                return;
            }

            try {
                console.log('Sending login request...');
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
                console.log('Login response:', result);

                if (response.ok && result.token) {
                    localStorage.setItem('token', result.token);
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    alert(`Error: ${result.message || 'Unexpected error occurred'}`);
                    console.error('Login error:', result.message);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});

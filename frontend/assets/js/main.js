document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signupForm');
    const loginForm = document.querySelector('#loginForm');
    const logoutButton = document.querySelector('#logoutButton');

    console.log('Document Loaded. Checking forms and buttons...');

    // Handle Sign Up Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Sign Up Form Submitted');

            // Collect form data
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('User registered successfully!');
                    console.log('User registered:', result);
                    window.location.href = 'login.html';
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Login Form Submitted');

            // Collect login form data
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

                console.log('Response received:', response);

                // Parse the response data
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

    // Handle Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('Logout button clicked, removing token');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    // Check for authentication on page load
    const token = localStorage.getItem('token');
    if (token) {
        console.log('User is logged in, token found:', token);
        // Show logout button and hide login link
        logoutButton.classList.remove('d-none');
        document.querySelector('.nav-link[href="login.html"]').classList.add('d-none'); // Hide login link
    } else {
        console.log('No user token found, user is not logged in.');
    }
});

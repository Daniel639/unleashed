document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('loginUn');
            const passwordInput = document.getElementById('login-password');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
          
            // Client-side validation
            if (!username || !password) {
                alert('Please enter both username and password.');
                return; 
            }

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                
                if (response.ok) {
                    const data = await response.json();

                    // Store user data in session storage instead of local storage
                    sessionStorage.setItem('user', JSON.stringify(data.user));

                    // Redirect to home page
                    window.location.replace('/home');
                } else {
                    const errorData = await response.json();
                    
                    // Specific error handling based on server response
                    if (errorData.message === 'Incorrect email or password, please try again') {
                        alert('Invalid username or password. Please try again.');
                    } else {
                        alert(errorData.message || 'An error occurred during login.');
                    }
                }

            } catch (error) {
                console.error('Login error:', error);
                alert('A network error occurred. Please check your connection and try again.');
            }
        });
    }
});
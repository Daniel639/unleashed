const logoutBtn=document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin' // Ensure cookies are sent with the request
    })
    .then(response => {
        if (response.ok) {
            // Redirect or handle logout success on the client side
            window.location.href = '/login'; // Redirect to login page
        } else {
            throw new Error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Logout error:', error);
        // Handle error conditionally
    });
})
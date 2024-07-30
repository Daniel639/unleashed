// logout.js

import Auth from 'public/js/auth.js';

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    } else {
        console.log('Logout button not found in the DOM');
    }

    function handleLogout() {
        fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                Auth.logout();
                window.location.href = '/login';
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        });
    }
});` m v `
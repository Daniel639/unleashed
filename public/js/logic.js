// logic.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if Auth is available
    if (typeof Auth === 'undefined') {
        console.error('Auth module not loaded');
        return;
    }

    if (Auth.isLoggedIn()) {
        const userId = Auth.getUserId();
        console.log('User ID:', userId);
        
        // Add Pet button functionality
        const addPetBtn = document.getElementById('add-pet-btn');
        if (addPetBtn) {
            addPetBtn.addEventListener('click', function () {
                fetch(`/add-pet/${userId}`, {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = `/add-pet/${userId}`;
                    } else {
                        throw new Error('Cannot add a new pet');
                    }
                })
                .catch(error => {
                    console.error('Add pet error:', error);
                    alert('Failed to add a new pet. Please try again.');
                });
            });
        }
    } else {
        console.log('User not logged in');
        // Redirect to login page if not logged in
        window.location.href = '/login';
    }

    // View Profile buttons functionality
    const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
    viewProfileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = btn.getAttribute('data-user-id');
            const petId = btn.getAttribute('data-pet-id');
            window.location.href = `/home/${userId}/${petId}`;
        });
    });

    // Hamburger menu functionality
    const hamMenu = document.getElementById('hamMenu');
    const offScreenMenu = document.getElementById('offScreenMenu');
    if (hamMenu && offScreenMenu) {
        hamMenu.addEventListener('click', function() {
            offScreenMenu.classList.toggle('active');
            hamMenu.classList.toggle('active');
        });
    }
});
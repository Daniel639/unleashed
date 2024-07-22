
        const btns = document.querySelectorAll('.view-profile-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = btn.getAttribute('data-user-id');
                const petId = btn.getAttribute('data-pet-id');
                window.location.href = `/home/${userId}/${petId}`; // Redirect to pet details page
            });
        });

        
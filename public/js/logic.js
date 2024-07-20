
const currentUrl = window.location.href;
    // Extract the ID from the URL
    const urlParts = currentUrl.split('/');
    const id = urlParts[urlParts.length - 1];      
    // Store 'userId' in localStorage
    localStorage.setItem('id', id);

    console.log(id);
    const addPet=document.getElementById('add-pet-btn');
    addPet.addEventListener('click', function () {
    fetch(`/add-pet/${id}`, {
        method: 'GET',
        credentials: 'same-origin' 
    })
    .then(response => {
        if (response.ok) {
            let id=localStorage.getItem('id');
            // Redirect or handle logout success on the client side
            window.location.href = `/add-pet/${id}`;  // Redirect to login page
        } else {
            throw new Error('Cannot add a new pet');
        }
    })
    .catch(error => {
        console.error(' error:', error);
        // Handle error conditionally
    });
    });


    
        const btns = document.querySelectorAll('.view-profile-btn');

        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = btn.getAttribute('data-user-id');
                const petId = btn.getAttribute('data-pet-id');
                window.location.href = `/home/${userId}/${petId}`; // Redirect to pet details page
            });
        });
      


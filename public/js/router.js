const addPet=document.getElementById('addPetBtn');
addPet.addEventListener('click', function () {
    fetch('/add-pet', {
        method: 'GET',
        credentials: 'same-origin' 
    })
    .then(response => {
        if (response.ok) {
            // Redirect or handle logout success on the client side
            window.location.href = '/add-pet';  // Redirect to login page
        } else {
            throw new Error('Cannot add a new pet');
        }
    })
    .catch(error => {
        console.error(' error:', error);
        // Handle error conditionally
    });
})
profileLink.addEventListener("click", function() {

    fetch('/profile', 
        { 
            method: 'POST',
            body: JSON.stringify(data)
        }, 
        )
        .then(response => response.json)
        ,then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(`error:${error}`)
        })
})
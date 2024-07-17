

// grab reference to something on the page 
const profileLink = document.getElementById('profile');
const loginLink = document.getElementById('login');
const editLink = document.getElementById('edit');
const homeLink = document.getElementById('home');
// Grab reference to each Input
// We would create a User object = {}
// send the user object in the request BODY object

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
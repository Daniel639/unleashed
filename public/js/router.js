

// grab reference to something on ther page 
const profileLink = document.getElementById('profile');

profileLink.addEventListener("click", function() {

    fetch('/profile')
        .then(response => response.json)
        ,then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(`error:${error}`)
        })
})
<<<<<<< HEAD

// Get the burger menu icon
const burger = document.querySelector('.burger');

// Get the navbar links ul
const navbarLinks = document.querySelector('.navbar-links');

// Add event listener for the burger menu icon
burger.addEventListener('click', () => {
    // Toggle the navbar-links class to show/hide on click
    navbarLinks.classList.toggle('active');
});

// Optional: Close the menu when a nav link is clicked (for smoother UX)
navbarLinks.addEventListener('click', () => {
    navbarLinks.classList.remove('active');
});

=======
const  toggleMenu = function () {
    var navbarLinks = document.getElementById("navbarLinks");
    navbarLinks.classList.toggle("active");
};
toggleMenu();
>>>>>>> bc09fba297e62e53a964be830a13459b858671c7

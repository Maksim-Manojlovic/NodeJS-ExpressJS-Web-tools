// Loads the navigation bar dynamically from an external HTML file
document.addEventListener("DOMContentLoaded", () => {
    fetch("/components/nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});


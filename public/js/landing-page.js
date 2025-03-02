document.addEventListener("DOMContentLoaded", () => {
    fetch("/landing-page.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("landing-page").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});


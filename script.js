document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript učitan!"); 

    const toggleSwitch = document.getElementById("toggleSwitch");
    const formatButtons = document.getElementById("formatButtons");

    if (!toggleSwitch || !formatButtons) {
        console.error("Elementi nisu pronađeni!");
        return;
    }

    
    formatButtons.style.display = toggleSwitch.checked ? "block" : "none";

    toggleSwitch.addEventListener("change", function() {
        console.log("Slajder promenjen:", this.checked); 
        formatButtons.style.display = this.checked ? "block" : "none";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    fetch("/nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});

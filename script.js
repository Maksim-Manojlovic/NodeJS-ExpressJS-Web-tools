document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript učitan!"); // Provera

    const toggleSwitch = document.getElementById("toggleSwitch");
    const formatButtons = document.getElementById("formatButtons");

    if (!toggleSwitch || !formatButtons) {
        console.error("Elementi nisu pronađeni!");
        return;
    }

    // Postavljamo podrazumevano stanje (da li treba biti prikazano ili ne)
    formatButtons.style.display = toggleSwitch.checked ? "block" : "none";

    toggleSwitch.addEventListener("change", function() {
        console.log("Slajder promenjen:", this.checked); // Provera
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

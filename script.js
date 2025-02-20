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

document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript working!");

    const toggleSwitch = document.getElementById("toggleSwitch");
    const formatButtons = document.getElementById("formatButtons");

    if (!toggleSwitch || !formatButtons) {
        console.error("Elements not found!");
        return;
    }

    formatButtons.style.display = toggleSwitch.checked ? "block" : "none";

    toggleSwitch.addEventListener("change", function() {
        console.log("Slider changed:", this.checked);
        formatButtons.style.display = this.checked ? "block" : "none";
    });
});

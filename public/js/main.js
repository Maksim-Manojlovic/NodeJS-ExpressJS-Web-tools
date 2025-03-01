document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript working!");

    fetch("/pages/landing-page.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("landing-page").innerHTML = data;

            
            setTimeout(() => {
                setupToggleSwitch();
            }, 100); 
        })
        .catch(error => console.error("Error loading landing page:", error));
});

function setupToggleSwitch() {
    const toggleSwitch = document.querySelector("#toggleSwitch");
    const formatButtons = document.querySelector("#formatButtons");

    if (!toggleSwitch || !formatButtons) {
        console.error("Toggle switch or format buttons not found!");
        return;
    }

    console.log("Toggle switch found:", toggleSwitch);
    console.log("Format buttons found:", formatButtons);


    formatButtons.style.display = toggleSwitch.checked ? "block" : "none";


    toggleSwitch.addEventListener("change", function() {
        console.log("Slider changed:", this.checked);
        formatButtons.style.display = this.checked ? "block" : "none";
    });
}

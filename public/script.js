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


document.addEventListener("DOMContentLoaded", () => {
    fetch("/nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});


document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const downloadBtn = document.getElementById('downloadBtn'); 
    const outputDiv = document.getElementById('output');

    if (!fileInput.files.length) {
        alert('Please select an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.url) {
        // Prikazuje optimizovanu sliku
        outputDiv.innerHTML = `
            <p>Optimized Image:</p>
            <img src="${result.url}" alt="Optimized Image">
        `;

        // Postavlja link za preuzimanje i prikazuje dugme
        downloadBtn.href = result.url;
        downloadBtn.hidden = false;
    } else {
        alert('Image processing failed.');
    }
});

// Waits for the DOM to be fully loaded before executing the script
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

// Loads the navigation bar dynamically from an external HTML file
document.addEventListener("DOMContentLoaded", () => {
    fetch("/nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});

// Handles the image upload and optimization process
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
        
        outputDiv.innerHTML = `
            <p>Optimized Image:</p>
            <img src="${result.url}" alt="Optimized Image" class="optimized-image"> 
        `;

        setTimeout(() => {
            const img = document.getElementById("optimizedImage");
            if (img) {
                img.style.width = "90%";  // Ograničava širinu
                img.style.height = "auto"; // Održava proporcije
                img.style.objectFit = "contain"; 
            }
        }, 100);
        
        downloadBtn.href = result.url;
        downloadBtn.hidden = false;
    } else {
        alert('Image processing failed.');
    }
});

// Event listener to display image attributes when a file is selected
document.getElementById('fileInput').addEventListener('change', function () {
    if (this.files.length === 0) return;
    displayImageInfo(this.files[0]);
});

// Reads and displays image information such as name, size, dimensions, and type
function displayImageInfo(file) {
    const reader = new FileReader();
    const imageInfoDiv = document.getElementById('imageInfo');

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            // Prikazujemo informacije
            imageInfoDiv.innerHTML = `
                <p><strong>File Name:</strong> ${file.name}</p>
                <p><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                <p><strong>Image Dimensions:</strong> ${img.width} x ${img.height} px</p>
                <p><strong>File Type:</strong> ${file.type}</p>
            `;
        };
    };

    reader.readAsDataURL(file);
}


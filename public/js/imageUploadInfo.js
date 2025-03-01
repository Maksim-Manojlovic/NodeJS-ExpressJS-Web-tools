document.addEventListener("DOMContentLoaded", () => {
    fetch("/pages/landing-page.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("landing-page").innerHTML = data;
            
            // Tek nakon što je landing-page.html učitan, dodaj event listenere
            setupEventListeners();
        })
        .catch(error => console.error("Error loading landing page:", error));
});

function setupEventListeners() {
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files.length === 0) return;
            displayImageInfo(this.files[0]);
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', async function (e) {
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
                    <img id="optimizedImage" src="${result.url}" alt="Optimized Image" class="optimized-image"> 
                `;

                setTimeout(() => {
                    const img = document.getElementById("optimizedImage");
                    if (img) {
                        img.style.width = "90%";
                        img.style.height = "auto";
                        img.style.objectFit = "contain";
                    }
                }, 100);
                
                downloadBtn.href = result.url;
                downloadBtn.hidden = false;
            } else {
                alert('Image processing failed.');
            }
        });
    }
}

// Funkcija za prikazivanje informacija o slici
function displayImageInfo(file) {
    const reader = new FileReader();
    const imageInfoDiv = document.getElementById('imageInfo');

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
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

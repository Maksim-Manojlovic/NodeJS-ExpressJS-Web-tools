

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


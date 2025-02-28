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

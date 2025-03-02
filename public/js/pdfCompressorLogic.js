document.getElementById("compressBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("pdfInput");
    if (!fileInput.files.length) {
        alert("Please select a PDF file.");
        return;
    }
    
    const formData = new FormData();
    formData.append("pdf", fileInput.files[0]);
    
    const response = await fetch("/compress", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log("Compressed PDF size:", data.size))
    .catch(error => console.error("Error:", error));;
    const data = await response.json();
    
    if (response.ok) {
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("sizeInfo").textContent = `Your PDF is now ${data.savedPercentage}% smaller! ${data.originalSize} KB → ${data.compressedSize} KB`;
        document.getElementById("downloadBtn").addEventListener("click", () => {
            window.location.href = data.downloadUrl;
        });
    } else {
        alert("Error compressing PDF");
    }
});
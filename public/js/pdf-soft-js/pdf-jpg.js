document.addEventListener("DOMContentLoaded", () => {
    const jpgFileInput = document.getElementById("jpgFileInput");
    const convertBtn = document.getElementById("convertBtn");
    const downloadBtn = document.getElementById("downloadBtnJpg");
    const outputDiv = document.getElementById("output");

    let downloadUrl = null;

    convertBtn.addEventListener("click", async () => {
        const files = jpgFileInput.files;
        if (files.length === 0) {
            alert("Please select at least one JPG file to convert.");
            return;
        }

        outputDiv.textContent = "Converting...";

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append("jpgFiles", file);
        });

        try {
            const response = await fetch("/convert-jpg-to-pdf", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                outputDiv.textContent = "Conversion complete! Download your PDF.";
                downloadUrl = data.downloadUrl;

                downloadBtn.classList.remove("hidden");
            } else {
                outputDiv.textContent = "Error converting files.";
                alert("Error converting files.");
            }
        } catch (error) {
            console.error("Error:", error);
            outputDiv.textContent = "An error occurred while converting.";
            alert("An error occurred while converting.");
        }
    });

    downloadBtn.addEventListener("click", () => {
        if (downloadUrl) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'converted.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
}); 
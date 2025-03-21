document.addEventListener("DOMContentLoaded", () => {
    const wordFileInput = document.getElementById("wordFileInput");
    const convertBtn = document.getElementById("convertBtn");
    const downloadBtn = document.getElementById("downloadBtnWord");
    const outputDiv = document.getElementById("output");

    let downloadUrl = null; 

    convertBtn.addEventListener("click", async () => {
        const file = wordFileInput.files[0];
        if (!file) {
            alert("Please select a Word file to convert.");
            return;
        }

        outputDiv.textContent = "Converting...";

        const formData = new FormData();
        formData.append("word", file);

        try {
            const response = await fetch("/convert-word-to-pdf", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                outputDiv.textContent = "Conversion complete! Download your PDF.";
                downloadUrl = data.downloadUrl;

                downloadBtn.classList.remove("hidden"); 
            } else {
                outputDiv.textContent = "Error converting file.";
                alert("Error converting file.");
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
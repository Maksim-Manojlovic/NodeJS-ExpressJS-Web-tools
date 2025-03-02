document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("pdfInput");
    const extractBtn = document.getElementById("extractBtn");
    const outputDiv = document.getElementById("output");

    extractBtn.addEventListener("click", async () => {
        if (!fileInput.files.length) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", fileInput.files[0]);

        try {
            const response = await fetch("/extract", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            outputDiv.innerHTML = `
                <p><strong>Number of Pages:</strong> ${result.numPages}</p>
                <p><strong>Word Count:</strong> ${result.wordCount}</p>
                <p><strong>Number of Images:</strong> ${result.imageCount}</p>
                <p><strong>Table of Contents:</strong></p>
                <ul>${result.tableOfContents.map(item => `<li>${item}</li>`).join('')}</ul>
            `;
        } catch (error) {
            console.error("Error extracting PDF data:", error);
            outputDiv.innerHTML = `<p style="color:red;">Error processing the PDF.</p>`;
        }
    });
});

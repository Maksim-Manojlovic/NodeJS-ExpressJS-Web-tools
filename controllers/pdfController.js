const pdfParse = require("pdf-parse");

const extractPdfData = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const data = await pdfParse(req.file.buffer);
        res.json({
            numPages: data.numpages,
            wordCount: data.text.split(/\s+/).length,
            tableOfContents: [], 
            imageCount: 0 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process PDF" });
    }
};

module.exports = { extractPdfData };

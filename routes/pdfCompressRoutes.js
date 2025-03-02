const express = require("express");
const pdfCompressor = require("../utils/pdfCompressor");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const compressedPdf = await pdfCompressor.compressPDF(req.file.path);
        res.json({
            message: "PDF compressed successfully",
            originalSize: compressedPdf.originalSize,
            compressedSize: compressedPdf.compressedSize,
            savedPercentage: compressedPdf.savedPercentage,
            downloadUrl: `/uploads/${compressedPdf.fileName}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to compress PDF" });
    }
});

module.exports = router;

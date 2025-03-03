const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const compressPDF = require("../utils/pdfCompressor");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputPath = path.join("uploads", `compressed-${req.file.filename}.pdf`);

    const result = await compressPDF(inputPath, outputPath);

    if (result.success) {
        res.json({
            success: true,
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            savedPercentage: result.savedPercentage,
            downloadUrl: `/download/${path.basename(outputPath)}`
        });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});


module.exports = router;

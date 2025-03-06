const compressPDF = require("../utils/pdfCompressor");

const compressPdf = async (req, res) => {
    if (!req.file) {
        console.error("⚠️ No file uploaded.");
        return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    console.log("Uploaded file object:", req.file);

    try {
        const result = await compressPDF(req.file.buffer); 

        if (result.success) {
            res.json({
                success: true,
                originalSize: result.originalSize,
                compressedSize: result.compressedSize,
                savedPercentage: result.savedPercentage,
                compressedBuffer: result.compressedBuffer.toString('base64') 
            });
        } else {
            res.status(500).json({ success: false, error: result.error });
        }
    } catch (err) {
        console.error("Compression error:", err);
        res.status(500).json({ success: false, error: "Failed to compress PDF" });
    }
};

module.exports = { compressPdf };

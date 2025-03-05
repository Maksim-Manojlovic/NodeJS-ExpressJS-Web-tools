const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const optimizeImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputFilename = `optimized-${Date.now()}.jpg`;
    const outputPath = path.join(__dirname, "../optimized", outputFilename);

    try {
        await sharp(inputPath)
            .resize(800)
            .jpeg({ quality: 70 })
            .toFile(outputPath);

        fs.unlinkSync(inputPath);

        res.json({ url: `/optimized/${outputFilename}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Processing failed" });
    }
};

module.exports = { optimizeImage };

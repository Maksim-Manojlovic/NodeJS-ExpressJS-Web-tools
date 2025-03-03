const fs = require("fs");
const { PDFDocument } = require("pdf-lib"); 
const path = require("path");

async function compressPDF(inputPath, outputPath) {
    try {
        const existingPdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        pdfDoc.setCreator("Optimized PDF Compressor");

        const compressedPdfBytes = await pdfDoc.save();

        fs.writeFileSync(outputPath, compressedPdfBytes);

        const originalSize = fs.statSync(inputPath).size / 1024; // KB
        const compressedSize = fs.statSync(outputPath).size / 1024; // KB
        const savedPercentage = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

        return { 
            success: true, 
            compressedSize: compressedSize.toFixed(2), 
            originalSize: originalSize.toFixed(2),
            savedPercentage: savedPercentage
        };
    } catch (error) {
        console.error("Error compressing PDF:", error);
        return { success: false, error: error.message };
    }
}

module.exports = compressPDF;

const fs = require("fs");
const pdfLib = require("pdf-lib"); 

async function compressPDF(inputPath, outputPath) {
    try {
        const existingPdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await pdfLib.PDFDocument.load(existingPdfBytes);

        pdfDoc.setCreator("Optimized PDF Compressor");

        const compressedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, compressedPdfBytes);

        return { success: true, compressedSize: compressedPdfBytes.length };
    } catch (error) {
        console.error("Error compressing PDF:", error);
        return { success: false, error: error.message };
    }
}

module.exports = compressPDF;

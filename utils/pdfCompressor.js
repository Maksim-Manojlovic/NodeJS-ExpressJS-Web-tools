const pdfLib = require("pdf-lib");

const compressPDF = async (inputBuffer) => {
    try {
        const pdfDoc = await pdfLib.PDFDocument.load(inputBuffer);
        
        const compressedBytes = await pdfDoc.save();
       
        return {
            success: true,
            originalSize: inputBuffer.length,
            compressedSize: compressedBytes.length,
            savedPercentage: ((inputBuffer.length - compressedBytes.length) / inputBuffer.length) * 100,
            compressedBuffer: Buffer.from(compressedBytes) 
        };
    } catch (err) {
        console.error("Error compressing PDF:", err);
        return { success: false, error: err.message };
    }
};

module.exports = compressPDF;

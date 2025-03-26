const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.convertJpgToPdf = (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const pdfDoc = new PDFDocument();
    const outputPath = path.join(__dirname, '../uploads', `${Date.now()}-converted.pdf`);

    
    pdfDoc.pipe(fs.createWriteStream(outputPath));

    files.forEach(file => {
        pdfDoc.addPage().image(file.buffer, {
            fit: [500, 700],
            align: 'center',
            valign: 'center'
        });
    });

    pdfDoc.end();

    pdfDoc.on('finish', () => {
        res.json({ downloadUrl: `/downloads/${path.basename(outputPath)}` });
    });

    pdfDoc.on('error', (err) => {
        console.error('Error creating PDF:', err);
        res.status(500).json({ error: 'Error creating PDF' });
    });
};
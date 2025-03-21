const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.convertWordToPdf = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = path.join(__dirname, '../uploads', file.filename);
    const outputPath = path.join(__dirname, '../public/downloads', `${Date.now()}-converted.pdf`);

    
    exec(`libreoffice --headless --convert-to pdf ${inputPath} --outdir ${path.dirname(outputPath)}`, (err) => {
        if (err) {
            console.error('Error converting Word to PDF:', err);
            return res.status(500).json({ error: 'Conversion failed' });
        }

        res.json({ downloadUrl: `/downloads/${path.basename(outputPath)}` });
    });
}; 
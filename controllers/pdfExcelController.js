const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.convertExcelToPdf = (file, callback) => {
    const workbook = new ExcelJS.Workbook();
    const pdfDoc = new PDFDocument();
    const outputPath = path.join(__dirname, '../public/downloads', `${Date.now()}-converted.pdf`);

    
    workbook.xlsx.load(file.buffer)
        .then(() => {
            const worksheet = workbook.getWorksheet(1); 

            
            pdfDoc.pipe(fs.createWriteStream(outputPath));

            worksheet.eachRow((row, rowNumber) => {
                pdfDoc.text(row.values.join(' '), { width: 410, align: 'left' });
            });

            pdfDoc.end();

            
            callback(null, `/downloads/${path.basename(outputPath)}`);
        })
        .catch(err => {
            console.error('Error converting Excel to PDF:', err);
            callback(err);
        });
}; 
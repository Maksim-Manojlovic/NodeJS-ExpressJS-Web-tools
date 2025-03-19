const express = require("express");
const multer = require("multer");
const path = require("path");

const { extractPdfData } = require("../controllers/pdfController");
const { optimizeImage } = require("../controllers/uploadController");
const { downloadFile } = require("../controllers/downloadCompressedPDFController");
const { compressPdf } = require("../controllers/pdfCompressController");
const { analyzeWebsite } = require("../controllers/techSpyController");
const { analyzeTechnologies } = require("../controllers/techSpyWapController");
const { countLinks } = require('../controllers/linkCounterController');
const { extractH1 } = require('../controllers/h1ExtractorController');
const { analyzePageSpeed } = require('../controllers/pageSpeedController');
const { convertExcelToPdf } = require('../controllers/pdfExcelController');

const multerConfig = require("../config/multerConfig");
const upload = multer();

const router = express.Router();

//PDF Extractor soft
router.post("/pdf", upload.single("pdf"), extractPdfData);
router.post("/extract", upload.single("pdf"), extractPdfData);

//Image Opimizer soft
router.post("/upload", multerConfig.single("image"), optimizeImage);

//PDF Compressor soft
router.get("/download/:filename", downloadFile);
router.post("/compress", upload.single("pdf"), compressPdf);

// TechSpy soft
router.post("/techspy/analyze", analyzeWebsite);

// TechSpyWap soft
router.get("/analyze", analyzeTechnologies);

//LinkCounter soft
router.get('/count-links', countLinks);

// H1 Extractor soft
router.post('/api/extract-h1', extractH1);

// Page Speed Analyzer soft
router.get('/page-speed-analyzer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/seo-soft/page-speed-analyzer.html'));
});
// Page Speed Analyzer soft
router.post('/api/analyze-speed', analyzePageSpeed);

// SEO Page soft - only frontend interface
router.get('/seo-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/seo-soft/seo-page.html'));
});

// PDF Page soft - only frontend interface
router.get('/pdf-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pdf/pdf-page.html'));
});

// Excel to PDF Converter soft
router.post('/convert-excel-to-pdf', upload.single('excel'), (req, res) => {
    convertExcelToPdf(req.file, (err, downloadUrl) => {
        if (err) {
            return res.status(500).json({ error: 'Conversion failed' });
        }
        res.json({ downloadUrl });
    });
});





module.exports = router;

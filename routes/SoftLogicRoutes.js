const express = require("express");
const multer = require("multer");

const { extractPdfData } = require("../controllers/pdfController");
const { optimizeImage } = require("../controllers/uploadController");
const { downloadFile } = require("../controllers/downloadCompressedPDFController");
const { compressPdf } = require("../controllers/pdfCompressController");

const multerConfig = require("../config/multerConfig");
const upload = multer();



const router = express.Router();

router.post("/pdf", upload.single("pdf"), extractPdfData);
router.post("/extract", upload.single("pdf"), extractPdfData);

router.post("/upload", multerConfig.single("image"), optimizeImage);

router.get("/download/:filename", downloadFile);
router.post("/compress", upload.single("pdf"), compressPdf);

module.exports = router;

const express = require("express");
const multer = require("multer");

const { extractPdfData } = require("../controllers/pdfController");
const { optimizeImage } = require("../controllers/uploadController");

const multerConfig = require("../config/multerConfig");
const upload = multer();



const router = express.Router();

router.post("/pdf", upload.single("pdf"), extractPdfData);
router.post("/extract", upload.single("pdf"), extractPdfData);

router.post("/upload", multerConfig.single("image"), optimizeImage);


module.exports = router;

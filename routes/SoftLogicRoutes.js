const express = require("express");
const multer = require("multer");

const { extractPdfData } = require("../controllers/pdfController");
const upload = multer();

const router = express.Router();

router.post("/pdf", upload.single("pdf"), extractPdfData);
router.post("/extract", upload.single("pdf"), extractPdfData);

module.exports = router;

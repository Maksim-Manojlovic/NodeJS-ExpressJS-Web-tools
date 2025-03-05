const express = require("express");
const multer = require("multer");
const { extractPdfData } = require("../controllers/pdfController");

const router = express.Router();
const upload = multer();

router.post("/", upload.single("pdf"), extractPdfData);

module.exports = router;

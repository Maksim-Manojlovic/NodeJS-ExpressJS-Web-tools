const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    
    res.download(filePath, req.params.filename, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file");
        }
    });
});

module.exports = router;

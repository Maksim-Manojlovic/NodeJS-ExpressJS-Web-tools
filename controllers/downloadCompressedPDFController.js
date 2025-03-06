const path = require("path");

const downloadFile = (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);

    res.download(filePath, req.params.filename, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file");
        }
    });
};

module.exports = { downloadFile };

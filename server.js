require('dotenv').config();
const express = require('express');
const path = require('path');

const uploadRoutes = require('./routes/uploadRoutes');
const setupStaticFiles = require('./middleware/staticFiles');
const pdfRoutes = require("./routes/pdfRoutes");
const pdfCompressRoutes = require("./routes/pdfCompressRoutes");
const downloadCompressRoutes = require("./routes/downloadCompressRoutes");
const techSpyRoutes = require('./routes/techSpyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
setupStaticFiles(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
app.use(express.static('dist'));

// API Routes
app.use("/download", downloadCompressRoutes);
app.use("/compress", pdfCompressRoutes);
app.use("/pdf", pdfRoutes);
app.use('/upload', uploadRoutes);
app.use("/extract", pdfRoutes);
app.use("/techspy", techSpyRoutes);

// Catch-all route for 404 errors
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

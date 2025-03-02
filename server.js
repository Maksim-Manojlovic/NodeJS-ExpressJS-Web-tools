require('dotenv').config();
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const setupStaticFiles = require('./middleware/staticFiles');

const app = express();
const PORT = process.env.PORT || 5000;
const pdfRoutes = require("./routes/pdfRoutes");
const pdfCompressRoutes = require("./routes/pdfCompressRoutes");

setupStaticFiles(app);



app.use("/compress", pdfCompressRoutes);
app.use("/pdf", pdfRoutes);
app.use(express.static('public'));
app.use('/upload', uploadRoutes);
app.use(express.static('dist'));
app.use("/extract", pdfRoutes);

app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

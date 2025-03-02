require('dotenv').config();
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const setupStaticFiles = require('./middleware/staticFiles');

const app = express();
const PORT = process.env.PORT || 5000;


setupStaticFiles(app);

app.use(express.static('public'));
app.use('/upload', uploadRoutes);
app.use(express.static('dist'));


app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

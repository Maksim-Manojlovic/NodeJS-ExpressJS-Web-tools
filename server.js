require('dotenv').config();
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const setupStaticFiles = require('./middleware/staticFiles');

const app = express();
const PORT = process.env.PORT || 5000;

// Postavljanje statičkih fajlova
setupStaticFiles(app);

// Korišćenje ruta
app.use('/upload', uploadRoutes);

// Ruta za 404 grešku
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});

// Pokretanje servera
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const path = require('path');


const setupStaticFiles = require('./middleware/staticFiles');



const analyzeRoutes = require("./routes/analyzeRoutes");

const routes = require("./routes/SoftLogicRoutes");


const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
setupStaticFiles(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static('public'));
app.use(express.static('dist'));

// API Routes

app.use("/analyze", analyzeRoutes);

app.use("/", routes);

// Catch-all route for 404 errors
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

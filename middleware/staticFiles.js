const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.use('/optimized', express.static(path.join(__dirname, '../optimized')));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public/pages')));
    app.use(express.static(path.join(__dirname, '../dist')));
    app.use(express.static(path.join(__dirname, '../images')));
};

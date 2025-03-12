const axios = require('axios');
const cheerio = require('cheerio');

const extractH1 = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL je obavezan' });
        }

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const h1Text = $('h1').first().text().trim();

        if (!h1Text) {
            return res.status(404).json({ error: 'H1 tag nije pronađen na stranici' });
        }

        res.json({ h1: h1Text });
    } catch (error) {
        console.error('Greška pri ekstrakciji H1:', error);
        res.status(500).json({ 
            error: 'Došlo je do greške pri pristupu URL-u ili ekstrakciji H1 taga' 
        });
    }
};

module.exports = {
    extractH1
}; 
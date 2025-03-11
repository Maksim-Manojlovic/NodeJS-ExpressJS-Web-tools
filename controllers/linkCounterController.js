const axios = require('axios');
const cheerio = require('cheerio');

exports.countLinks = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const links = [];

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) links.push(href);
        });

        res.json({ totalLinks: links.length, links });
    } catch (error) {
        console.error('Error fetching the page:', error.message);
        res.status(500).json({ error: 'Failed to fetch the URL' });
    }
};

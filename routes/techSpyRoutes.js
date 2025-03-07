const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        } catch (gotoError) {
            console.error('Puppeteer error while navigating:', gotoError);
            return res.status(500).json({ error: 'Failed to load the website' });
        }
        

        
        const title = await page.title();
        const description = await page.evaluate(() => {
            const meta = document.querySelector('meta[name="description"]');
            return meta ? meta.content : 'No description available';
        });

        
        const tech = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('script')).map(script => script.src || 'Inline Script');
        });

        await browser.close();

        res.json({
            url,
            title,
            description,
            technologies: tech.filter(src => src !== 'Inline Script') 
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze the page' });
    }
});

module.exports = router;

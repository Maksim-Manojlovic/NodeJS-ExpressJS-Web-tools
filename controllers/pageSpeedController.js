require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const analyzePageSpeed = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        const mobileResult = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${API_KEY}`);
        const desktopResult = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop&key=${API_KEY}`);

        const results = {
            mobile: {
                score: mobileResult.data.lighthouseResult.categories.performance.score * 100,
                metrics: {
                    fcp: mobileResult.data.lighthouseResult.audits['first-contentful-paint'],
                    lcp: mobileResult.data.lighthouseResult.audits['largest-contentful-paint'],
                    cls: mobileResult.data.lighthouseResult.audits['cumulative-layout-shift'],
                    fid: mobileResult.data.lighthouseResult.audits['max-potential-fid']
                }
            },
            desktop: {
                score: desktopResult.data.lighthouseResult.categories.performance.score * 100,
                metrics: {
                    fcp: desktopResult.data.lighthouseResult.audits['first-contentful-paint'],
                    lcp: desktopResult.data.lighthouseResult.audits['largest-contentful-paint'],
                    cls: desktopResult.data.lighthouseResult.audits['cumulative-layout-shift'],
                    fid: desktopResult.data.lighthouseResult.audits['max-potential-fid']
                }
            }
        };

        res.json(results);
    } catch (error) {
        console.error('Error analyzing page speed:', error);
        res.status(500).json({ 
            error: 'Error analyzing page speed',
            details: error.message 
        });
    }
};

module.exports = {
    analyzePageSpeed
}; 
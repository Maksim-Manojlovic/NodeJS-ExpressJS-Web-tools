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

        const extractMetrics = (data) => ({
            fcp: data.audits['first-contentful-paint'],
            lcp: data.audits['largest-contentful-paint'],
            cls: data.audits['cumulative-layout-shift'],
            fid: data.audits['max-potential-fid'],
            speedIndex: data.audits['speed-index'],  
            interactive: data.audits['interactive'],  
            inputLatency: data.audits['estimated-input-latency']  
        });

        const results = {
            mobile: {
                score: mobileResult.data.lighthouseResult.categories.performance.score * 100,
                metrics: extractMetrics(mobileResult.data.lighthouseResult)
            },
            desktop: {
                score: desktopResult.data.lighthouseResult.categories.performance.score * 100,
                metrics: extractMetrics(desktopResult.data.lighthouseResult)
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

const axios = require("axios");
const cheerio = require("cheerio");
const detectTechnologies = require("../utils/technologyDetector");

exports.analyzeTechnologies = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let technologies = detectTechnologies($);

        if (Object.keys(technologies).length === 0) {
            technologies = [];
        } else {
            technologies = Object.entries(technologies).map(([category, items]) => ({
                category,
                items
            }));
        }
        console.log("Final Response Data:", { url, technologies });
        res.json({
            url,
            technologies
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch the website." });
    }
};



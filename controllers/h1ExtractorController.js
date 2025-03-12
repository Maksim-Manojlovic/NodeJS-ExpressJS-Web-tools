const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const extractH1 = async (req, res) => {
    let browser;
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Launch puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Extract styles using puppeteer
        const headings = await page.evaluate(() => {
            const result = {
                h1: [], h2: [], h3: [], h4: [], h5: [], h6: []
            };

            const getDefaultStyles = (tag) => {
                const defaultSizes = {
                    h1: '32px',
                    h2: '24px',
                    h3: '18.72px',
                    h4: '16px',
                    h5: '13.28px',
                    h6: '10.72px'
                };

                const defaultWeights = {
                    h1: 'bold',
                    h2: 'bold',
                    h3: 'bold',
                    h4: 'bold',
                    h5: 'bold',
                    h6: 'bold'
                };

                return {
                    defaultFontSize: defaultSizes[tag] || '16px',
                    defaultFontWeight: defaultWeights[tag] || 'normal'
                };
            };

            // Process each heading level
            for (let i = 1; i <= 6; i++) {
                const headingTag = `h${i}`;
                const elements = document.getElementsByTagName(headingTag);

                for (let j = 0; j < elements.length; j++) {
                    const element = elements[j];
                    const text = element.textContent.trim();

                    if (text) {
                        const computedStyle = window.getComputedStyle(element);
                        const defaults = getDefaultStyles(headingTag);

                        const styles = {
                            computed: {
                                fontSize: computedStyle.fontSize,
                                fontWeight: computedStyle.fontWeight,
                                fontFamily: computedStyle.fontFamily,
                                color: computedStyle.color,
                                lineHeight: computedStyle.lineHeight,
                                textTransform: computedStyle.textTransform,
                                letterSpacing: computedStyle.letterSpacing
                            },
                            default: defaults,
                            inlineStyle: element.getAttribute('style') || '',
                            classes: element.getAttribute('class') || '',
                            id: element.getAttribute('id') || '',
                            textAlign: computedStyle.textAlign,
                            isVisible: computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden',
                            position: computedStyle.position
                        };

                        result[headingTag].push({
                            text,
                            index: j + 1,
                            styles,
                            hasChildren: element.children.length > 0,
                            parentTag: element.parentElement.tagName.toLowerCase(),
                            htmlContent: element.innerHTML,
                            charCount: text.length,
                            wordCount: text.split(/\s+/).filter(Boolean).length
                        });
                    }
                }
            }

            return result;
        });

        const hasHeadings = Object.values(headings).some(arr => arr.length > 0);
        
        if (!hasHeadings) {
            return res.status(404).json({ error: 'No heading tags found on the page' });
        }

        res.json({ headings });
    } catch (error) {
        console.error('Error extracting headings:', error);
        res.status(500).json({ 
            error: 'Error accessing URL or extracting heading tags' 
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = {
    extractH1
}; 
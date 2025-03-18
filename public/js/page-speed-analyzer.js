document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    
    const mobileScoreValue = document.getElementById('mobileScoreValue');
    const desktopScoreValue = document.getElementById('desktopScoreValue');
    const recommendationsList = document.getElementById('recommendationsList');
    const mobileScoreCircle = document.getElementById('mobileScoreCircle');
    const desktopScoreCircle = document.getElementById('desktopScoreCircle');

    const metrics = ['fcp', 'lcp', 'cls', 'fid'];

    function showLoading() {
        loadingDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
    }

    function hideLoading() {
        loadingDiv.classList.add('hidden');
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
    }

    function getScoreClass(score) {
        if (score >= 90) return 'score-good';
        if (score >= 50) return 'score-average';
        return 'score-poor';
    }

    function formatMetricValue(metric, value) {
        switch(metric) {
            case 'cls':
                return value.toFixed(3);
            case 'fcp':
            case 'lcp':
            case 'fid':
                return `${(value / 1000).toFixed(2)}s`;
            default:
                return value;
        }
    }

    function updateScoreCircle(score, circleElement, valueElement) {
        const circumference = 2 * Math.PI * 70; // r = 70
        const offset = circumference - (score / 100) * circumference;
        
        circleElement.style.strokeDasharray = `${circumference}`;
        circleElement.style.strokeDashoffset = offset;
        
        // Uklanjamo postojeće klase
        circleElement.classList.remove('score-good', 'score-average', 'score-poor');
        
        // Dodajemo novu klasu na osnovu skora
        if (score >= 90) {
            circleElement.classList.add('score-good');
        } else if (score >= 50) {
            circleElement.classList.add('score-average');
        } else {
            circleElement.classList.add('score-poor');
        }

        // Postavljamo vrednost
        valueElement.textContent = Math.round(score);
    }

    function displayResults(data) {
        // Prikazujemo desktop rezultate inicijalno
        updateScoreCircle(data.desktop.score, desktopScoreCircle, desktopScoreValue);
        mobileScoreCircle.style.strokeDasharray = "0";
        mobileScoreCircle.style.strokeDashoffset = "0";
    
        // Dodajemo click handler za desktop i mobile sekcije
        const desktopSection = desktopScoreCircle.closest('.bg-white');
        const mobileSection = mobileScoreCircle.closest('.bg-white');
        
        desktopSection.style.cursor = 'pointer';
        mobileSection.style.cursor = 'pointer';
        
        let isMobileVisible = false;
        desktopSection.addEventListener('click', () => {
            if (isMobileVisible) {
                // Prikazujemo desktop rezultate
                updateScoreCircle(data.desktop.score, desktopScoreCircle, desktopScoreValue);
                // Sakrivamo mobile rezultate
                mobileScoreCircle.style.strokeDasharray = "0";
                mobileScoreCircle.style.strokeDashoffset = "0";
                isMobileVisible = false;
            }
        });
    
        mobileSection.addEventListener('click', () => {
            if (!isMobileVisible) {
                // Prikazujemo mobile rezultate
                updateScoreCircle(data.mobile.score, mobileScoreCircle, mobileScoreValue);
                // Sakrivamo desktop rezultate
                desktopScoreCircle.style.strokeDasharray = "0";
                desktopScoreCircle.style.strokeDashoffset = "0";
                isMobileVisible = true;
            }
        });
    
        // Display metrics (možete prilagoditi da se i oni menjaju po potrebi)
        metrics.forEach(metric => {
            const desktopMetric = data.desktop.metrics[metric];
            if (desktopMetric) {
                document.getElementById(metric).textContent = formatMetricValue(metric, desktopMetric.numericValue);
                document.getElementById(metric).className = `metric-value ${getScoreClass(desktopMetric.score * 100)}`;
            }
        });
    
        // Show results
        resultsDiv.classList.remove('hidden');
    }


    analyzeBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();

        if (!url) {
            showError('Please enter a valid URL');
            return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            showError('Please enter a valid URL starting with http:// or https://');
            return;
        }

        showLoading();

        try {
            const response = await fetch('/api/analyze-speed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('Failed to analyze page speed');
            }

            const data = await response.json();
            hideLoading();
            displayResults(data);
        } catch (error) {
            hideLoading();
            showError('Error analyzing page speed. Please try again.');
            console.error('Error:', error);
        }
    });

    // Allow Enter key to trigger analysis
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
}); 
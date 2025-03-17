document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    
    const mobileScoreValue = document.getElementById('mobileScoreValue');
    const desktopScoreValue = document.getElementById('desktopScoreValue');
    const recommendationsList = document.getElementById('recommendationsList');

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

    function displayResults(data) {
        // Display scores
        mobileScoreValue.textContent = `${Math.round(data.mobile.score)}`;
        desktopScoreValue.textContent = `${Math.round(data.desktop.score)}`;

        mobileScoreValue.className = `score-value ${getScoreClass(data.mobile.score)}`;
        desktopScoreValue.className = `score-value ${getScoreClass(data.desktop.score)}`;

        // Display metrics
        metrics.forEach(metric => {
            const mobileMetric = data.mobile.metrics[metric];
            const desktopMetric = data.desktop.metrics[metric];

            if (mobileMetric) {
                document.getElementById(metric).textContent = formatMetricValue(metric, mobileMetric.numericValue);
                document.getElementById(metric).className = `metric-value ${getScoreClass(mobileMetric.score * 100)}`;
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
document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput').value;
    const url = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;

    const resultDiv = document.getElementById('result');
    if (!url) {
        resultDiv.innerHTML = `<p class="text-red-500">Please enter a URL.</p>`;
        return;
    }

    resultDiv.innerHTML = `<p class="text-gray-600">Analyzing...</p>`;

    try {
        const response = await fetch('/techspy/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p class="text-red-500">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <h3 class="text-lg font-bold">${data.title}</h3>
                <p class="text-gray-600">${data.description}</p>
                <h4 class="mt-4 font-semibold">Detected Technologies:</h4>
                <ul class="list-disc list-inside text-gray-700">
                    ${data.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-500">Failed to analyze the page.</p>`;
    }
});

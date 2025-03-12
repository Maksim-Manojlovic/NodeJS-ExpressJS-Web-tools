document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const extractButton = document.getElementById('extractButton');
    const resultDiv = document.getElementById('result');
    const h1ResultDiv = document.getElementById('h1Result');
    const errorDiv = document.getElementById('error');
    const errorText = errorDiv.querySelector('p');

    extractButton.addEventListener('click', async () => {
        let url = urlInput.value.trim();
        
        // Dodaj http:// ili https:// ako nije uključeno
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        try {
            const response = await fetch('/api/extract-h1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (response.ok) {
                errorDiv.classList.add('hidden');
                resultDiv.classList.remove('hidden');
                h1ResultDiv.textContent = data.h1 || 'H1 tag nije pronađen';
            } else {
                throw new Error(data.error || 'Došlo je do greške prilikom ekstraktovanja H1 taga');
            }
        } catch (error) {
            resultDiv.classList.add('hidden');
            errorDiv.classList.remove('hidden');
            errorText.textContent = error.message;
        }
    });
}); 
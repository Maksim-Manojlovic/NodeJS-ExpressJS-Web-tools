document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const extractButton = document.getElementById('extractButton');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const errorText = errorDiv.querySelector('p');

    const createHeadingElement = (heading) => {
        const div = document.createElement('div');
        div.className = 'p-4 bg-gray-50 rounded-md border border-gray-200';
        
        // Create main content section
        const mainContent = `
            <div class="mb-2">
                <p class="text-gray-800 font-medium">${heading.text}</p>
                <div class="text-sm text-gray-500 mt-2">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="font-medium text-blue-600 mb-1">Actual Styles:</p>
                            <p>Font size: ${heading.styles.computed.fontSize}</p>
                            <p>Font weight: ${heading.styles.computed.fontWeight}</p>
                            <p>Font family: ${heading.styles.computed.fontFamily}</p>
                            <p>Color: ${heading.styles.computed.color}</p>
                            <p>Line height: ${heading.styles.computed.lineHeight}</p>
                            <p>Text transform: ${heading.styles.computed.textTransform}</p>
                            <p>Letter spacing: ${heading.styles.computed.letterSpacing}</p>
                        </div>
                        <div>
                            <p class="font-medium text-green-600 mb-1">Default Values:</p>
                            <p>Font size: ${heading.styles.default.defaultFontSize}</p>
                            <p>Font weight: ${heading.styles.default.defaultFontWeight}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Create details section
        const details = `
            <div class="mt-3 pt-3 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p class="text-gray-600">Position: #${heading.index}</p>
                        <p class="text-gray-600">Parent: ${heading.parentTag}</p>
                        <p class="text-gray-600">Visible: ${heading.styles.isVisible ? 'Yes' : 'No'}</p>
                        <p class="text-gray-600">Text align: ${heading.styles.textAlign}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Characters: ${heading.charCount}</p>
                        <p class="text-gray-600">Words: ${heading.wordCount}</p>
                        <p class="text-gray-600">Has children: ${heading.hasChildren ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                ${heading.styles.classes ? `
                    <div class="mt-2">
                        <p class="text-gray-600">Classes: <span class="text-blue-600">${heading.styles.classes}</span></p>
                    </div>
                ` : ''}
                ${heading.styles.id ? `
                    <div class="mt-1">
                        <p class="text-gray-600">ID: <span class="text-blue-600">${heading.styles.id}</span></p>
                    </div>
                ` : ''}
                ${heading.styles.inlineStyle ? `
                    <div class="mt-1">
                        <p class="text-gray-600">Inline styles: <span class="text-blue-600">${heading.styles.inlineStyle}</span></p>
                    </div>
                ` : ''}
            </div>
        `;

        div.innerHTML = mainContent + details;
        return div;
    };

    const displayHeadings = (headings) => {
        resultDiv.classList.remove('hidden');
        
        for (let i = 1; i <= 6; i++) {
            const container = document.getElementById(`h${i}Container`);
            const headingList = container.querySelector('.space-y-2');
            const headingArray = headings[`h${i}`];

            if (headingArray && headingArray.length > 0) {
                container.classList.remove('hidden');
                headingList.innerHTML = '';
                
                headingArray.forEach(heading => {
                    headingList.appendChild(createHeadingElement(heading));
                });
            } else {
                container.classList.add('hidden');
            }
        }
    };

    extractButton.addEventListener('click', async () => {
        let url = urlInput.value.trim();
        
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
                displayHeadings(data.headings);
            } else {
                throw new Error(data.error || 'Error extracting heading tags');
            }
        } catch (error) {
            resultDiv.classList.add('hidden');
            errorDiv.classList.remove('hidden');
            errorText.textContent = error.message;
        }
    });
}); 
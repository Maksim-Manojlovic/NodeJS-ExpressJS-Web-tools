document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) return alert("Please enter a URL.");

    const response = await fetch(`/analyze?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    Object.keys(data).forEach(category => {
        displayResults(data, category);
    });
    
});

function displayResults(data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (!data.technologies || data.technologies.length === 0) {
        resultsContainer.innerHTML = "<p>No technologies detected.</p>";
        return;
    }

    let html = `<p class="text-lg font-semibold"><strong>URL:</strong> ${data.url}</p>`;

    data.technologies.forEach(tech => {
        html += `
            <div class="bg-gray-100 p-4 rounded-lg shadow">
                <h2 class="text-purple-600 font-bold text-lg flex items-center">
                    <i class="${getIconClass(tech.category, tech.category)} mr-2"></i>
                    ${tech.category}
                </h2>
                <ul class="mt-2 ml-4 list-disc">
        `;

        tech.items.forEach(item => {
            html += `
                <li class="flex items-center gap-2">
                    <i class="${getIconClass(item, tech.category)} text-purple-600"></i> 
                    ${item}
                </li>
            `;
        });

        html += `</ul></div>`;
    });

    resultsContainer.innerHTML = html;
}


function getIconClass(name, category) {
    const categoryIcons = {
        "CMS": "fa-solid fa-laptop-code",
        "Analytics": "fa-solid fa-chart-line",
        "JavaScript Frameworks": "fa-brands fa-js",
        "Databases": "fa-solid fa-database",
        "SEO": "fa-solid fa-magnifying-glass",
        "Security": "fa-solid fa-shield-alt",
        "Hosting": "fa-solid fa-server",
        "WordPress plugins": "fa-brands fa-wordpress"
    };

    const techIcons = {
        "WordPress": "fa-brands fa-wordpress",
        "Google Tag Manager": "fa-solid fa-tags",
        "jQuery": "fa-brands fa-js",
        "PHP": "fa-brands fa-php",
        "Nginx": "fa-solid fa-server",
        "Apache": "fa-solid fa-server",
        "MySQL": "fa-solid fa-database",
        "MongoDB": "fa-solid fa-leaf",
        "React": "fa-brands fa-react",
        "Vue.js": "fa-brands fa-vuejs",
        "Bootstrap": "fa-brands fa-bootstrap",

        // WordPress Plugins
        "Yoast SEO": "fa-solid fa-chart-line",
        "Elementor": "fa-brands fa-elementor",
        "Akismet": "fa-solid fa-shield-virus",
        "WooCommerce": "fa-solid fa-shopping-cart",
        "Contact Form 7": "fa-solid fa-envelope",
        "WP Rocket": "fa-solid fa-bolt",
        "Site Kit": "fa-brands fa-google"
    };

    // Ako postoji specifična ikonica za tehnologiju, koristimo nju, ako ne, koristimo za kategoriju
    return techIcons[name] || categoryIcons[category] || "fa-solid fa-cube";
}



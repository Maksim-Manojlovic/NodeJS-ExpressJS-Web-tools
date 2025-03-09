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

    let html = `<p><strong>URL:</strong> ${data.url}</p>`;
    html += "<ul>";

    data.technologies.forEach(tech => {
        html += `<li><strong>${tech.category}:</strong> ${tech.items.join(", ")}</li>`;
    });

    html += "</ul>";
    resultsContainer.innerHTML = html; 
}



function getIconClass(category) {
    const icons = {
        "CMS": "fa-solid fa-laptop-code",
        "Analytics": "fa-solid fa-chart-line",
        "JavaScript Frameworks": "fa-brands fa-js",
        "Databases": "fa-solid fa-database",
        "SEO": "fa-solid fa-magnifying-glass",
        "Security": "fa-solid fa-shield-alt",
        "Hosting": "fa-solid fa-server"
    };
    return icons[category] || "fa-solid fa-cube";
}

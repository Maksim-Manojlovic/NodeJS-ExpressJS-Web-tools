document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) return alert("Please enter a URL.");

    const response = await fetch(`/analyze?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    Object.keys(data).forEach(category => {
        displayResults(data, category);
    });
    
});

function displayResults(data, category) {
    console.log("Received Data:", data);
    console.log("Category:", category);
    console.log("Category Data:", data[category]);

    if (!data[category] || !Array.isArray(data[category])) {
        console.error(`Invalid data for category: ${category}`);
        return;
    }

    let resultsContainer = document.getElementById("results");
    let section = document.createElement("div");
    section.innerHTML = `<h3 class="font-bold">${category}</h3>`;
    
    data[category].forEach(tech => {
        let techItem = document.createElement("p");
        techItem.textContent = tech;
        section.appendChild(techItem);
    });

    resultsContainer.appendChild(section);
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

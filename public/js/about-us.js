async function importBodyContent(url, targetElementId) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        
        const bodyContent = doc.body.innerHTML;

       
        document.getElementById(targetElementId).innerHTML = bodyContent;
    } catch (error) {
        console.error("Error loading body content:", error);
    }
}


importBodyContent("components/about-us.html", "about-us");

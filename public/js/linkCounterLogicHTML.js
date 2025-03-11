async function countLinks() {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch(`/count-links?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        document.getElementById('linkCount').textContent = `Total Links: ${data.totalLinks}`;
        const linkList = document.getElementById('linkList');
        linkList.innerHTML = data.links.map(link => `<li>${link}</li>`).join('');
    } catch (error) {
        console.error('Error fetching link data:', error);
    }
}

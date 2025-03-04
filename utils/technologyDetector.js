function detectTechnologies($) {
    let results = {
        "CMS": [],
        "Analytics": [],
        "JavaScript Frameworks": [],
        "Databases": [],
        "SEO": []
    };

    const scripts = $("script").map((_, el) => $(el).attr("src")).get();
    const metas = $("meta").map((_, el) => $(el).attr("content")).get();

    // WordPress Detection
    if ($('meta[name="generator"]').attr("content")?.includes("WordPress")) {
        results["CMS"].push("WordPress");
    }

    // Google Analytics & Tag Manager
    if (scripts.some(src => src?.includes("googletagmanager"))) {
        results["Analytics"].push("Google Tag Manager");
    }
    if (scripts.some(src => src?.includes("analytics.js"))) {
        results["Analytics"].push("Google Analytics");
    }

    // JavaScript Frameworks
    if (scripts.some(src => src?.includes("react"))) {
        results["JavaScript Frameworks"].push("React");
    }
    if (scripts.some(src => src?.includes("vue"))) {
        results["JavaScript Frameworks"].push("Vue.js");
    }

    // Database Detection
    if (scripts.some(src => src?.includes("mysql"))) {
        results["Databases"].push("MySQL");
    }

    // SEO Detection
    if (metas.some(content => content?.includes("Yoast SEO"))) {
        results["SEO"].push("Yoast SEO");
    }

    // Remove empty categories
    Object.keys(results).forEach(key => {
        if (results[key].length === 0) delete results[key];
    });

    return results;
}

module.exports = detectTechnologies;

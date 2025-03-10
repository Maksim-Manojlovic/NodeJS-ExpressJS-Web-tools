function detectTechnologies($) {
    let results = {
        "CMS": [],
        "Analytics": [],
        "JavaScript Libraries": [],
        "JavaScript Graphics": [],
        "Databases": [],
        "SEO": [],
        "Video Players": [],
        "Font Scripts": [],
        "Miscellaneous": [],
        "Web Servers": [],
        "Reverse Proxies": [],
        "Programming Languages": [],
        "WordPress Plugins": [],
        "Page Builders": []
    };

    const scripts = $("script").map((_, el) => $(el).attr("src")).get();
    const metas = $("meta").map((_, el) => $(el).attr("content")).get();
    const pageHTML = $.html();
    const inlineScripts = $("script").map((_, el) => $(el).html()).get().join("\n");

    // === CMS Detection ===
    if ($('meta[name="generator"]').attr("content")?.includes("WordPress")) {
        results["CMS"].push("WordPress");
    }

    // === Google Analytics & Tag Manager ===
    if (scripts.some(src => src?.includes("googletagmanager"))) {
        results["Analytics"].push("Google Tag Manager");
    }
    if (scripts.some(src => src?.includes("analytics.js")) || inlineScripts.includes("GoogleAnalyticsObject")) {
        results["Analytics"].push("Google Analytics");
    }

    // === JavaScript Libraries ===
    const jsLibraries = {
        "React": ["react", "React.createElement", "__REACT_DEVTOOLS_GLOBAL_HOOK__", "data-reactroot"],
        "Vue.js": ["vue", "Vue.component", "data-v-app"],
        "Angular": ["angular", "ng.coreTokens", "ng-version"],
        "Svelte": ["svelte", "svelte/internal", "data-sveltekit"],
        "jQuery": ["jquery"],
        "jQuery UI": ["jquery-ui"],
        "jQuery Migrate": ["jquery-migrate"],
        "core-js": ["core-js"],
        "Underscore.js": ["underscore"],
        "Swiper": ["swiper"],
        "MobX": ["mobx"],
        "Clipboard.js": ["clipboard"]
    };

    for (const [lib, keywords] of Object.entries(jsLibraries)) {
        if (scripts.some(src => keywords.some(keyword => src?.includes(keyword))) ||
            inlineScripts.includes(keywords[0]) ||
            pageHTML.includes(keywords[keywords.length - 1])) {
            results["JavaScript Libraries"].push(lib);
        }
    }

    // === JavaScript Graphics ===
    if (scripts.some(src => src?.includes("charts.googleapis"))) {
        results["JavaScript Graphics"].push("Google Charts");
    }

    // === Database Detection ===
    if (scripts.some(src => src?.includes("mysql")) || pageHTML.includes("MySQL")) {
        results["Databases"].push("MySQL");
    }

    // === SEO Detection ===
    if (metas.some(content => content?.includes("Yoast SEO"))) {
        results["SEO"].push("Yoast SEO");
    }

    // === Video Players ===
    if (scripts.some(src => src?.includes("mediaelement"))) {
        results["Video Players"].push("MediaElement.js");
    }

    // === Font Scripts ===
    if (scripts.some(src => src?.includes("fonts.googleapis"))) {
        results["Font Scripts"].push("Google Font API");
    }
    if (scripts.some(src => src?.includes("twemoji"))) {
        results["Font Scripts"].push("Twitter Emoji (Twemoji)");
    }

    // === Miscellaneous ===
    if (pageHTML.includes("Open Graph")) {
        results["Miscellaneous"].push("Open Graph");
    }
    if (pageHTML.includes("RSS")) {
        results["Miscellaneous"].push("RSS");
    }
    if (scripts.some(src => src?.includes("gravatar"))) {
        results["Miscellaneous"].push("Gravatar");
    }

    // === Web Servers ===
    if (pageHTML.includes("nginx")) {
        results["Web Servers"].push("Nginx");
    }

    // === Reverse Proxies ===
    if (pageHTML.includes("nginx")) {
        results["Reverse Proxies"].push("Nginx");
    }

    // === Programming Languages ===
    if (pageHTML.includes("PHP") || scripts.some(src => src?.includes("php"))) {
        results["Programming Languages"].push("PHP");
    }

    // === Page Builders ===
    const pageBuilders = {
        "Elementor": "elementor",
        "Divi": "et-builder",
        "Oxygen": "oxygen",
        "WPBakery": "js_composer"
    };

    for (const [builder, keyword] of Object.entries(pageBuilders)) {
        if (scripts.some(src => src?.includes(keyword)) || pageHTML.includes(keyword)) {
            results["Page Builders"].push(builder);
        }
    }
    
    // === WordPress Plugins ===
    const wpPlugins = {
        "Akismet": "akismet",
        "Site Kit": "site-kit",
        "Essential Addons for Elementor": "essential-addons-elementor"
    };

    for (const [plugin, keyword] of Object.entries(wpPlugins)) {
        if (scripts.some(src => src?.includes(keyword)) || pageHTML.includes(keyword)) {
            results["WordPress Plugins"].push(plugin);
        }
    }

    
    Object.keys(results).forEach(key => {
        if (results[key].length === 0) delete results[key];
    });

    return results;
}

module.exports = detectTechnologies;

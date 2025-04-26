document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id === itemId);
            if (item) {
                // Update visible page content
                document.getElementById("item-title").innerText = item.id;
                document.getElementById("item-image").src = `images/${item.image}`;
                document.getElementById("item-style").innerText = item.style;
                document.getElementById("item-subject").innerText = item.subject;
                document.getElementById("item-size").innerText = item.size;
                document.getElementById("item-contentSize").innerText = item.contentSize;
                document.getElementById("item-dateModified").innerText = item.size;

                // Create JSON-LD metadata
                const jsonLd = {
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": item.title,
                    "image": `images/${item.image}`,
                    "description": item.description,
                    "brand": item.brand,
                    "category": item.category
                };

                // Insert JSON-LD into the <head> of the document
                const script = document.createElement("script");
                script.type = "application/ld+json";
                script.textContent = JSON.stringify(jsonLd);
                document.head.appendChild(script);
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});

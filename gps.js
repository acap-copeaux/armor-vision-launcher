/* -----------------------------------------------------
   ARMOR VISION — GPS ENGINE
   Version 1.0
   Gère : position réelle + mini-map + navigation
------------------------------------------------------*/

console.log("ARMOR VISION GPS ENGINE — LOADED");

let gpsActive = false;

function avShowGPS() {
    window.AVCORE.aiSay("Récupération de votre position…");

    if (!navigator.geolocation) {
        window.AVCORE.aiSay("GPS non supporté sur cet appareil.");
        return;
    }

    gpsActive = true;

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude.toFixed(5);
            const lon = pos.coords.longitude.toFixed(5);
            const acc = pos.coords.accuracy;

            window.AVCORE.aiSay(
                `Position : ${lat}, ${lon} — précision ${acc}m`
            );

            // Affichage console
            console.log("GPS:", pos);

            // Création de la mini-carte si pas déjà faite
            const mapBox = document.getElementById("av-map-box");
            if (!mapBox) avCreateMap(lat, lon);
            else avUpdateMap(lat, lon);
        },
        (err) => {
            window.AVCORE.aiSay("Impossible d'obtenir la position.");
            console.warn("GPS error:", err);
        },
        {
            enableHighAccuracy: true,
            timeout: 7000
        }
    );
}

// -----------------------------------------------------
// MINI-MAP (OpenStreetMap static image)
// -----------------------------------------------------

function avCreateMap(lat, lon) {
    const container = document.createElement("div");
    container.id = "av-map-box";
    container.style.marginTop = "10px";
    container.style.border = "1px solid var(--accent-soft)";
    container.style.borderRadius = "12px";
    container.style.overflow = "hidden";

    const img = document.createElement("img");
    img.id = "av-map-img";
    img.style.width = "100%";
    img.style.height = "180px";
    img.style.objectFit = "cover";

    img.src =
        `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,300&z=16&l=map&pt=${lon},${lat},pm2rdm`;

    container.appendChild(img);

    document.querySelector(".av-main-card").appendChild(container);
}

function avUpdateMap(lat, lon) {
    const img = document.getElementById("av-map-img");
    img.src =
        `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,300&z=16&l=map&pt=${lon},${lat},pm2rdm`;
}

// -----------------------------------------------------
// NAVIGATION GOOGLE MAPS
// -----------------------------------------------------
function avOpenNavigation() {
    window.open("https://www.google.com/maps", "_blank");
}

// -----------------------------------------------------
// LIEN AVEC les commandes vocale / textuelles
// -----------------------------------------------------
window.AVGPS = {
    avShowGPS,
    avOpenNavigation
};

// Ajouter commandes dans le core engine
window.AVCORE.handleCommand = function (cmd) {
    const c = cmd.toLowerCase();

    if (c.includes("gps") || c.includes("position") || c.includes("carte")) {
        avShowGPS();
        return;
    }

    if (c.includes("navigation")) {
        avOpenNavigation();
        return;
    }

    // commandes de base
    if (c.includes("heure")) {
        aiSay("Il est " + document.getElementById("av-time").textContent);
        return;
    }

    if (c.includes("date")) {
        aiSay("Nous sommes le " + document.getElementById("av-date").textContent);
        return;
    }

    if (c.includes("batterie")) {
        aiSay("Niveau batterie : " + document.getElementById("battery-level").textContent);
        return;
    }

    aiSay("Commande non reconnue.");
};

/* -----------------------------------------------------
   ARMOR VISION — BATTERY ENGINE
   Version 1.0
   Gère : niveau batterie Android réel
------------------------------------------------------*/

console.log("ARMOR VISION BATTERY ENGINE — LOADED");

const batteryLevelEl = document.getElementById("battery-level");
const batteryCircle = document.querySelector(".av-battery-inner");

// -----------------------------------------------------
// BATTERY API (Android Chrome + WebView compatible)
// -----------------------------------------------------

async function initBattery() {
    if (!navigator.getBattery) {
        // Fallback
        batteryLevelEl.textContent = "??%";
        console.warn("Battery API non supportée.");
        return;
    }

    const battery = await navigator.getBattery();
    
    function updateAll() {
        const percent = Math.round(battery.level * 100);
        batteryLevelEl.textContent = percent + "%";

        // HUD coloration
        if (percent < 20) {
            batteryCircle.classList.add("av-battery-low");
        } else {
            batteryCircle.classList.remove("av-battery-low");
        }
    }

    // Mise à jour initiale
    updateAll();

    // Mise à jour dynamique
    battery.addEventListener("levelchange", updateAll);
    battery.addEventListener("chargingchange", updateAll);
}

// Démarrer
initBattery();

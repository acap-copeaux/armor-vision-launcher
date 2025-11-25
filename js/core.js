/* -----------------------------------------------------
   ARMOR VISION — CORE ENGINE
   Version 1.0
   Gère : heure, date, état IA, commandes simples
------------------------------------------------------*/

console.log("ARMOR VISION CORE ENGINE — LOADED");

const aiStatus = document.getElementById("ai-status-text");
const timeEl = document.getElementById("av-time");
const dateEl = document.getElementById("av-date");

// -----------------------------------------------------
// HORLOGE TEMPS RÉEL
// -----------------------------------------------------

function updateClock() {
    const now = new Date();

    // Heure
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    timeEl.textContent = `${hours}:${minutes}`;

    // Date
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();

    dateEl.textContent = `${day}, ${month} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();


// -----------------------------------------------------
// IA — MESSAGE SIMPLE (placeholder)
// -----------------------------------------------------

function aiSay(text) {
    aiStatus.textContent = text;
    aiStatus.classList.add("av-typing");

    setTimeout(() => {
        aiStatus.classList.remove("av-typing");
    }, 1500);
}


// -----------------------------------------------------
// COMMANDES TEXTUELLES SIMPLIFIÉES
// -----------------------------------------------------

function handleCommand(cmd) {
    const c = cmd.toLowerCase();

    if (c.includes("heure")) {
        aiSay("Il est " + timeEl.textContent);
    } 
    else if (c.includes("date")) {
        aiSay("Nous sommes le " + dateEl.textContent);
    } 
    else if (c.includes("batterie")) {
        const level = document.getElementById("battery-level").textContent;
        aiSay("Niveau de batterie : " + level);
    }
    else {
        aiSay("Commande non reconnue.");
    }
}


// -----------------------------------------------------
// PLACEHOLDER : quand tu feras le module vocal
// -----------------------------------------------------

window.AVCORE = {
    aiSay,
    handleCommand
};

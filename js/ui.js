/* -----------------------------------------------------
   ARMOR VISION — UI ENGINE
   Version 1.0
   Gère : animations HUD, interactions, clics icônes
------------------------------------------------------*/

console.log("ARMOR VISION UI ENGINE — LOADED");

// -----------------------------------------------------
// UTIL VIBRATION (Android WebView Compatible)
// -----------------------------------------------------
function avVibrate(ms = 40) {
    if (navigator.vibrate) navigator.vibrate(ms);
}

// -----------------------------------------------------
// AI CIRCLE ANIMATION
// -----------------------------------------------------
const aiCircle = document.querySelector(".av-ai-circle");

function aiPulse() {
    if (!aiCircle) return;
    aiCircle.classList.add("av-ai-pulse");
    setTimeout(() => aiCircle.classList.remove("av-ai-pulse"), 800);
}

setInterval(aiPulse, 3000);

// -----------------------------------------------------
// MICROPHONE BUTTON
// -----------------------------------------------------
const micBtn = document.getElementById("mic-btn");

let micActive = false;

if (micBtn) {
    micBtn.addEventListener("click", () => {
        avVibrate();
        micActive = !micActive;

        if (micActive) {
            micBtn.classList.add("av-mic-active");
            window.AVCORE.aiSay("Listening...");
            aiCircle.classList.add("av-ai-listening");
        } else {
            micBtn.classList.remove("av-mic-active");
            aiCircle.classList.remove("av-ai-listening");
            window.AVCORE.aiSay("Awaiting your command.");
        }
    });
}

// -----------------------------------------------------
// ICON BUTTON CLICK EFFECT
// -----------------------------------------------------
document.querySelectorAll(".av-icon-button").forEach(btn => {
    btn.addEventListener("click", () => {
        avVibrate(30);
        btn.classList.add("av-icon-tap");
        setTimeout(() => btn.classList.remove("av-icon-tap"), 200);
    });
});

// -----------------------------------------------------
// NAVIGATION BAR — CLICK
// -----------------------------------------------------
document.querySelectorAll(".av-nav-item").forEach(nav => {
    nav.addEventListener("click", () => {
        avVibrate(35);
        nav.classList.add("av-nav-tap");
        setTimeout(() => nav.classList.remove("av-nav-tap"), 180);
    });
});

// -----------------------------------------------------
// MUSIC PLAYER — PLAY BUTTON
// -----------------------------------------------------
const playButton = document.querySelector(".av-player-btn.play");

if (playButton) {
    playButton.addEventListener("click", () => {
        avVibrate(40);
        playButton.classList.add("av-play-anim");
        setTimeout(() => playButton.classList.remove("av-play-anim"), 300);
    });
}

// -----------------------------------------------------
// LANGUAGE BUTTON CHANGE
// -----------------------------------------------------
const lang = document.getElementById("language-btn");

if (lang) {
    lang.addEventListener("click", () => {
        avVibrate();
        lang.classList.add("av-lang-flash");
        setTimeout(() => lang.classList.remove("av-lang-flash"), 500);
    });
}

// -----------------------------------------------------
// VPN BUTTON FEEDBACK
// -----------------------------------------------------
const vpn = document.querySelector(".av-vpn-pill");

if (vpn) {
    vpn.addEventListener("click", () => {
        avVibrate();
        vpn.classList.add("av-vpn-alert");
        setTimeout(() => vpn.classList.remove("av-vpn-alert"), 600);
    });
}


/* -----------------------------------------------------
   ARMOR VISION — VOICE ENGINE
   Version 1.0
   Active micro + animation IA + commandes vocales
------------------------------------------------------*/

console.log("ARMOR VISION VOICE ENGINE — LOADED");

let recognition;
let listening = false;

const micBtn = document.getElementById("mic-btn");
const aiCircle = document.querySelector(".av-ai-circle");

// -----------------------------------------------------
// CHECK API SUPPORT
// -----------------------------------------------------
if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    console.warn("SpeechRecognition non supportée sur cet appareil.");
} else {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechAPI();

    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.continuous = false;

    // -----------------------------------------------------
    // EVENTS
    // -----------------------------------------------------

    recognition.onstart = () => {
        listening = true;
        micBtn.classList.add("av-mic-active");
        aiCircle.classList.add("av-ai-listening");
        window.AVCORE.aiSay("Je t'écoute...");
    };

    recognition.onerror = (e) => {
        console.error("Erreur micro:", e.error);
        window.AVCORE.aiSay("Je n'ai rien compris.");
    };

    recognition.onend = () => {
        listening = false;
        micBtn.classList.remove("av-mic-active");
        aiCircle.classList.remove("av-ai-listening");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("Commande vocale:", transcript);

        window.AVCORE.handleCommand(transcript);
    };
}

// -----------------------------------------------------
// BUTTON CLICK
// -----------------------------------------------------
if (micBtn) {
    micBtn.addEventListener("click", () => {
        if (!recognition) {
            window.AVCORE.aiSay("Micro non supporté.");
            return;
        }

        if (listening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
}

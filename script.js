"use strict";
 
/* ========================================
   0. SHARED HELPERS
======================================== */
 
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;
 
// localStorage can be blocked (private mode, strict settings), so never trust it.
function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}
 
function safeSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        /* storage blocked: the page still works, it just won't remember */
    }
}
 
// Pick a random item, never the same one twice in a row.
function pickRandom(list, lastIndex) {
    let index = Math.floor(Math.random() * list.length);
    if (list.length > 1 && index === lastIndex) {
        index = (index + 1) % list.length;
    }
    return index;
}
 
// Emoji rain.
function confetti(symbols, count) {
    if (reduceMotion) return;
 
    for (let i = 0; i < count; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.setAttribute("aria-hidden", "true");
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.fontSize = 16 + Math.random() * 18 + "px";
        piece.style.animationDuration = 2 + Math.random() * 2.5 + "s";
        piece.style.animationDelay = Math.random() * 0.6 + "s";
        document.body.append(piece);
        setTimeout(function () {
            piece.remove();
        }, 5500);
    }
}
 
 
/* ========================================
   1. SOUND (Web Audio, no sound files)
======================================== */
 
let soundOn = safeGet("pipSound") !== "off";
let audioCtx = null;
 
const NOTES = [523.25, 587.33, 659.25, 783.99, 880.0];
 
function getAudio() {
    if (!audioCtx) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}
 
function tone(frequency, duration, type, volume) {
    if (!soundOn) return;
 
    const ctx = getAudio();
    if (!ctx) return;
 
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
 
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
 
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
}
 
function playNote(index) {
    tone(NOTES[index % NOTES.length], 0.9, "sine", 0.18);
}
 
function playClick() {
    tone(1046.5, 0.07, "triangle", 0.08);
}
 
function playChime() {
    NOTES.forEach(function (frequency, i) {
        setTimeout(function () {
            tone(frequency, 1.1, "sine", 0.15);
        }, i * 140);
    });
}
 
const soundToggle = document.getElementById("soundToggle");
 
if (soundToggle) {
    function paintSoundToggle() {
        soundToggle.textContent = soundOn ? "🔊 Sound on" : "🔇 Sound off";
        soundToggle.setAttribute("aria-pressed", String(soundOn));
    }
 
    paintSoundToggle();
 
    soundToggle.addEventListener("click", function () {
        soundOn = !soundOn;
        safeSet("pipSound", soundOn ? "on" : "off");
        paintSoundToggle();
        playClick();
    });
}
 
// A soft click for every button and link.
// Stars, music keys and story objects play their own sounds instead.
document.addEventListener("click", function (event) {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (
        target.id === "soundToggle" ||
        target.matches(".dream-star, .music-key, .story-object")
    ) {
        return;
    }
    playClick();
});
 
 
/* ========================================
   2. SPARKLE TRAIL
======================================== */
 
let lastSparkle = 0;
 
document.addEventListener("pointermove", function (event) {
    if (reduceMotion || event.pointerType === "touch") return;
 
    const now = Date.now();
    if (now - lastSparkle < 40) return;
    lastSparkle = now;
 
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.setAttribute("aria-hidden", "true");
    sparkle.textContent = "✦";
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";
    document.body.append(sparkle);
 
    setTimeout(function () {
        sparkle.remove();
    }, 700);
});
 
 
/* ========================================
   3. VISIT COUNTER (counts this browser only)
======================================== */
 
const visitCount = document.getElementById("visitCount");
 
if (visitCount) {
    let visits = Number(safeGet("pipVisits")) || 0;
 
    try {
        // Count once per browser session, not on every refresh.
        if (!sessionStorage.getItem("pipCounted")) {
            visits += 1;
            safeSet("pipVisits", String(visits));
            sessionStorage.setItem("pipCounted", "1");
        }
    } catch (error) {
        visits = Math.max(visits, 1);
    }
 
    visitCount.textContent = String(Math.max(visits, 1)).padStart(6, "0");
}
 
 
/* ========================================
   4. DREAM DELIVERY + DREAM BUTTON
======================================== */
 
const dreams = [
    "You dream of a cloud that sells tiny umbrellas. ☁️☂️",
    "A sleepy whale hums you a lullaby while you ride on its back. 🐋",
    "Every pillow turns into a marshmallow and you bounce all the way to the moon. 🌙",
    "A penguin delivers a letter that just says: you did great today. 🐧💌",
    "You find a door in a star that opens onto a library of warm blankets. ⭐📚",
    "The rain starts falling upward and turns into tiny glowing fireflies. 🌧️✨",
    "You and a fox build a lantern out of cinnamon and moonlight. 🦊🏮",
    "Your shadow tucks YOU in tonight. 💤"
];
 
let lastDream = -1;
 
function nextDream() {
    lastDream = pickRandom(dreams, lastDream);
    return dreams[lastDream];
}
 
const dreamButton = document.getElementById("dreamButton");
const message = document.getElementById("message");
 
if (dreamButton && message) {
    dreamButton.addEventListener("click", function () {
        message.textContent =
            "✨ Pip delivered a tiny dream just for you: " + nextDream();
    });
}
 
const deliveryButton = document.getElementById("deliveryButton");
const deliveryOutput = document.getElementById("deliveryOutput");
 
if (deliveryButton && deliveryOutput) {
    deliveryButton.addEventListener("click", function () {
        deliveryOutput.textContent = "📬 Delivered: " + nextDream();
    });
}
 
 
/* ========================================
   5. PIP'S ORIGIN STORY
======================================== */
 
const storyScenes = [
    {
        icon: "🌧️",
        bg: "#e8ecf8",
        title: "The Sleepless Night",
        text: "Once upon a midnight, Pip noticed that the little stars couldn't help everyone sleep. Something magical was missing.",
        object: {
            emoji: "⭐",
            label: "a fallen star",
            prompt: "Tap the glowing ⭐ to see what Pip found.",
            reveal: "You found a fallen star! It's still warm, and it hums a very quiet tune."
        }
    },
    {
        icon: "💡",
        bg: "#fff3d6",
        title: "A Little Spark",
        text: "Pip built a tiny dream lantern, mixed it with gentle lullabies, and discovered that even the smallest light could bring comfort.",
        object: {
            emoji: "🎼",
            label: "a lullaby",
            prompt: "Tap the glowing 🎼 to hear what went into the lantern.",
            reveal: "Pip tucked the lullaby inside the lantern, and the glow got softer."
        }
    },
    {
        icon: "🌙",
        bg: "#f7dce5",
        title: "The Dream Engineer",
        text: "And so Pip joined the Midnight Nursery, delivering cozy dreams, designing nightlights, and helping sleepy minds find their happy place.",
        object: {
            emoji: "📬",
            label: "a letter",
            prompt: "Tap the glowing 📬 to open today's mail.",
            reveal: "A letter! \"Dear Pip, thank you for last night's dream. Love, everyone.\""
        }
    }
];
 
let currentScene = 0;
let foundObjects = [];
let typingTimer = null;
 
const storyScene = document.getElementById("storyScene");
const storyIcon = document.getElementById("storyIcon");
const storyStep = document.getElementById("storyStep");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyButton = document.getElementById("storyButton");
const storyObject = document.getElementById("storyObject");
const storyHint = document.getElementById("storyHint");
 
// Typewriter effect (shows the full text at once if motion is reduced).
function typeInto(element, text) {
    clearInterval(typingTimer);
 
    if (reduceMotion) {
        element.textContent = text;
        return;
    }
 
    element.textContent = "";
    let letters = 0;
 
    typingTimer = setInterval(function () {
        letters += 1;
        element.textContent = text.slice(0, letters);
        if (letters >= text.length) {
            clearInterval(typingTimer);
        }
    }, 18);
}
 
if (
    storyIcon &&
    storyStep &&
    storyTitle &&
    storyText &&
    storyButton
) {
    const lastScene = storyScenes.length - 1;
 
    function showScene(index) {
        currentScene = index;
        const scene = storyScenes[index];
        const found = Boolean(foundObjects[index]);
 
        storyIcon.textContent = scene.icon;
        storyStep.textContent =
            `Chapter ${index + 1} of ${storyScenes.length}`;
        storyTitle.textContent = scene.title;
        typeInto(storyText, scene.text);
 
        if (storyScene) {
            storyScene.style.background = scene.bg;
        }
 
        if (storyObject) {
            storyObject.textContent = scene.object.emoji;
            storyObject.setAttribute(
                "aria-label",
                "Look closer: " + scene.object.label
            );
            storyObject.classList.toggle("found", found);
        }
 
        if (storyHint) {
            storyHint.textContent = found
                ? scene.object.reveal
                : scene.object.prompt;
        }
 
        // With a clue on screen, the next button unlocks once it is found.
        storyButton.disabled = storyObject ? !found : false;
 
        storyButton.textContent =
            index === lastScene
                ? "Read the story again ↻"
                : "Discover what happened →";
    }
 
    if (storyObject) {
        storyObject.addEventListener("click", function () {
            if (foundObjects[currentScene]) return;
 
            foundObjects[currentScene] = true;
            const scene = storyScenes[currentScene];
 
            storyObject.classList.add("found");
            if (storyHint) {
                storyHint.textContent = scene.object.reveal;
            }
            storyButton.disabled = false;
 
            playNote(currentScene + 1);
 
            if (currentScene === lastScene) {
                confetti(["✨", "💌", "🌙"], 18);
            }
        });
    }
 
    storyButton.addEventListener("click", function () {
        if (currentScene === lastScene) {
            foundObjects = [];
            showScene(0);
        } else {
            showScene(currentScene + 1);
        }
    });
 
    showScene(0);
}
 
 
/* ========================================
   6. HIDDEN EASTER EGG (poke the title 5 times)
======================================== */
 
const secretTitle = document.getElementById("secretTitle");
const secretMessage = document.getElementById("secretMessage");
 
let titleClicks = 0;
 
if (secretTitle && secretMessage) {
    function unlockSecret() {
        titleClicks++;
 
        if (titleClicks === 5) {
            secretMessage.hidden = false;
            secretMessage.textContent =
                "🌟 SECRET UNLOCKED: Pip says you're made of stardust and excellent dreams! 🌙";
 
            secretTitle.setAttribute("aria-label", "Secret unlocked!");
 
            playChime();
            confetti(["🌟", "✨", "💗", "🌙", "⭐"], 40);
        }
    }
 
    // Works with mouse clicks and phone taps.
    secretTitle.addEventListener("click", unlockSecret);
 
    // Keyboard accessibility.
    secretTitle.setAttribute("tabindex", "0");
    secretTitle.setAttribute("role", "button");
 
    secretTitle.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            unlockSecret();
        }
    });
}
 
 
/* ========================================
   7. LULLABY LAB (music box)
======================================== */
 
const musicKeys = document.querySelectorAll(".music-key");
const lullabyMessage = document.getElementById("lullabyMessage");
 
let recentKeys = [];
 
musicKeys.forEach(function (key) {
    key.addEventListener("click", function () {
        const note = Number(key.dataset.note);
        playNote(note);
 
        recentKeys.push(note);
        if (recentKeys.length > 5) {
            recentKeys.shift();
        }
 
        if (!lullabyMessage) return;
 
        if (!soundOn) {
            lullabyMessage.textContent =
                "Sound is off. Tap the sound button to hear the lullaby.";
        } else if (recentKeys.join(",") === "0,1,2,3,4") {
            lullabyMessage.textContent =
                "🎶 You played Pip's Twinkle Lullaby! Sweet dreams.";
            confetti(["🎵", "✨", "🌙"], 14);
        } else {
            lullabyMessage.textContent =
                "Lovely. Keep going, left to right.";
        }
    });
});
 
 
/* ========================================
   8. NIGHTLIGHT CONSTELLATIONS (night mode)
======================================== */
 
const nightlightButton = document.getElementById("nightlightButton");
 
if (nightlightButton) {
    nightlightButton.addEventListener("click", function () {
        const isNight = document.body.classList.toggle("night");
        nightlightButton.setAttribute("aria-pressed", String(isNight));
        nightlightButton.textContent = isNight
            ? "Turn off the nightlight"
            : "Turn on the nightlight";
    });
}
 
 
/* ========================================
   9. INTERACTIVE DREAM CONSTELLATION
======================================== */
 
const dreamStars = document.querySelectorAll(".dream-star");
const starMessage = document.getElementById("starMessage");
const starProgress = document.getElementById("starProgress");
const starMap = document.querySelector(".star-map");
const footerSurprise = document.getElementById("footerSurprise");
 
const foundStars = new Set();
let constellationDone = false;
 
function completeConstellation() {
    constellationDone = true;
 
    if (starMap) {
        starMap.classList.add("complete");
    }
 
    if (footerSurprise) {
        footerSurprise.hidden = false;
    }
 
    playChime();
    confetti(["⭐", "✨", "🌙", "💗"], 30);
}
 
if (starMessage) {
    dreamStars.forEach(function (star, index) {
        if (!star.hasAttribute("aria-label")) {
            star.setAttribute("aria-label", "Dream star " + (index + 1));
        }
 
        star.addEventListener("click", function () {
            playNote(index);
            star.classList.add("found");
            foundStars.add(index);
 
            let text =
                star.dataset.message ||
                "✨ A little mystery from the Midnight Nursery!";
 
            if (starProgress) {
                starProgress.textContent =
                    `Stars found: ${foundStars.size} of ${dreamStars.length}`;
            }
 
            if (foundStars.size === dreamStars.length && !constellationDone) {
                text +=
                    "  ✦ CONSTELLATION COMPLETE! A surprise is waiting in the footer. ✦";
                completeConstellation();
            }
 
            starMessage.textContent = text;
        });
    });
}
 
 
/* ========================================
   10. DREAM GUESTBOOK (saved in this browser)
======================================== */
 
const guestbookForm = document.getElementById("guestbookForm");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const guestbookEntries = document.getElementById("guestbookEntries");
const guestbookStatus = document.getElementById("guestbookStatus");
 
if (
    guestbookForm &&
    guestName &&
    guestMessage &&
    guestbookEntries &&
    guestbookStatus
) {
    const MAX_SAVED_NOTES = 40;
 
    // Made-up friends, so the guestbook never looks empty.
    const seedNotes = [
        { name: "Moon Moth", text: "Your Lullaby Lab smells like warm milk. 10/10." },
        { name: "Sleepy Fox", text: "Pip, my dreams got so much better since the delivery!" }
    ];
 
    function addNote(name, textValue, isSeed) {
        const note = document.createElement("article");
        note.className = isSeed ? "guest-note seed" : "guest-note";
 
        const title = document.createElement("h3");
        title.textContent = "💌 From " + name;
 
        const text = document.createElement("p");
        text.textContent = textValue;
 
        note.append(title, text);
        guestbookEntries.prepend(note);
    }
 
    let savedNotes = [];
 
    try {
        const stored = JSON.parse(safeGet("pipNotes"));
        if (Array.isArray(stored)) {
            savedNotes = stored.filter(function (note) {
                return (
                    note &&
                    typeof note.name === "string" &&
                    typeof note.text === "string"
                );
            });
        }
    } catch (error) {
        savedNotes = [];
    }
 
    // Oldest first, so the newest note ends up on top.
    seedNotes.forEach(function (note) {
        addNote(note.name, note.text, true);
    });
    savedNotes.forEach(function (note) {
        addNote(note.name, note.text, false);
    });
 
    
    guestbookForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        const name = guestName.value.trim();
        const textValue = guestMessage.value.trim();
 
        if (!name || !textValue) {
            guestbookStatus.textContent =
                "Please fill in both fields, little dreamer.";
            return;
        }
 
        addNote(name, textValue, false);
 
        savedNotes.push({ name: name, text: textValue });
        savedNotes = savedNotes.slice(-MAX_SAVED_NOTES);
        safeSet("pipNotes", JSON.stringify(savedNotes));
 
        guestbookStatus.textContent =
            "Your little note reached Pip! ✨";
 
        guestbookForm.reset();
    });
}
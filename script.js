
/* ========================================
   1. DREAM BUTTON INTERACTION
======================================== */

const dreamButton = document.getElementById("dreamButton");
const message = document.getElementById("message");

if (dreamButton && message) {
    dreamButton.addEventListener("click", function () {
        message.textContent =
            "✨ Pip delivered a tiny dream just for you! 🌙";
    });
}


/* ========================================
   2. PIP'S ORIGIN STORY
======================================== */

const storyScenes = [
    {
        icon: "🌧️",
        title: "The Sleepless Night",
        text: "Once upon a midnight, Pip noticed that the little stars couldn't help everyone sleep. Something magical was missing."
    },
    {
        icon: "💡",
        title: "A Little Spark",
        text: "Pip built a tiny dream lantern, mixed it with gentle lullabies, and discovered that even the smallest light could bring comfort."
    },
    {
        icon: "🌙",
        title: "The Dream Engineer",
        text: "And so Pip joined the Midnight Nursery, delivering cozy dreams, designing nightlights, and helping sleepy minds find their happy place."
    }
];

let currentScene = 0;

const storyIcon = document.getElementById("storyIcon");
const storyStep = document.getElementById("storyStep");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyButton = document.getElementById("storyButton");

if (
    storyIcon &&
    storyStep &&
    storyTitle &&
    storyText &&
    storyButton
) {
    storyButton.addEventListener("click", function () {
        currentScene = (currentScene + 1) % storyScenes.length;

        const scene = storyScenes[currentScene];

        storyIcon.textContent = scene.icon;
        storyStep.textContent =
            `Chapter ${currentScene + 1} of ${storyScenes.length}`;
        storyTitle.textContent = scene.title;
        storyText.textContent = scene.text;

        storyButton.textContent =
            currentScene === storyScenes.length - 1
                ? "Read the story again ↻"
                : "Discover what happened →";
    });
}


/* ========================================
   3. HIDDEN EASTER EGG
======================================== */

const secretTitle = document.getElementById("secretTitle");
const secretMessage = document.getElementById("secretMessage");

let titleClicks = 0;

if (secretTitle && secretMessage) {
    function unlockSecret() {
        titleClicks++;

        if (titleClicks >= 5) {
            secretMessage.hidden = false;
            secretMessage.textContent =
                "🌟 SECRET UNLOCKED: Pip says you're made of stardust and excellent dreams! 🌙";

            secretTitle.setAttribute("aria-label", "Secret unlocked!");
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
   4. INTERACTIVE DREAM CONSTELLATION
======================================== */

const dreamStars = document.querySelectorAll(".dream-star");
const starMessage = document.getElementById("starMessage");

if (starMessage) {
    dreamStars.forEach(function (star) {
        star.addEventListener("click", function () {
            starMessage.textContent = star.dataset.message ||
                "✨ A little mystery from the Midnight Nursery!";
        });
    });
}


/* ========================================
   5. DREAM GUESTBOOK
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
    guestbookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = guestName.value.trim();
        const textValue = guestMessage.value.trim();

        if (!name || !textValue) {
            guestbookStatus.textContent =
                "Please fill in both fields, little dreamer.";
            return;
        }

        const note = document.createElement("article");
        note.className = "guest-note";

        const title = document.createElement("h3");
        title.textContent = "💌 From " + name;

        const text = document.createElement("p");
        text.textContent = textValue;

        note.append(title, text);
        guestbookEntries.prepend(note);

        guestbookStatus.textContent =
            "Your little note reached Pip! ✨";

        guestbookForm.reset();
    });
}


/* 1. Dream button interaction */

const dreamButton = document.getElementById("dreamButton");
const message = document.getElementById("message");

dreamButton.addEventListener("click", function () {
    message.textContent = "✨ Pip delivered a tiny dream just for you! 🌙";
});


/* 2. Pip's origin story */

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

storyButton.addEventListener("click", function () {
    currentScene++;

    if (currentScene >= storyScenes.length) {
        currentScene = 0;
    }

    const scene = storyScenes[currentScene];

    storyIcon.textContent = scene.icon;
    storyStep.textContent = `Chapter ${currentScene + 1} of 3`;
    storyTitle.textContent = scene.title;
    storyText.textContent = scene.text;

    if (currentScene === storyScenes.length - 1) {
        storyButton.textContent = "Read the story again ↻";
    } else {
        storyButton.textContent = "Discover what happened →";
    }
});


/* 3. Hidden Easter egg */

const secretTitle = document.getElementById("secretTitle");
const secretMessage = document.getElementById("secretMessage");

let titleClicks = 0;

secretTitle.addEventListener("click", function () {
    titleClicks++;

    if (titleClicks === 5) {
        secretMessage.hidden = false;
        secretMessage.textContent =
            "🌟 SECRET UNLOCKED: Pip says you're made of stardust and excellent dreams! 🌙";

        secretTitle.textContent = "You found Pip's secret! ✨";
    }
});


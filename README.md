# 🌙 Pip's Midnight Observatory

A cozy, 1999-style website for **Pip, the Skull Baby**: a sleepy Junior Dream Engineer at the Midnight Nursery who turns sleepy thoughts into dreams, lullabies and nightlights.

Built solo for the **haX.baby "Baby's First Website" hackathon** (17-19 October 2026), **Track 1: Pip, The Skull Baby**.

**Live site:** https://ronakrai0829-create.github.io/pips-midnight-observatory/
<!-- Update the link above if your GitHub Pages address is different -->

<!-- Add a screenshot here, for example: ![Pip's Midnight Observatory](docs/screenshot.png) -->

## The three questions

| Question | Where to find it |
|---|---|
| **What is Pip?** | The hero and "Hey, I'm Pip!" section: a sleepy baby Dream Engineer with a night-shift personality |
| **What does Pip do?** | **Pip's Dream Workshop**: Lullaby Lab, Nightlight Constellations and Dream Delivery, three working inventions |
| **What is Pip's story?** | **How Pip Became a Dream Engineer**: a 3-chapter interactive story, one glowing clue per chapter |

## Features

**Interactive toys**
- 🎵 **Lullaby Lab:** a 5-key music box built with the Web Audio API (no audio files). Play the keys left to right for a surprise.
- 🌙 **Nightlight + Pip's Lantern:** turns the page to night. On computers, the cursor becomes a lantern that reveals five hidden fireflies to catch.
- 📬 **Dream Delivery:** an animated rooftop route. Pip's envelope flies along an SVG path to a random house and lights its window.
- ⭐ **Dream Constellation:** five tappable stars, each with its own note and message. Find them all to draw the constellation.
- 💌 **Guestbook:** saved in the visitor's own browser.

**Early-web soul**
- Scrolling ticker, blinking "NEW!" badge, ridge borders, pixel fonts, a star cursor
- Sparkle cursor trail
- Retro visit counter (counts per browser)
- 88x31-style badges that tilt on hover, slightly crooked panels, wiggling icons

**Details**
- Click sounds on every button, with a mute toggle that remembers your choice
- A greeting that changes with the time of day
- Fully responsive (tested at phone, tablet and desktop widths)
- Respects `prefers-reduced-motion`, keyboard accessible, visible focus rings, skip link

## Hidden secrets 🤫

There are two Easter eggs, plus a few small surprises:
1. Poke the big title five times.
2. Try the classic arrow-key cheat code (↑ ↑ ↓ ↓ ← → ← → B A).
3. Finish the constellation and check the footer.

## Built with

Plain **HTML, CSS and JavaScript**. No frameworks and no build step. Fonts: VT323 (Google Fonts). Sounds are generated live with the Web Audio API.

## Run it locally

```bash
git clone https://github.com/ronakrai0829-create/pips-midnight-observatory.git
cd pips-midnight-observatory
# open index.html in your browser, or use VS Code's Live Server
```

## Credits

- Pip character and avatar art: official haX.baby asset pack
- Everything else (code, copy, sounds, layout): made during the 48-hour sprint

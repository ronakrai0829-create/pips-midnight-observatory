# Pip's Midnight Observatory 🌙

A character portfolio website for **haX.baby: Baby's First Website**.

Pip is a gentle, sleepy baby Dream Engineer who lives in the Midnight Nursery
and turns sleepy thoughts into magical dreams.

**🔗 Live site:** https://ronakrai0829-create.github.io/pips-midnight-observatory/

<!-- Add a screenshot: put an image in the images/ folder, then uncomment the line below -->
<!-- ![Pip's Midnight Observatory](images/screenshot.png) -->

## About Pip

Pip is a Junior Dream Engineer at the Midnight Nursery. Pip builds tiny
inventions that help sleepy minds find their happy place. This site is Pip's
little corner of the early web: pastel colors, a scrolling ticker, a hit
counter, and a few secrets.

## What's inside

- **Meet Pip:** character intro and a button that delivers a random dream
- **Origin story:** three chapters. Find the glowing object in each one to keep reading
- **Dream Workshop:** three projects that actually work
  - 🎵 **Lullaby Lab:** a five-key music box (try the keys left to right)
  - 🌙 **Nightlight Constellations:** turns the whole site into night
  - 📬 **Dream Delivery:** delivers a random dream
- **Dream Constellation:** five stars with notes and messages. Find them all to complete the constellation
- **Guestbook:** leave Pip a note. Notes are saved in your browser
- **One hidden Easter egg:** a hint is in the footer

## Early-web touches

- Scrolling ticker and blinking "NEW!" badge
- Visit counter (counts your own visits in this browser)
- 88×31-style badges and an "under construction" footer
- Beveled buttons, ridge borders, pixel headings and a star cursor
- Sparkle trail that follows your mouse (desktop only)
- Click sounds with a mute button, generated with the Web Audio API (no audio files)

## Built with

- HTML
- CSS
- Vanilla JavaScript (no frameworks, no backend)
- Hosted on GitHub Pages

## Accessibility and mobile

- Responsive layout for phone and desktop
- Keyboard-friendly, including the Easter egg
- Skip link, labeled star buttons and live regions for messages
- Respects `prefers-reduced-motion`: the ticker, sparkles, confetti and animations switch off

## Run it locally

1. Download or clone this repo
2. Open `index.html` in your browser

```bash
git clone https://github.com/ronakrai0829-create/pips-midnight-observatory.git
cd pips-midnight-observatory
```

## Project structure

```
index.html   page structure
style.css    all styling
script.js    all interactions
images/      Pip's artwork
```

## Notes

- Guestbook notes and the visit counter use `localStorage`, so each visitor only sees their own.
- The two starter guestbook notes are from made-up characters.

Made with ♥ for haX.baby, by Ronak.

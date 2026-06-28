# ONYX Wellness & Wealth — Website

A Vite + React website for Sammi Q's integrated tax, insurance, and wellness advisory practice.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Project Structure

```
onyx-website/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Root: routing + modal state
│   ├── index.css         # Global CSS variables & reset
│   ├── data/
│   │   └── content.js    # ← ALL site content lives here
│   └── components/
│       ├── Nav.jsx / .module.css
│       ├── HomePage.jsx / .module.css
│       ├── ServicePage.jsx / .module.css
│       ├── ContactPage.jsx / .module.css
│       ├── VideoModal.jsx / .module.css
│       └── WatchButton.jsx / .module.css
```

---

## How to Add YouTube Videos

When your YouTube videos are ready:

1. Open `src/data/content.js`
2. Find the `servicePages` object
3. For each service, locate the `video` field and paste the YouTube video ID:

```js
video: {
  ey: 'Tax Planning · 筹税规划',
  title: 'How to Stop Overpaying Taxes',
  sub: '...',
  youtubeId: 'dQw4w9WgXcQ',  // ← paste your YouTube video ID here
},
```

The YouTube ID is the string after `?v=` in a YouTube URL.  
Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

The video player will activate automatically — no other code changes needed.

---

## How to Update Content

All text, credentials, and service details are in **`src/data/content.js`**.  
You can update:
- Advisor name, email, credentials
- Persona descriptions
- Service page copy and client quotes
- Contact form options

---

## How to Update Contact Info

In `src/data/content.js`, find the `advisor` object at the top:

```js
export const advisor = {
  name: 'Sammi Q',
  role: 'EA · Licensed Insurance Agent · NMNA Nutritionist',
  email: 'contact@onyxww.net',   // ← update here
  ...
}
```

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

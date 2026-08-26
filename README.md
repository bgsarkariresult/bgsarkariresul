# BG Sarkari Result

**Latest Government Jobs, Results, Admit Cards & Answer Keys**

A clean, fast, mobile-first static website designed for **GitHub Pages**. Compatible with the Full Automation Bot.

## Features

- 📱 Fully responsive (Mobile-first)
- 🌙 Dark / Light mode (saved in localStorage)
- 🔎 Live search filter
- 🟢 New & Latest badges
- 📋 Separate pages: Jobs | Results | Admit Card | Answer Key | Syllabus
- ⚡ Zero external libraries – super fast loading
- 🔍 SEO friendly structure
- 🏠 Sticky header + clean navigation
- 🤖 Works with Automation Bot (`jobs/` folder + `data/jobs.json`)

## Folder Structure

```
bg-sarkari-result/
├── index.html
├── jobs.html
├── results.html
├── admit-card.html
├── answer-key.html
├── syllabus.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── jobs/                 # Bot will create individual pages here
├── data/
│   └── jobs.json         # Bot updates this
├── images/               # Optional
├── sitemap.xml
├── robots.txt
├── .nojekyll
└── README.md
```

## How to Deploy on GitHub Pages

1. Create a new repository (e.g. `bgsarkari-jobs`).
2. Upload **all files** from this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Source**, select `Deploy from a branch`.
5. Choose branch `main` and folder `/ (root)`.
6. Click **Save**.
7. Your site will be live at:  
   `https://yourusername.github.io/bgsarkari-jobs/`

## Automation Bot Setup

1. Put the `full_automation_bot.py` in a separate folder (with `.env`).
2. Set these in `.env`:
   ```
   GITHUB_TOKEN=your_github_token
   GITHUB_REPO=yourusername/bgsarkari-jobs
   SITE_BASE_URL=https://yourusername.github.io/bgsarkari-jobs
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```
3. Run the bot → it will create SEO-friendly pages inside `jobs/` folder and update `data/jobs.json` + `sitemap.xml`.

## Customization

- Replace demo links with real notification URLs.
- Update the `canonical` URL and `SITE_BASE_URL`.
- Change logo text or add a favicon.
- Add more cards by copying the existing `.card` structure.

## License

Free to use for personal and educational purposes.

---

Made with ❤️ for Sarkari Naukri aspirants.

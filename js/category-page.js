/* ==========================================================================
   category-page.js
   jobs.html, results.html, admit-card.html, answer-key.html — in char
   pages par lagayein. Yeh file khud file-name dekhkar samajh jaati hai
   ki kaun se category ka data dikhana hai, aur data/jobs.json se
   fetch karke us page ki ".grid" ko dynamically bhar deti hai.

   Kaise use karein:
   1. Is file ko repo me  js/category-page.js  path par upload karein.
   2. In CHAARO files me  </body>  se pehle yeh line add karein
      (jahan <script src="js/script.js"></script> hai, uske baad):
        <script src="js/category-page.js"></script>
      - jobs.html
      - results.html
      - admit-card.html
      - answer-key.html
   3. Bas! Bot jo bhi nayi job/result/admit-card/answer-key publish
      karega, woh sahi page par apne aap dikhne lagegi.

   Note: index.html alag hai — uske liye home-data.js pehle se hai.
   Yeh file index.html par kuch nahi karti (chup chaap ruk jaati hai).
   ========================================================================== */

(function () {
  "use strict";

  // File name ke hisaab se, kaun si category dikhani hai
  const PAGE_CATEGORY_MAP = {
    "jobs.html": "Latest Jobs",
    "results.html": "Result",
    "admit-card.html": "Admit Card",
    "answer-key.html": "Answer Key",
  };

  function currentCategory() {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf("/") + 1) || "";
    return PAGE_CATEGORY_MAP[file] || null;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDateLabel(job) {
    switch (job.category) {
      case "Result":
        return `📅 Released: ${escapeHtml(job.post_date)}`;
      case "Admit Card":
        return `📅 Available from: ${escapeHtml(job.post_date)}`;
      case "Answer Key":
        return `📅 Released: ${escapeHtml(job.post_date)}`;
      default:
        return `📅 ${escapeHtml(job.post_date)}`;
    }
  }

  function buildCard(job, index) {
    const url = escapeHtml(job.page_url || "#");
    const title = escapeHtml(job.title || "Untitled");

    let badgeHtml = "";
    if (index === 0) {
      badgeHtml = `<div class="badges"><span class="badge badge-new">New</span></div>`;
    } else if (index === 1) {
      badgeHtml = `<div class="badges"><span class="badge badge-latest">Latest</span></div>`;
    }

    const dateLabel = formatDateLabel(job);
    const lastDateHtml =
      job.category === "Latest Jobs" && job.last_date
        ? `<span>⏰ Last Date: ${escapeHtml(job.last_date)}</span>`
        : "";

    const vacanciesLine =
      job.vacancies && job.category === "Latest Jobs"
        ? `<li>👥 Vacancies: ${escapeHtml(job.vacancies)}</li>`
        : "";

    const qualificationLine = job.qualification
      ? `<li>🎓 Qualification: ${escapeHtml(job.qualification)}</li>`
      : "";

    return `
      <article class="card">
        ${badgeHtml}
        <h2><a href="${url}">${title}</a></h2>
        <div class="meta">
          <span>${dateLabel}</span>
          ${lastDateHtml}
        </div>
        <ul>
          <li><a href="${url}">View Full Details</a></li>
          ${vacanciesLine}
          ${qualificationLine}
        </ul>
      </article>
    `;
  }

  async function initCategoryPage() {
    const category = currentCategory();
    if (!category) return; // Yeh page category page nahi hai, kuch mat karo

    try {
      const res = await fetch("data/jobs.json", { cache: "no-store" });
      if (!res.ok) throw new Error("jobs.json fetch failed: " + res.status);

      const allJobs = await res.json();
      if (!Array.isArray(allJobs)) return;

      const filtered = allJobs.filter((j) => j.category === category);
      if (!filtered.length) return; // Data nahi mila, purana static content rehne do

      filtered.sort((a, b) => (b.post_date || "").localeCompare(a.post_date || ""));

      const grid = document.querySelector("main.container .grid");
      if (!grid) return;

      grid.innerHTML = filtered.map((job, i) => buildCard(job, i)).join("");
    } catch (err) {
      console.error("category-page.js error:", err);
      // Fail hone par purana static content jaisa ka taisa reh jayega
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCategoryPage);
  } else {
    initCategoryPage();
  }
})();

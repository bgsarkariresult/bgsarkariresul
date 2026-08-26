/* ==========================================================================
   home-data.js
   data/jobs.json ko fetch karke homepage (index.html) ke 4 sections
   (Jobs, Results, Admit Card, Answer Key) ko dynamically update karta hai.

   Kaise use karein:
   1. Is file ko repo me  js/home-data.js  path par upload karein.
   2. index.html me, </body> se pehle yeh line add karein:
        <script src="js/home-data.js"></script>
      (script.js ke baad ya pehle, dono chalega)
   3. Bas! Ab har naya job/result/admit-card automatically homepage par
      dikhega, kyunki yeh seedha data/jobs.json se padhta hai.
   ========================================================================== */

(function () {
  "use strict";

  // jobs.json me jo "category" value bot save karta hai,
  // usko homepage ke section id se map kar rahe hain.
  const CATEGORY_MAP = {
    "Latest Jobs": { sectionId: "jobs", maxCards: 4 },
    "Result": { sectionId: "results", maxCards: 3 },
    "Admit Card": { sectionId: "admit", maxCards: 2 },
    "Answer Key": { sectionId: "answer", maxCards: 2 },
  };

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDateLabel(job) {
    // Category ke hisaab se sahi label dikhate hain (bot ke style jaisa)
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

    // Pehla card = New badge, dusra = Latest badge, baaki koi badge nahi
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
        </ul>
      </article>
    `;
  }

  function renderSection(sectionId, jobsForSection, maxCards) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const grid = section.querySelector(".grid");
    const countEl = section.querySelector(".section-header .count");

    if (!grid) return;

    if (!jobsForSection.length) {
      // Koi data nahi mila to purane static cards ko chhed nahi rahe,
      // taaki page bilkul khaali na dikhe.
      return;
    }

    if (countEl) {
      countEl.textContent = jobsForSection.length;
    }

    const cardsHtml = jobsForSection
      .slice(0, maxCards)
      .map((job, i) => buildCard(job, i))
      .join("");

    grid.innerHTML = cardsHtml;
  }

  async function initHomeData() {
    try {
      const res = await fetch("data/jobs.json", { cache: "no-store" });
      if (!res.ok) throw new Error("jobs.json fetch failed: " + res.status);

      const allJobs = await res.json();
      if (!Array.isArray(allJobs)) return;

      // Sabse naye job upar rahein (post_date ke hisaab se sort)
      allJobs.sort((a, b) => (b.post_date || "").localeCompare(a.post_date || ""));

      // Category ke hisaab se group karo
      const grouped = {};
      allJobs.forEach((job) => {
        const cat = job.category || "Latest Jobs";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(job);
      });

      // Har section ko render karo
      Object.keys(CATEGORY_MAP).forEach((category) => {
        const { sectionId, maxCards } = CATEGORY_MAP[category];
        renderSection(sectionId, grouped[category] || [], maxCards);
      });
    } catch (err) {
      console.error("home-data.js error:", err);
      // Fail hone par purana static content jaisa ka taisa reh jayega
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeData);
  } else {
    initHomeData();
  }
})();

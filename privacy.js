
/* =========================================================
   VINTAGE ERA — PRIVACY POLICY JS
   Icons | Smooth Table of Contents Navigation
   Theme and RTL are managed by global.js
   ========================================================= */

"use strict";

/* =========================================================
   REFRESH LUCIDE ICONS
   ========================================================= */

function refreshPrivacyIcons() {
  if (
    window.lucide &&
    typeof window.lucide.createIcons === "function"
  ) {
    window.lucide.createIcons();
  }
}

/* =========================================================
   TABLE OF CONTENTS
   ========================================================= */

function initializePrivacyNavigation() {
  const links = document.querySelectorAll(".toc-nav a");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.getElementById(
        targetId.slice(1)
      );

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      /* Update the URL without triggering a second jump. */
      history.replaceState(null, "", targetId);
    });
  });
}

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  refreshPrivacyIcons();
  initializePrivacyNavigation();
});

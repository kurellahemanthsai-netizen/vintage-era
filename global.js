/* =========================================================
   VINTAGE ERA
   HEADER + FOOTER JAVASCRIPT

   DARK MODE + RTL PERSISTENT ACROSS ALL PAGES
   ========================================================= */


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshIcons() {

  if (typeof lucide !== "undefined") {

    lucide.createIcons();

  }

}


/* =========================================================
   DARK MODE
   ========================================================= */

const darkToggle = document.getElementById("darkToggle");


/* ---------------------------------------------------------
   UPDATE DARK MODE ICON
--------------------------------------------------------- */

function updateDarkIcon() {

  if (!darkToggle) {
    return;
  }

  const isDark =
    document.body.classList.contains("dark-mode");

  darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  darkToggle.setAttribute(
    "title",
    isDark ? "Light Mode" : "Dark Mode"
  );

  darkToggle.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

  refreshIcons();

}


/* ---------------------------------------------------------
   APPLY DARK MODE
--------------------------------------------------------- */

function applyDarkMode(isDark) {

  document.body.classList.toggle(
    "dark-mode",
    isDark
  );

  localStorage.setItem(
    "vintageera-dark-mode",
    isDark ? "true" : "false"
  );

  updateDarkIcon();

}


/* ---------------------------------------------------------
   DARK MODE TOGGLE
--------------------------------------------------------- */

darkToggle?.addEventListener("click", () => {

  const isDark =
    document.body.classList.contains("dark-mode");

  applyDarkMode(!isDark);

});


/* =========================================================
   RTL MODE
   ========================================================= */

const rtlToggle =
  document.getElementById("rtlToggle");


/* ---------------------------------------------------------
   UPDATE RTL STATE
--------------------------------------------------------- */

function updateRTLState() {

  if (!rtlToggle) {
    return;
  }

  const isRTL =
    document.body.classList.contains("rtl");

  rtlToggle.setAttribute(
    "title",
    isRTL ? "LTR Mode" : "RTL Mode"
  );

  rtlToggle.setAttribute(
    "aria-label",
    isRTL
      ? "Switch to left-to-right mode"
      : "Switch to right-to-left mode"
  );

  rtlToggle.setAttribute(
    "aria-pressed",
    isRTL ? "true" : "false"
  );

}


/* ---------------------------------------------------------
   APPLY RTL MODE
--------------------------------------------------------- */

function applyRTL(isRTL) {

  /* BODY */

  document.body.classList.toggle(
    "rtl",
    isRTL
  );

  document.body.setAttribute(
    "dir",
    isRTL ? "rtl" : "ltr"
  );


  /* HTML */

  document.documentElement.setAttribute(
    "dir",
    isRTL ? "rtl" : "ltr"
  );

  document.documentElement.setAttribute(
    "lang",
    isRTL ? "ar" : "en"
  );


  /* SAVE STATE */

  localStorage.setItem(
    "vintageera-rtl-mode",
    isRTL ? "true" : "false"
  );

  updateRTLState();

}


/* ---------------------------------------------------------
   RTL TOGGLE
--------------------------------------------------------- */

rtlToggle?.addEventListener("click", () => {

  const isRTL =
    document.body.classList.contains("rtl");

  applyRTL(!isRTL);

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navbar =
  document.querySelector(".navbar");


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

  if (!navbar || !menuToggle) {
    return;
  }

  navbar.classList.remove("active");

  menuToggle.innerHTML =
    '<i data-lucide="menu"></i>';

  menuToggle.setAttribute(
    "aria-label",
    "Open menu"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  refreshIcons();

}


/* =========================================================
   MOBILE MENU TOGGLE
   ========================================================= */

menuToggle?.addEventListener("click", () => {

  if (!navbar) {
    return;
  }

  navbar.classList.toggle("active");

  const isOpen =
    navbar.classList.contains("active");

  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu"></i>';

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  refreshIcons();

});


/* =========================================================
   MOBILE HOME DROPDOWN
   ========================================================= */

const homeDropdown =
  document.querySelector(".dropdown");

if (homeDropdown) {

  const homeLink =
    homeDropdown.querySelector(":scope > a");

  homeLink?.addEventListener(
    "click",
    (event) => {

      if (window.innerWidth <= 1024) {

        event.preventDefault();

        homeDropdown.classList.toggle(
          "active"
        );

      }

    }
  );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER LINK CLICK
   ========================================================= */

document
  .querySelectorAll(".navbar a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 1024) {

        const isHomeLink =
          link.closest(".dropdown") &&
          link.parentElement.classList.contains(
            "dropdown"
          );

        if (!isHomeLink) {

          closeMobileMenu();

        }

      }

    });

  });


/* =========================================================
   CLOSE MENU ON DESKTOP RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

  if (window.innerWidth > 1024) {

    closeMobileMenu();

  }

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

const topButton =
  document.querySelector(".top-btn");

topButton?.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }
);

/* =========================================================
   ACTIVE NAVIGATION LINKS
   MAIN PAGES + DETAILING PAGES + HOME DROPDOWN
   ========================================================= */

function setActiveNavLink() {
  const currentPage = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  const mainLinks = document.querySelectorAll(
    ".nav-links > li > a"
  );

  const dropdownLinks = document.querySelectorAll(
    ".dropdown-menu a"
  );

  /* Clear previous active states */
  [...mainLinks, ...dropdownLinks].forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  /* Map detailing pages to their parent navigation pages */
  const parentPageMap = {
    "service-d.html": "services.html",
    "blog-d.html": "blog.html"
  };

  const parentPage = parentPageMap[currentPage] || currentPage;

  /* Find the matching dropdown link */
  let activeDropdownLink = null;

  dropdownLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

    if (linkPage === currentPage) {
      activeDropdownLink = link;
    }
  });

  /* Highlight main navigation links */
  mainLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

    const isHomeParent =
      link.parentElement.classList.contains("dropdown") &&
      ["index.html", "home2.html"].includes(currentPage);

    const isDirectMatch = linkPage === parentPage;

    if (isHomeParent || isDirectMatch) {
      link.classList.add("active");

      if (isDirectMatch) {
        link.setAttribute("aria-current", "page");
      }
    }
  });

  /* Highlight the matching Home dropdown item */
  if (activeDropdownLink) {
    activeDropdownLink.classList.add("active");
    activeDropdownLink.setAttribute("aria-current", "page");
  } else if (["index.html", "home2.html"].includes(currentPage)) {
    dropdownLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }
}

/* Initialize active navigation */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setActiveNavLink);
} else {
  setActiveNavLink();
}




/* =========================================================
   INITIALIZE EVERYTHING
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* -----------------------------------------------------
       LUCIDE
    ----------------------------------------------------- */

    refreshIcons();


    /* =====================================================
       RESTORE DARK MODE
    ===================================================== */

    const savedDarkMode =
      localStorage.getItem(
        "vintageera-dark-mode"
      ) === "true";

    document.body.classList.toggle(
      "dark-mode",
      savedDarkMode
    );


    /* =====================================================
       RESTORE RTL MODE
    ===================================================== */

    const savedRTL =
      localStorage.getItem(
        "vintageera-rtl-mode"
      ) === "true";

    document.body.classList.toggle(
      "rtl",
      savedRTL
    );


    /* =====================================================
       APPLY BODY DIRECTION
    ===================================================== */

    document.body.setAttribute(
      "dir",
      savedRTL ? "rtl" : "ltr"
    );


    /* =====================================================
       APPLY HTML DIRECTION
    ===================================================== */

    document.documentElement.setAttribute(
      "dir",
      savedRTL ? "rtl" : "ltr"
    );


    /* =====================================================
       APPLY LANGUAGE
    ===================================================== */

    document.documentElement.setAttribute(
      "lang",
      savedRTL ? "ar" : "en"
    );


    /* =====================================================
       UPDATE BUTTON STATES
    ===================================================== */

    updateDarkIcon();

    updateRTLState();

  }
);
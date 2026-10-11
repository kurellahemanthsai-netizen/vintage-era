
/* =========================================================
   VINTAGE ERA — COMING SOON COUNTDOWN
   Live Countdown | Global Theme/RTL Compatibility
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /*
   * CHANGE YOUR LAUNCH DATE HERE.
   * Format: YYYY-MM-DDTHH:MM:SS+05:30
   * Current target: December 1, 2026, at midnight IST.
   */
  const launchDate = new Date("2026-12-01T00:00:00+05:30");

  const daysElement = document.getElementById("veDays");
  const hoursElement = document.getElementById("veHours");
  const minutesElement = document.getElementById("veMinutes");
  const secondsElement = document.getElementById("veSeconds");

  const countdownElement = document.getElementById("veCountdown");
  const launchNote = document.getElementById("veLaunchNote");

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement ||
    !countdownElement ||
    !launchNote
  ) {
    return;
  }

  let countdownInterval = null;

  const padNumber = (number) => String(number).padStart(2, "0");

  function updateCountdown() {
    const now = Date.now();
    const remaining = launchDate.getTime() - now;

    if (!Number.isFinite(launchDate.getTime())) {
      clearInterval(countdownInterval);

      launchNote.textContent = "Please configure a valid launch date.";
      countdownElement.hidden = true;

      return;
    }

    if (remaining <= 0) {
      clearInterval(countdownInterval);

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      launchNote.textContent =
        "Our planned launch time has arrived. Stay tuned for the unveiling.";

      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = padNumber(days);
    hoursElement.textContent = padNumber(hours);
    minutesElement.textContent = padNumber(minutes);
    secondsElement.textContent = padNumber(seconds);
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  /* Refresh Lucide icons if the library is available. */
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});

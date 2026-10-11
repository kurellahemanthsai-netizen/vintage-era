
/* =========================================================
   VINTAGE ERA — BOOKING FORM
   FORM VALIDATION + BOOKING DATE
   Theme and RTL are managed by global.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const veViewingForm = document.getElementById("veViewingForm");
  const veBookingDate = document.getElementById("veBookingDate");
  const veFormFeedback = document.getElementById("veFormFeedback");


  /* =======================================================
     LUCIDE ICONS
     ======================================================= */

  function refreshLucideIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }


  /* =======================================================
     BOOKING DATE — PREVENT PAST DATES
     ======================================================= */

  function getLocalDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (veBookingDate) {
    veBookingDate.min = getLocalDate();
  }


  /* =======================================================
     FORM VALIDATION
     ======================================================= */

  if (veViewingForm) {

    const requiredFields = [
      {
        id: "veFullName",
        message: "Please enter your full name."
      },
      {
        id: "vePhone",
        message: "Please enter a valid phone number."
      },
      {
        id: "veEmail",
        message: "Please enter a valid email address."
      },
      {
        id: "veVisitors",
        message: "Please select the number of visitors."
      },
      {
        id: "veBookingDate",
        message: "Please select today or a future date."
      },
      {
        id: "veBookingTime",
        message: "Please select your preferred time."
      },
      {
        id: "veInterest",
        message: "Please select your area of interest."
      }
    ];


    function clearFieldError(field) {
      const wrapper = field.closest(".ve-form-field");
      const error = document.getElementById(field.id + "Error");

      if (wrapper) {
        wrapper.classList.remove("has-error");
      }

      if (error) {
        error.textContent = "";
      }

      field.removeAttribute("aria-invalid");
    }


    function showFieldError(field, message) {
      const wrapper = field.closest(".ve-form-field");
      const error = document.getElementById(field.id + "Error");

      if (wrapper) {
        wrapper.classList.add("has-error");
      }

      if (error) {
        error.textContent = message;
      }

      field.setAttribute("aria-invalid", "true");
    }


    function validateField(field, message) {
      clearFieldError(field);

      const value = field.value.trim();

      if (!value) {
        showFieldError(field, message);
        return false;
      }

      /* Full name */
      if (field.id === "veFullName" && value.length < 2) {
        showFieldError(
          field,
          "Please enter at least two characters."
        );
        return false;
      }

      /* Email */
      if (field.id === "veEmail") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
          showFieldError(
            field,
            "Please enter a valid email address."
          );
          return false;
        }
      }

      /* Phone */
      if (field.id === "vePhone") {
        const phoneDigits = value.replace(/\D/g, "");

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
          showFieldError(
            field,
            "Please enter a valid phone number."
          );
          return false;
        }
      }

      /* Booking date */
      if (field.id === "veBookingDate") {
        if (value < getLocalDate()) {
          showFieldError(
            field,
            "Please choose today or a future date."
          );
          return false;
        }
      }

      return true;
    }


    /* Clear errors when the user edits a field */

    requiredFields.forEach(function (item) {
      const field = document.getElementById(item.id);

      if (!field) return;

      field.addEventListener("input", function () {
        clearFieldError(field);
      });

      field.addEventListener("change", function () {
        clearFieldError(field);
      });
    });


    /* =====================================================
       SUBMIT BOOKING FORM
       ===================================================== */

    veViewingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (veFormFeedback) {
        veFormFeedback.hidden = true;
        veFormFeedback.className = "ve-form-feedback";
        veFormFeedback.textContent = "";
      }

      let isValid = true;
      let firstInvalidField = null;

      requiredFields.forEach(function (item) {
        const field = document.getElementById(item.id);

        if (!field) return;

        const fieldIsValid = validateField(field, item.message);

        if (!fieldIsValid) {
          isValid = false;

          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        }
      });

      /* Invalid form */

      if (!isValid) {
        if (veFormFeedback) {
          veFormFeedback.textContent =
            "Please review the highlighted fields and try again.";

          veFormFeedback.classList.add("is-error");
          veFormFeedback.hidden = false;
        }

        if (firstInvalidField) {
          firstInvalidField.focus();
        }

        return;
      }

      /* Valid form — frontend only */

      if (veFormFeedback) {
        veFormFeedback.textContent =
          "Your details are valid, but the booking service is not connected yet. Your appointment request has not been sent.";

        veFormFeedback.classList.add("is-notice");
        veFormFeedback.hidden = false;

        veFormFeedback.scrollIntoView({
          behavior: "auto",
          block: "nearest"
        });
      }
    });
  }


  /* =======================================================
     INITIALIZE ICONS
     ======================================================= */

  refreshLucideIcons();

});

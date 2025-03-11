document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("lang-toggle");
  let currentLang = localStorage.getItem("lang") || "en"; // Default to English

  // Function to update text based on selected language
  function updateLanguageText() {
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (translations[currentLang][key]) {
        el.textContent = translations[currentLang][key];
      }
    });

    langToggle.textContent = currentLang.toUpperCase(); // Update button text
    // Add language class to body
    document.body.classList.remove("lang-en", "lang-ml");
    document.body.classList.add("lang-" + currentLang);
  }

  // Function to change language and store in localStorage
  function changeLanguage() {
    currentLang = currentLang === "en" ? "ml" : "en"; // Toggle Language
    localStorage.setItem("lang", currentLang); // Store in localStorage
    updateLanguageText(); // Update UI
  }

  // Initialize language on page load
  updateLanguageText();

  // Event listener for language toggle
  langToggle.addEventListener("click", changeLanguage);
});

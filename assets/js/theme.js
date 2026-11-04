/**
 * ZAFFRAN ROYAL BIRYANI - THEME & RTL MANAGER
 * Manages Dark Mode & RTL direction with localStorage persistence.
 */

(function () {
  const THEME_KEY = 'zaffran_theme';
  const RTL_KEY = 'zaffran_rtl';

  // Apply saved theme immediately to prevent flash of unstyled content
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedRTL = localStorage.getItem(RTL_KEY) === 'true';

    applyTheme(savedTheme);
    applyRTL(savedRTL);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggles if DOM is ready
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });

    // Update logo versions
    const logos = document.querySelectorAll('.brand-logo-img');
    logos.forEach(img => {
      img.src = theme === 'dark' ? 'assets/images/icons/logo-light.svg' : 'assets/images/icons/logo.svg';
    });
  }

  function applyRTL(isRTL) {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRTL ? 'ar' : 'en');
    localStorage.setItem(RTL_KEY, isRTL ? 'true' : 'false');

    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach(btn => {
      btn.innerHTML = isRTL ? '<span class="small fw-bold">LTR</span>' : '<span class="small fw-bold">RTL</span>';
      btn.setAttribute('title', isRTL ? 'Switch to Left to Right' : 'Switch to Right to Left');
    });
  }

  // Global toggle handlers
  window.toggleTheme = function () {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  window.toggleRTL = function () {
    const isRTL = localStorage.getItem(RTL_KEY) === 'true';
    applyRTL(!isRTL);
  };

  // Run immediately
  initTheme();

  // Document-level event delegation (works regardless of dynamic injection or DOM timing)
  document.addEventListener('click', function (e) {
    const themeBtn = e.target.closest('.theme-toggle-btn');
    if (themeBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleTheme();
      return;
    }

    const rtlBtn = e.target.closest('.rtl-toggle-btn');
    if (rtlBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleRTL();
      return;
    }
  });

  // Re-sync on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedRTL = localStorage.getItem(RTL_KEY) === 'true';
    applyTheme(savedTheme);
    applyRTL(savedRTL);
  });
})();

/**
 * Theme toggle system with localStorage persistence
 */

type Theme = "light_mode" | "dark_mode";

function getThemeIcon() {
  return document.querySelector<HTMLElement>("#theme-icon");
}

function getMobileThemeIcon() {
  return document.querySelector<HTMLElement>("#mobile-theme-icon");
}

function getChangeThemeBtn() {
  return document.querySelector<HTMLElement>(".change-theme");
}

function getMobileChangeThemeBtns() {
  return document.querySelectorAll<HTMLElement>(".mobile-change-theme");
}

function lightTheme() {
  const themeIcon = getThemeIcon();
  const mobileThemeIcon = getMobileThemeIcon();
  if (themeIcon) themeIcon.textContent = "light_mode";
  if (mobileThemeIcon) mobileThemeIcon.textContent = "light_mode";
  document.documentElement.setAttribute("theme", "light");
}

function darkTheme() {
  const themeIcon = getThemeIcon();
  const mobileThemeIcon = getMobileThemeIcon();
  if (themeIcon) themeIcon.textContent = "dark_mode";
  if (mobileThemeIcon) mobileThemeIcon.textContent = "dark_mode";
  document.documentElement.setAttribute("theme", "dark");
}

export function themeToggleHover() {
  const themeIcon = getThemeIcon();
  const mobileThemeIcon = getMobileThemeIcon();
  const theme = localStorage.getItem("theme") as Theme | null;
  if (theme === "dark_mode") {
    if (themeIcon) themeIcon.textContent = "light_mode";
    if (mobileThemeIcon) mobileThemeIcon.textContent = "light_mode";
  } else if (theme === "light_mode") {
    if (themeIcon) themeIcon.textContent = "dark_mode";
    if (mobileThemeIcon) mobileThemeIcon.textContent = "dark_mode";
  }
}

export function themeToggleLeave() {
  const themeIcon = getThemeIcon();
  const mobileThemeIcon = getMobileThemeIcon();
  const theme = localStorage.getItem("theme") as Theme | null;
  if (theme === "dark_mode") {
    if (themeIcon) themeIcon.textContent = "dark_mode";
    if (mobileThemeIcon) mobileThemeIcon.textContent = "dark_mode";
  } else if (theme === "light_mode") {
    if (themeIcon) themeIcon.textContent = "light_mode";
    if (mobileThemeIcon) mobileThemeIcon.textContent = "light_mode";
  }
}

export function themeToggle() {
  const changeThemeBtn = getChangeThemeBtn();
  const mobileChangeThemeBtn = getMobileChangeThemeBtns();
  const theme = localStorage.getItem("theme") as Theme | null;

  // Add animation class
  changeThemeBtn?.classList.add("theme-switching");
  mobileChangeThemeBtn.forEach((btn) => btn.classList.add("theme-switching"));

  // Remove animation class after one complete spin (600ms)
  setTimeout(() => {
    changeThemeBtn?.classList.remove("theme-switching");
    mobileChangeThemeBtn.forEach((btn) =>
      btn.classList.remove("theme-switching"),
    );
  }, 600);

  if (theme === "dark_mode") {
    localStorage.setItem("theme", "light_mode");
    lightTheme();
  } else {
    localStorage.setItem("theme", "dark_mode");
    darkTheme();
  }
}

// Initialize theme on load
function initializeTheme() {
  let currentTheme = localStorage.getItem("theme") as Theme | null;

  if (!currentTheme) {
    // Default to light mode (ignore system preference)
    localStorage.setItem("theme", "light_mode");
    lightTheme();
  } else {
    // Apply saved theme
    if (currentTheme === "light_mode") {
      lightTheme();
    } else {
      darkTheme();
    }
  }
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTheme);
} else {
  initializeTheme();
}

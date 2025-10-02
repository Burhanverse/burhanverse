/**
 * Theme toggle system with localStorage persistence
 */

const themeIcon = document.querySelector<HTMLElement>('#theme-icon');
const mobileThemeIcon = document.querySelector<HTMLElement>('#mobile-theme-icon');

type Theme = 'light_mode' | 'dark_mode';

function lightTheme() {
  if (themeIcon) themeIcon.innerHTML = '&#xe901;';
  if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe901;';
  document.documentElement.setAttribute('theme', 'light');
}

function darkTheme() {
  if (themeIcon) themeIcon.innerHTML = '&#xe908;';
  if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe908;';
  document.documentElement.setAttribute('theme', 'dark');
}

export function themeToggleHover() {
  const theme = localStorage.getItem('theme') as Theme | null;
  if (theme === 'dark_mode') {
    if (themeIcon) themeIcon.innerHTML = '&#xe909;';
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe909;';
  } else if (theme === 'light_mode') {
    if (themeIcon) themeIcon.innerHTML = '&#xe902;';
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe902;';
  }
}

export function themeToggleLeave() {
  const theme = localStorage.getItem('theme') as Theme | null;
  if (theme === 'dark_mode') {
    if (themeIcon) themeIcon.innerHTML = '&#xe908;';
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe908;';
  } else if (theme === 'light_mode') {
    if (themeIcon) themeIcon.innerHTML = '&#xe901;';
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = '&#xe901;';
  }
}

export function themeToggle() {
  const theme = localStorage.getItem('theme') as Theme | null;
  
  if (theme === 'dark_mode') {
    localStorage.setItem('theme', 'light_mode');
    lightTheme();
  } else {
    localStorage.setItem('theme', 'dark_mode');
    darkTheme();
  }
}

// Initialize theme on load
function initializeTheme() {
  let currentTheme = localStorage.getItem('theme') as Theme | null;

  if (!currentTheme) {
    // Detect system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      localStorage.setItem('theme', 'light_mode');
      lightTheme();
    } else {
      localStorage.setItem('theme', 'dark_mode');
      darkTheme();
    }
  } else {
    // Apply saved theme
    if (currentTheme === 'light_mode') {
      lightTheme();
    } else {
      darkTheme();
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}

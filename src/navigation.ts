/**
 * Navigation system for switching between pages
 */

// Page elements
const homeContent = document.querySelector<HTMLElement>('#home-page');
const reposContent = document.querySelector<HTMLElement>('#repos-page');
const infoContent = document.querySelector<HTMLElement>('#info-page');
const contactContent = document.querySelector<HTMLElement>('#contact-page');

// Navigation icons
const homeIcon = document.querySelector<HTMLElement>('#home-icon');
const mobileHomeIcon = document.querySelector<HTMLElement>('#mobile-home-icon');
const reposIcon = document.querySelector<HTMLElement>('#repos-icon');
const mobileReposIcon = document.querySelector<HTMLElement>('#mobile-repos-icon');
const infoIcon = document.querySelector<HTMLElement>('#info-icon');
const mobileInfoIcon = document.querySelector<HTMLElement>('#mobile-info-icon');
const contactIcon = document.querySelector<HTMLElement>('#contact-icon');
const mobileContactIcon = document.querySelector<HTMLElement>('#mobile-contact-icon');

// Font icons
const homeFontIcon = document.querySelector<HTMLElement>('#home-font-icon');
const mobileHomeFontIcon = document.querySelector<HTMLElement>('#mobile-home-font-icon');
const infoFontIcon = document.querySelector<HTMLElement>('#info-font-icon');
const mobileInfoFontIcon = document.querySelector<HTMLElement>('#mobile-info-font-icon');
const contactFontIcon = document.querySelector<HTMLElement>('#contact-font-icon');
const mobileContactFontIcon = document.querySelector<HTMLElement>('#mobile-contact-font-icon');

// Mobile nav
const mobileNavPanel = document.querySelector<HTMLElement>('.mobile-panel-wrapper');
const overlay = document.querySelector<HTMLElement>('.overlay');

type PageSection = 'home' | 'repos' | 'info' | 'contact';

function hideAllPages() {
  homeContent?.classList.add('hidden');
  homeContent?.classList.remove('visible');
  reposContent?.classList.add('hidden');
  reposContent?.classList.remove('visible');
  infoContent?.classList.add('hidden');
  infoContent?.classList.remove('visible');
  contactContent?.classList.add('hidden');
  contactContent?.classList.remove('visible');
}

function resetAllIcons() {
  homeIcon?.classList.remove('selected');
  mobileHomeIcon?.classList.remove('selected');
  reposIcon?.classList.remove('selected');
  mobileReposIcon?.classList.remove('selected');
  infoIcon?.classList.remove('selected');
  mobileInfoIcon?.classList.remove('selected');
  contactIcon?.classList.remove('selected');
  mobileContactIcon?.classList.remove('selected');

  if (homeFontIcon) homeFontIcon.innerHTML = '&#xe906;';
  if (mobileHomeFontIcon) mobileHomeFontIcon.innerHTML = '&#xe906;';
  if (infoFontIcon) infoFontIcon.innerHTML = '&#xe904;';
  if (mobileInfoFontIcon) mobileInfoFontIcon.innerHTML = '&#xe904;';
  if (contactFontIcon) contactFontIcon.innerHTML = '&#xe90a;';
  if (mobileContactFontIcon) mobileContactFontIcon.innerHTML = '&#xe90a;';
}

function closeNavPanel() {
  mobileNavPanel?.classList.remove('open');
  overlay?.classList.add('hidden');
}

function openNavPanel() {
  mobileNavPanel?.classList.add('open');
  overlay?.classList.remove('hidden');
}

export function homeSelected() {
  hideAllPages();
  resetAllIcons();
  homeContent?.classList.remove('hidden');
  homeContent?.classList.add('visible');
  homeIcon?.classList.add('selected');
  mobileHomeIcon?.classList.add('selected');
  if (homeFontIcon) homeFontIcon.innerHTML = '&#xe905;';
  if (mobileHomeFontIcon) mobileHomeFontIcon.innerHTML = '&#xe905;';
  localStorage.setItem('page-section', 'home');
  closeNavPanel();
}

export function reposSelected() {
  hideAllPages();
  resetAllIcons();
  reposContent?.classList.remove('hidden');
  reposContent?.classList.add('visible');
  reposIcon?.classList.add('selected');
  mobileReposIcon?.classList.add('selected');
  localStorage.setItem('page-section', 'repos');
  closeNavPanel();
}

export function infoSelected() {
  hideAllPages();
  resetAllIcons();
  infoContent?.classList.remove('hidden');
  infoContent?.classList.add('visible');
  infoIcon?.classList.add('selected');
  mobileInfoIcon?.classList.add('selected');
  if (infoFontIcon) infoFontIcon.innerHTML = '&#xe907;';
  if (mobileInfoFontIcon) mobileInfoFontIcon.innerHTML = '&#xe907;';
  localStorage.setItem('page-section', 'info');
  closeNavPanel();
}

export function contactSelected() {
  hideAllPages();
  resetAllIcons();
  contactContent?.classList.remove('hidden');
  contactContent?.classList.add('visible');
  contactIcon?.classList.add('selected');
  mobileContactIcon?.classList.add('selected');
  if (contactFontIcon) contactFontIcon.innerHTML = '&#xe90b;';
  if (mobileContactFontIcon) mobileContactFontIcon.innerHTML = '&#xe90b;';
  localStorage.setItem('page-section', 'contact');
  closeNavPanel();
}

// Initialize page based on localStorage
function initializePage() {
  const sectionOnLoad = localStorage.getItem('page-section') as PageSection | null;

  switch (sectionOnLoad) {
    case 'home':
      homeSelected();
      break;
    case 'repos':
      reposSelected();
      break;
    case 'info':
      infoSelected();
      break;
    case 'contact':
      contactSelected();
      break;
    default:
      homeSelected(); // Default to home
  }
}

// Export navigation functions for global access
export { closeNavPanel, openNavPanel };

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}

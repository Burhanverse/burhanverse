/**
 * Navigation system for switching between pages
 */

// Page elements
const homeContent = document.querySelector<HTMLElement>('#home-page');
const reposContent = document.querySelector<HTMLElement>('#repos-page');
const blogContent = document.querySelector<HTMLElement>('#blog-page');
const contactContent = document.querySelector<HTMLElement>('#contact-page');

// Navigation icons
const homeIcon = document.querySelector<HTMLElement>('#home-icon');
const mobileHomeIcon = document.querySelector<HTMLElement>('#mobile-home-icon');
const reposIcon = document.querySelector<HTMLElement>('#repos-icon');
const mobileReposIcon = document.querySelector<HTMLElement>('#mobile-repos-icon');
const blogIcon = document.querySelector<HTMLElement>('#blog-icon');
const mobileBlogIcon = document.querySelector<HTMLElement>('#mobile-blog-icon');
const contactIcon = document.querySelector<HTMLElement>('#contact-icon');
const mobileContactIcon = document.querySelector<HTMLElement>('#mobile-contact-icon');

// Font icons
const homeFontIcon = document.querySelector<HTMLElement>('#home-font-icon');
const mobileHomeFontIcon = document.querySelector<HTMLElement>('#mobile-home-font-icon');
const blogFontIcon = document.querySelector<HTMLElement>('#blog-font-icon');
const mobileBlogFontIcon = document.querySelector<HTMLElement>('#mobile-blog-font-icon');
const contactFontIcon = document.querySelector<HTMLElement>('#contact-font-icon');
const mobileContactFontIcon = document.querySelector<HTMLElement>('#mobile-contact-font-icon');

// Mobile nav
const mobileNavPanel = document.querySelector<HTMLElement>('.mobile-panel-wrapper');
const overlay = document.querySelector<HTMLElement>('.overlay');

type PageSection = 'home' | 'repos' | 'blog' | 'contact';

function hideAllPages() {
  homeContent?.classList.add('hidden');
  homeContent?.classList.remove('visible');
  reposContent?.classList.add('hidden');
  reposContent?.classList.remove('visible');
  blogContent?.classList.add('hidden');
  blogContent?.classList.remove('visible');
  contactContent?.classList.add('hidden');
  contactContent?.classList.remove('visible');
}

function resetAllIcons() {
  homeIcon?.classList.remove('selected');
  mobileHomeIcon?.classList.remove('selected');
  reposIcon?.classList.remove('selected');
  mobileReposIcon?.classList.remove('selected');
  blogIcon?.classList.remove('selected');
  mobileBlogIcon?.classList.remove('selected');
  contactIcon?.classList.remove('selected');
  mobileContactIcon?.classList.remove('selected');

  if (homeFontIcon) homeFontIcon.textContent = 'home';
  if (mobileHomeFontIcon) mobileHomeFontIcon.textContent = 'home';
  if (blogFontIcon) blogFontIcon.textContent = 'article';
  if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = 'article';
  if (contactFontIcon) contactFontIcon.textContent = 'mail';
  if (mobileContactFontIcon) mobileContactFontIcon.textContent = 'mail';
}

function closeNavPanel() {
  mobileNavPanel?.classList.add('hiding');
  overlay?.classList.add('hiding');
  
  setTimeout(() => {
    mobileNavPanel?.classList.remove('visible');
    mobileNavPanel?.classList.remove('hiding');
    overlay?.classList.add('hidden');
    overlay?.classList.remove('hiding');
  }, 200);
}

function openNavPanel() {
  mobileNavPanel?.classList.add('visible');
  overlay?.classList.remove('hidden');
}

export function homeSelected() {
  hideAllPages();
  resetAllIcons();
  homeContent?.classList.remove('hidden');
  homeContent?.classList.add('visible');
  homeIcon?.classList.add('selected');
  mobileHomeIcon?.classList.add('selected');
  if (homeFontIcon) homeFontIcon.textContent = 'home';
  if (mobileHomeFontIcon) mobileHomeFontIcon.textContent = 'home';
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

export function blogSelected() {
  hideAllPages();
  resetAllIcons();
  blogContent?.classList.remove('hidden');
  blogContent?.classList.add('visible');
  blogIcon?.classList.add('selected');
  mobileBlogIcon?.classList.add('selected');
  if (blogFontIcon) blogFontIcon.textContent = 'article';
  if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = 'article';
  localStorage.setItem('page-section', 'blog');
  closeNavPanel();
}

export function contactSelected() {
  hideAllPages();
  resetAllIcons();
  contactContent?.classList.remove('hidden');
  contactContent?.classList.add('visible');
  contactIcon?.classList.add('selected');
  mobileContactIcon?.classList.add('selected');
  if (contactFontIcon) contactFontIcon.textContent = 'mail';
  if (mobileContactFontIcon) mobileContactFontIcon.textContent = 'mail';
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
    case 'blog':
      blogSelected();
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

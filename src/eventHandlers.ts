/**
 * Centralized event handlers - replaces all inline event handlers from HTML
 */

import { homeSelected, reposSelected, blogSelected, contactSelected, closeNavPanel, openNavPanel } from './navigation';
import { themeToggle, themeToggleHover, themeToggleLeave } from './theme';

/**
 * Initialize all event listeners
 */
export function initializeEventHandlers(): void {
  // Desktop navigation icons
  setupNavigationHandlers('.home-icon', homeSelected);
  setupNavigationHandlers('.repos-icon', reposSelected);
  setupNavigationHandlers('.blog-icon', blogSelected);
  setupNavigationHandlers('.contact-icon', contactSelected);

  // Mobile navigation icons
  setupNavigationHandlers('#mobile-home-icon', homeSelected);
  setupNavigationHandlers('#mobile-repos-icon', reposSelected);
  setupNavigationHandlers('#mobile-blog-icon', blogSelected);
  setupNavigationHandlers('#mobile-contact-icon', contactSelected);

  // Mobile header home button
  setupNavigationHandlers('.header-wrapper', homeSelected);

  // Theme toggle buttons (desktop and mobile)
  setupThemeToggleHandlers('.change-theme');
  setupThemeToggleHandlers('.mobile-change-theme');

  // Mobile menu controls
  setupClickHandler('.hamburger-menu-wrapper', openNavPanel);
  setupClickHandler('.close-menu-button', closeNavPanel);
  setupClickHandler('.overlay', closeNavPanel);
}

/**
 * Setup navigation handlers with click and keyboard support
 */
function setupNavigationHandlers(selector: string, handler: () => void): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  
  elements.forEach(element => {
    // Click handler
    element.addEventListener('click', handler);
    
    // Keyboard handler (Enter key)
    element.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handler();
      }
    });
  });
}

/**
 * Setup theme toggle with hover effects
 */
function setupThemeToggleHandlers(selector: string): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  
  elements.forEach(element => {
    element.addEventListener('click', themeToggle);
    element.addEventListener('mouseover', themeToggleHover);
    element.addEventListener('mouseleave', themeToggleLeave);
    
    // Keyboard support
    element.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        themeToggle();
      }
    });
  });
}

/**
 * Setup simple click handler
 */
function setupClickHandler(selector: string, handler: () => void): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  
  elements.forEach(element => {
    element.addEventListener('click', handler);
    
    // Keyboard support if element has tabindex
    if (element.hasAttribute('tabindex')) {
      element.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handler();
        }
      });
    }
  });
}

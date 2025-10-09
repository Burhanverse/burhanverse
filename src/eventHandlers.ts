/**
 * Centralized event handlers - replaces all inline event handlers from HTML
 */

import { themeToggle, themeToggleHover, themeToggleLeave } from "./core/theme";

/**
 * Initialize all event listeners
 */
export function initializeEventHandlers(): void {
  // Desktop navigation icons
  setupNavigationHandlers(".home-icon", () =>
    loadNavigationModule("homeSelected"),
  );
  setupNavigationHandlers(".repos-icon", () =>
    loadNavigationModule("reposSelected"),
  );
  setupNavigationHandlers(".blog-icon", () =>
    loadNavigationModule("blogSelected"),
  );
  setupNavigationHandlers(".contact-icon", () =>
    loadNavigationModule("contactSelected"),
  );

  // Mobile navigation icons
  setupNavigationHandlers("#mobile-home-icon", () =>
    loadNavigationModule("homeSelected"),
  );
  setupNavigationHandlers("#mobile-repos-icon", () =>
    loadNavigationModule("reposSelected"),
  );
  setupNavigationHandlers("#mobile-blog-icon", () =>
    loadNavigationModule("blogSelected"),
  );
  setupNavigationHandlers("#mobile-contact-icon", () =>
    loadNavigationModule("contactSelected"),
  );

  // Mobile header home button
  setupNavigationHandlers(".header-wrapper", () =>
    loadNavigationModule("homeSelected"),
  );

  // Theme toggle buttons (desktop and mobile)
  setupThemeToggleHandlers(".change-theme");
  setupThemeToggleHandlers(".mobile-change-theme");

  // Mobile menu controls
  setupClickHandler(".hamburger-menu-wrapper", () =>
    loadNavigationModule("openNavPanel"),
  );
  setupClickHandler(".close-menu-button", () =>
    loadNavigationModule("closeNavPanel"),
  );
  setupClickHandler(".overlay", () => loadNavigationModule("closeNavPanel"));
}

/**
 * Dynamically load navigation module and call the specified function
 */
async function loadNavigationModule(functionName: string): Promise<void> {
  const module = await import("./core/navigation");
  const fn = (module as any)[functionName];
  if (typeof fn === "function") {
    fn();
  }
}

/**
 * Setup navigation handlers with click and keyboard support
 */
function setupNavigationHandlers(selector: string, handler: () => void): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach((element) => {
    // Click handler
    element.addEventListener("click", handler);

    // Keyboard handler (Enter key)
    element.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
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

  elements.forEach((element) => {
    element.addEventListener("click", themeToggle);
    element.addEventListener("mouseover", themeToggleHover);
    element.addEventListener("mouseleave", themeToggleLeave);

    // Keyboard support
    element.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
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

  elements.forEach((element) => {
    element.addEventListener("click", handler);

    // Keyboard support if element has tabindex
    if (element.hasAttribute("tabindex")) {
      element.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          handler();
        }
      });
    }
  });
}

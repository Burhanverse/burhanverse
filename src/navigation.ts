/**
 * Navigation system for switching between pages
 */

// Page elements
const homeContent = document.querySelector<HTMLElement>("#home-page");
const reposContent = document.querySelector<HTMLElement>("#repos-page");
const blogContent = document.querySelector<HTMLElement>("#blog-page");
const contactContent = document.querySelector<HTMLElement>("#contact-page");

// Navigation icons
const homeIcon = document.querySelector<HTMLElement>("#home-icon");
const mobileHomeIcon = document.querySelector<HTMLElement>("#mobile-home-icon");
const reposIcon = document.querySelector<HTMLElement>("#repos-icon");
const mobileReposIcon =
  document.querySelector<HTMLElement>("#mobile-repos-icon");
const blogIcon = document.querySelector<HTMLElement>("#blog-icon");
const mobileBlogIcon = document.querySelector<HTMLElement>("#mobile-blog-icon");
const contactIcon = document.querySelector<HTMLElement>("#contact-icon");
const mobileContactIcon = document.querySelector<HTMLElement>(
  "#mobile-contact-icon",
);

// Font icons
const homeFontIcon = document.querySelector<HTMLElement>("#home-font-icon");
const mobileHomeFontIcon = document.querySelector<HTMLElement>(
  "#mobile-home-font-icon",
);
const blogFontIcon = document.querySelector<HTMLElement>("#blog-font-icon");
const mobileBlogFontIcon = document.querySelector<HTMLElement>(
  "#mobile-blog-font-icon",
);
const contactFontIcon =
  document.querySelector<HTMLElement>("#contact-font-icon");
const mobileContactFontIcon = document.querySelector<HTMLElement>(
  "#mobile-contact-font-icon",
);

// Mobile nav
const mobileNavPanel = document.querySelector<HTMLElement>(
  ".mobile-panel-wrapper",
);
const overlay = document.querySelector<HTMLElement>(".overlay");
const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
const navbarContainer = document.querySelector<HTMLElement>(".navbar-elements-container");

let isAnimating = false;
let pendingNavigation: (() => void) | null = null;

// Function to update the sliding indicator for mobile navbar (immediate)
function updateSlidingIndicatorImmediate(selectedItem: HTMLElement) {
  if (!mobileNav || !selectedItem) return;
  
  // Force layout recalculation to ensure accurate measurements
  void mobileNav.offsetHeight;
  void selectedItem.offsetWidth;
  
  const navRect = mobileNav.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();
  
  const left = itemRect.left - navRect.left;
  const width = itemRect.width;
  
  // Update CSS custom properties
  mobileNav.style.setProperty('--indicator-left', `${left}px`);
  mobileNav.style.setProperty('--indicator-width', `${width}px`);
  
  // Force immediate style application
  void mobileNav.offsetHeight;
}

// Function to update the sliding indicator with smooth tracking during expansion
function updateSlidingIndicator(selectedItem: HTMLElement) {
  if (!mobileNav || !selectedItem) return;
  
  // Update immediately
  updateSlidingIndicatorImmediate(selectedItem);
  
  // Continue updating during the text expansion animation (300ms)
  // Use multiple updates to create smooth tracking
  const updateTimes = [16, 50, 100, 150, 200, 250, 300];
  updateTimes.forEach(delay => {
    setTimeout(() => {
      updateSlidingIndicatorImmediate(selectedItem);
    }, delay);
  });
}

// Function to update the sliding indicator for desktop navbar
function updateDesktopSlidingIndicator(selectedItem: HTMLElement) {
  if (!navbarContainer || !selectedItem) return;
  
  // Get the clickable icon element (not the entire container)
  const iconClickable = selectedItem.querySelector<HTMLElement>('.clickable');
  if (!iconClickable) return;
  
  const navRect = navbarContainer.getBoundingClientRect();
  const iconRect = iconClickable.getBoundingClientRect();
  
  const top = iconRect.top - navRect.top;
  
  // Update only the top position - height is fixed at 3.2rem in CSS
  navbarContainer.style.setProperty('--indicator-top', `${top}px`);
}

function hideAllPages() {
  homeContent?.classList.add("hidden");
  homeContent?.classList.remove("visible");
  reposContent?.classList.add("hidden");
  reposContent?.classList.remove("visible");
  blogContent?.classList.add("hidden");
  blogContent?.classList.remove("visible");
  contactContent?.classList.add("hidden");
  contactContent?.classList.remove("visible");
}

function resetAllIcons() {
  // Remove selected class immediately without transition delay
  const allIcons = [
    homeIcon, mobileHomeIcon,
    reposIcon, mobileReposIcon,
    blogIcon, mobileBlogIcon,
    contactIcon, mobileContactIcon
  ];
  
  allIcons.forEach(icon => {
    if (icon) {
      icon.classList.remove("selected");
      // Force style recalculation
      void icon.offsetHeight;
    }
  });

  if (homeFontIcon) homeFontIcon.textContent = "home";
  if (mobileHomeFontIcon) mobileHomeFontIcon.textContent = "home";
  if (blogFontIcon) blogFontIcon.textContent = "article";
  if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";
  if (contactFontIcon) contactFontIcon.textContent = "mail";
  if (mobileContactFontIcon) mobileContactFontIcon.textContent = "mail";
}

function closeNavPanel() {
  mobileNavPanel?.classList.add("hiding");
  overlay?.classList.add("hiding");

  setTimeout(() => {
    mobileNavPanel?.classList.remove("visible");
    mobileNavPanel?.classList.remove("hiding");
    overlay?.classList.add("hidden");
    overlay?.classList.remove("hiding");
  }, 200);
}

function openNavPanel() {
  mobileNavPanel?.classList.add("visible");
  overlay?.classList.remove("hidden");
}

export function homeSelected() {
  if (isAnimating) {
    pendingNavigation = homeSelected;
    return;
  }
  
  isAnimating = true;
  hideAllPages();
  resetAllIcons();
  
  // Use double requestAnimationFrame to ensure DOM has settled
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      homeContent?.classList.remove("hidden");
      homeContent?.classList.add("visible");
      homeIcon?.classList.add("selected");
      mobileHomeIcon?.classList.add("selected");
      if (homeFontIcon) homeFontIcon.textContent = "home";
      if (mobileHomeFontIcon) mobileHomeFontIcon.textContent = "home";
      localStorage.setItem("page-section", "home");
      closeNavPanel();
      
      // Update sliding indicators with forced reflow
      if (mobileHomeIcon) {
        updateSlidingIndicator(mobileHomeIcon);
      }
      if (homeIcon) {
        updateDesktopSlidingIndicator(homeIcon);
      }
      
      // Reset animation lock after all transitions complete (300ms)
      setTimeout(() => {
        isAnimating = false;
        if (pendingNavigation) {
          const next = pendingNavigation;
          pendingNavigation = null;
          next();
        }
      }, 300);
    });
  });
}

export function reposSelected() {
  if (isAnimating) {
    pendingNavigation = reposSelected;
    return;
  }
  
  isAnimating = true;
  hideAllPages();
  resetAllIcons();
  
  // Use double requestAnimationFrame to ensure DOM has settled
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      reposContent?.classList.remove("hidden");
      reposContent?.classList.add("visible");
      reposIcon?.classList.add("selected");
      mobileReposIcon?.classList.add("selected");
      localStorage.setItem("page-section", "repos");
      closeNavPanel();
      
      // Update sliding indicators with forced reflow
      if (mobileReposIcon) {
        updateSlidingIndicator(mobileReposIcon);
      }
      if (reposIcon) {
        updateDesktopSlidingIndicator(reposIcon);
      }
      
      // Reset animation lock after all transitions complete (300ms)
      setTimeout(() => {
        isAnimating = false;
        if (pendingNavigation) {
          const next = pendingNavigation;
          pendingNavigation = null;
          next();
        }
      }, 300);
    });
  });
}

export function blogSelected() {
  if (isAnimating) {
    pendingNavigation = blogSelected;
    return;
  }
  
  isAnimating = true;
  hideAllPages();
  resetAllIcons();
  
  // Use double requestAnimationFrame to ensure DOM has settled
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      blogContent?.classList.remove("hidden");
      blogContent?.classList.add("visible");
      blogIcon?.classList.add("selected");
      mobileBlogIcon?.classList.add("selected");
      if (blogFontIcon) blogFontIcon.textContent = "article";
      if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";
      localStorage.setItem("page-section", "blog");
      closeNavPanel();
      
      // Update sliding indicators with forced reflow
      if (mobileBlogIcon) {
        updateSlidingIndicator(mobileBlogIcon);
      }
      if (blogIcon) {
        updateDesktopSlidingIndicator(blogIcon);
      }
      
      // Reset animation lock after all transitions complete (300ms)
      setTimeout(() => {
        isAnimating = false;
        if (pendingNavigation) {
          const next = pendingNavigation;
          pendingNavigation = null;
          next();
        }
      }, 300);
    });
  });
}

export function contactSelected() {
  if (isAnimating) {
    pendingNavigation = contactSelected;
    return;
  }
  
  isAnimating = true;
  hideAllPages();
  resetAllIcons();
  
  // Use double requestAnimationFrame to ensure DOM has settled
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      contactContent?.classList.remove("hidden");
      contactContent?.classList.add("visible");
      contactIcon?.classList.add("selected");
      mobileContactIcon?.classList.add("selected");
      if (contactFontIcon) contactFontIcon.textContent = "mail";
      if (mobileContactFontIcon) mobileContactFontIcon.textContent = "mail";
      localStorage.setItem("page-section", "contact");
      closeNavPanel();
      
      // Update sliding indicators with forced reflow
      if (mobileContactIcon) {
        updateSlidingIndicator(mobileContactIcon);
      }
      if (contactIcon) {
        updateDesktopSlidingIndicator(contactIcon);
      }
      
      // Reset animation lock after all transitions complete (300ms)
      setTimeout(() => {
        isAnimating = false;
        if (pendingNavigation) {
          const next = pendingNavigation;
          pendingNavigation = null;
          next();
        }
      }, 300);
    });
  });
}

// Initialize page - check URL params or default to home
function initializePage() {
  // Check if there's a section parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");
  
  // Navigate based on URL parameter, otherwise default to home
  switch (section) {
    case "repos":
      reposSelected();
      break;
    case "blog":
      blogSelected();
      break;
    case "contact":
      contactSelected();
      break;
    case "home":
    default:
      homeSelected();
      break;
  }
  
  // Clean up URL parameter after navigation
  if (section) {
    window.history.replaceState({}, "", "/");
  }
}

// Export navigation functions for global access
export { closeNavPanel, openNavPanel };

// Handle window resize to update indicator positions
let resizeTimeout: number;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    // Find currently selected items and update indicators
    const selectedMobileItem = document.querySelector<HTMLElement>('.mobile-nav-item.selected');
    const selectedDesktopItem = document.querySelector<HTMLElement>('.navbar-icon-item.selected');
    
    if (selectedMobileItem) {
      updateSlidingIndicator(selectedMobileItem);
    }
    if (selectedDesktopItem) {
      updateDesktopSlidingIndicator(selectedDesktopItem);
    }
  }, 100);
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializePage();
    window.addEventListener("resize", handleResize);
  });
} else {
  initializePage();
  window.addEventListener("resize", handleResize);
}

// Update indicator on orientation change
window.addEventListener("orientationchange", () => {
  setTimeout(handleResize, 200);
});

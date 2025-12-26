/**
 * Navigation system for switching between pages
 */

// Page elements
const homeContent = document.querySelector<HTMLElement>("#home-page");
const reposContent = document.querySelector<HTMLElement>("#repos-page");
const blogContent = document.querySelector<HTMLElement>("#blog-page");
const articleContent = document.querySelector<HTMLElement>("#article-page");
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
const navbarContainer = document.querySelector<HTMLElement>(
  ".navbar-elements-container",
);

let isAnimating = false;
let pendingNavigation: (() => void) | null = null;

function updateSlidingIndicatorImmediate(selectedItem: HTMLElement) {
  if (!mobileNav || !selectedItem) return;

  void mobileNav.offsetHeight;
  void selectedItem.offsetWidth;

  const navRect = mobileNav.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();

  const left = itemRect.left - navRect.left;
  const width = itemRect.width;

  mobileNav.style.setProperty("--indicator-left", `${left}px`);
  mobileNav.style.setProperty("--indicator-width", `${width}px`);

  void mobileNav.offsetHeight;
}

function updateSlidingIndicator(selectedItem: HTMLElement) {
  if (!mobileNav || !selectedItem) return;

  updateSlidingIndicatorImmediate(selectedItem);

  const updateTimes = [16, 50, 100, 150, 200, 250, 300];
  updateTimes.forEach((delay) => {
    setTimeout(() => {
      updateSlidingIndicatorImmediate(selectedItem);
    }, delay);
  });
}

function updateDesktopSlidingIndicator(selectedItem: HTMLElement) {
  if (!navbarContainer || !selectedItem) return;

  const iconClickable = selectedItem.querySelector<HTMLElement>(".clickable");
  if (!iconClickable) return;

  const navRect = navbarContainer.getBoundingClientRect();
  const iconRect = iconClickable.getBoundingClientRect();

  const top = iconRect.top - navRect.top;

  navbarContainer.style.setProperty("--indicator-top", `${top}px`);
}

function hideAllPages() {
  homeContent?.classList.add("hidden");
  homeContent?.classList.remove("visible");
  reposContent?.classList.add("hidden");
  reposContent?.classList.remove("visible");
  blogContent?.classList.add("hidden");
  blogContent?.classList.remove("visible");
  articleContent?.classList.add("hidden");
  articleContent?.classList.remove("visible");
  contactContent?.classList.add("hidden");
  contactContent?.classList.remove("visible");
}

function resetAllIcons() {
  const allIcons = [
    homeIcon,
    mobileHomeIcon,
    reposIcon,
    mobileReposIcon,
    blogIcon,
    mobileBlogIcon,
    contactIcon,
    mobileContactIcon,
  ];

  allIcons.forEach((icon) => {
    if (icon) {
      icon.classList.remove("selected");
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

  document.documentElement.setAttribute("data-tab", "home");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      homeContent?.classList.remove("hidden");
      homeContent?.classList.add("visible");
      homeIcon?.classList.add("selected");
      mobileHomeIcon?.classList.add("selected");
      localStorage.setItem("page-section", "home");
      closeNavPanel();

      if (mobileHomeIcon) {
        updateSlidingIndicator(mobileHomeIcon);
      }
      if (homeIcon) {
        updateDesktopSlidingIndicator(homeIcon);
      }

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

  document.documentElement.setAttribute("data-tab", "repos");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      reposContent?.classList.remove("hidden");
      reposContent?.classList.add("visible");
      reposIcon?.classList.add("selected");
      mobileReposIcon?.classList.add("selected");
      localStorage.setItem("page-section", "repos");
      closeNavPanel();

      if (mobileReposIcon) {
        updateSlidingIndicator(mobileReposIcon);
      }
      if (reposIcon) {
        updateDesktopSlidingIndicator(reposIcon);
      }

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

  document.documentElement.setAttribute("data-tab", "blog");

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

      if (mobileBlogIcon) {
        updateSlidingIndicator(mobileBlogIcon);
      }
      if (blogIcon) {
        updateDesktopSlidingIndicator(blogIcon);
      }

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

  document.documentElement.setAttribute("data-tab", "contact");

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
      if (mobileContactIcon) {
        updateSlidingIndicator(mobileContactIcon);
      }
      if (contactIcon) {
        updateDesktopSlidingIndicator(contactIcon);
      }

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

export function articleSelected(articleSlug: string) {
  if (isAnimating) {
    pendingNavigation = () => articleSelected(articleSlug);
    return;
  }

  isAnimating = true;
  hideAllPages();
  resetAllIcons();

  document.documentElement.setAttribute("data-tab", "blog");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      articleContent?.classList.remove("hidden");
      articleContent?.classList.add("visible");
      blogIcon?.classList.add("selected");
      mobileBlogIcon?.classList.add("selected");
      if (blogFontIcon) blogFontIcon.textContent = "article";
      if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";
      localStorage.setItem("page-section", "article");
      closeNavPanel();

      import("../blog/article").then((module) => {
        module.renderArticle(articleSlug);
      });

      if (mobileBlogIcon) {
        updateSlidingIndicator(mobileBlogIcon);
      }
      if (blogIcon) {
        updateDesktopSlidingIndicator(blogIcon);
      }

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

// Initialize page
function initializePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");
  const article = urlParams.get("article");

  if (article) {
    articleSelected(article);
    return;
  }

  if (section) {
    window.history.replaceState({}, "", "/");
  }

  homeSelected();
}

export { closeNavPanel, openNavPanel };

let resizeTimeout: number;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    const selectedMobileItem = document.querySelector<HTMLElement>(
      ".mobile-nav-item.selected",
    );
    const selectedDesktopItem = document.querySelector<HTMLElement>(
      ".navbar-icon-item.selected",
    );

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

window.addEventListener("orientationchange", () => {
  setTimeout(handleResize, 200);
});

window.addEventListener("popstate", () => {
  initializePage();
});

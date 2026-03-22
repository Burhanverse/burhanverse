/**
 * Navigation system for switching between pages
 */

const getElement = (selector: string) =>
  document.querySelector<HTMLElement>(selector);

// Page elements
const getHomeContent = () => getElement("#home-page");
const getReposContent = () => getElement("#repos-page");
const getBlogContent = () => getElement("#blog-page");
const getArticleContent = () => getElement("#article-page");
const getContactContent = () => getElement("#contact-page");

// Navigation icons
const getHomeIcon = () => getElement("#home-icon");
const getMobileHomeIcon = () => getElement("#mobile-home-icon");
const getReposIcon = () => getElement("#repos-icon");
const getMobileReposIcon = () => getElement("#mobile-repos-icon");
const getBlogIcon = () => getElement("#blog-icon");
const getMobileBlogIcon = () => getElement("#mobile-blog-icon");
const getContactIcon = () => getElement("#contact-icon");
const getMobileContactIcon = () => getElement("#mobile-contact-icon");

// Font icons
const getHomeFontIcon = () => getElement("#home-font-icon");
const getMobileHomeFontIcon = () => getElement("#mobile-home-font-icon");
const getBlogFontIcon = () => getElement("#blog-font-icon");
const getMobileBlogFontIcon = () => getElement("#mobile-blog-font-icon");
const getContactFontIcon = () => getElement("#contact-font-icon");
const getMobileContactFontIcon = () => getElement("#mobile-contact-font-icon");

// Mobile nav
const getMobileNavPanel = () => getElement(".mobile-panel-wrapper");
const getOverlay = () => getElement(".overlay");
const getMobileNav = () => getElement(".mobile-nav");
const getNavbarContainer = () => getElement(".navbar-elements-container");

let isAnimating = false;
let pendingNavigation: (() => void) | null = null;

let indicatorObserver: ResizeObserver | null = null;

function updateSlidingIndicatorImmediate(selectedItem: HTMLElement) {
  const mobileNav = getMobileNav();
  if (!mobileNav || !selectedItem) return;

  const navRect = mobileNav.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();
  const width = itemRect.width;

  if (width === 0 || navRect.width === 0) return;

  const computedStyle = getComputedStyle(mobileNav);
  const borderLeft = parseFloat(computedStyle.borderLeftWidth) || 0;
  
  // Position is relative to padding edge
  const left = itemRect.left - (navRect.left + borderLeft);

  mobileNav.style.setProperty("--indicator-left", `${left}px`);
  mobileNav.style.setProperty("--indicator-width", `${width}px`);
}

function updateDesktopSlidingIndicatorImmediate(selectedItem: HTMLElement) {
  const navbarContainer = getNavbarContainer();
  if (!navbarContainer || !selectedItem) return;

  const iconClickable = selectedItem.querySelector<HTMLElement>(".clickable");
  if (!iconClickable) return;

  const navRect = navbarContainer.getBoundingClientRect();
  const iconRect = iconClickable.getBoundingClientRect();

  if (iconRect.height === 0 || navRect.height === 0) return;

  const computedStyle = getComputedStyle(navbarContainer);
  const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;

  const top = iconRect.top - (navRect.top + borderTop);

  navbarContainer.style.setProperty("--indicator-top", `${top}px`);
}

function updateIndicators(
  mobileItem: HTMLElement | null,
  desktopItem: HTMLElement | null,
) {
  if (indicatorObserver) {
    indicatorObserver.disconnect();
  }

  const update = () => {
    if (mobileItem) updateSlidingIndicatorImmediate(mobileItem);
    if (desktopItem) updateDesktopSlidingIndicatorImmediate(desktopItem);
  };

  indicatorObserver = new ResizeObserver(() => {
    update();
  });

  // Observe all nav items to catch layout position shifts
  document.querySelectorAll(".mobile-nav-item").forEach(item => {
    indicatorObserver!.observe(item);
  });
  
  document.querySelectorAll(".icon-container").forEach(item => {
    indicatorObserver!.observe(item);
  });
  
  const mobileNav = getMobileNav();
  if (mobileNav) indicatorObserver.observe(mobileNav);
  
  const navbarContainer = getNavbarContainer();
  if (navbarContainer) indicatorObserver.observe(navbarContainer);

  update();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      update();
      setTimeout(update, 50);
    });
  }
}

function hideAllPages() {
  getHomeContent()?.classList.add("hidden");
  getHomeContent()?.classList.remove("visible");
  getReposContent()?.classList.add("hidden");
  getReposContent()?.classList.remove("visible");
  getBlogContent()?.classList.add("hidden");
  getBlogContent()?.classList.remove("visible");
  getArticleContent()?.classList.add("hidden");
  getArticleContent()?.classList.remove("visible");
  getContactContent()?.classList.add("hidden");
  getContactContent()?.classList.remove("visible");
}

function resetAllIcons() {
  const allIcons = [
    getHomeIcon(),
    getMobileHomeIcon(),
    getReposIcon(),
    getMobileReposIcon(),
    getBlogIcon(),
    getMobileBlogIcon(),
    getContactIcon(),
    getMobileContactIcon(),
  ];

  allIcons.forEach((icon) => {
    if (icon) {
      icon.classList.remove("selected");
      void icon.offsetHeight;
    }
  });

  const homeFontIcon = getHomeFontIcon();
  const mobileHomeFontIcon = getMobileHomeFontIcon();
  const blogFontIcon = getBlogFontIcon();
  const mobileBlogFontIcon = getMobileBlogFontIcon();
  const contactFontIcon = getContactFontIcon();
  const mobileContactFontIcon = getMobileContactFontIcon();

  if (homeFontIcon) homeFontIcon.textContent = "home";
  if (mobileHomeFontIcon) mobileHomeFontIcon.textContent = "home";
  if (blogFontIcon) blogFontIcon.textContent = "article";
  if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";
  if (contactFontIcon) contactFontIcon.textContent = "mail";
  if (mobileContactFontIcon) mobileContactFontIcon.textContent = "mail";
}

function closeNavPanel() {
  getMobileNavPanel()?.classList.add("hiding");
  getOverlay()?.classList.add("hiding");

  setTimeout(() => {
    getMobileNavPanel()?.classList.remove("visible");
    getMobileNavPanel()?.classList.remove("hiding");
    getOverlay()?.classList.add("hidden");
    getOverlay()?.classList.remove("hiding");
  }, 200);
}

function openNavPanel() {
  getMobileNavPanel()?.classList.add("visible");
  getOverlay()?.classList.remove("hidden");
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
      const homeContent = getHomeContent();
      const homeIcon = getHomeIcon();
      const mobileHomeIcon = getMobileHomeIcon();

      homeContent?.classList.remove("hidden");
      homeContent?.classList.add("visible");
      homeIcon?.classList.add("selected");
      mobileHomeIcon?.classList.add("selected");
      localStorage.setItem("page-section", "home");
      closeNavPanel();

      updateIndicators(mobileHomeIcon, homeIcon);

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
      const reposContent = getReposContent();
      const reposIcon = getReposIcon();
      const mobileReposIcon = getMobileReposIcon();

      reposContent?.classList.remove("hidden");
      reposContent?.classList.add("visible");
      reposIcon?.classList.add("selected");
      mobileReposIcon?.classList.add("selected");
      localStorage.setItem("page-section", "repos");
      closeNavPanel();

      updateIndicators(mobileReposIcon, reposIcon);

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
      const blogContent = getBlogContent();
      const blogIcon = getBlogIcon();
      const mobileBlogIcon = getMobileBlogIcon();
      const blogFontIcon = getBlogFontIcon();
      const mobileBlogFontIcon = getMobileBlogFontIcon();

      blogContent?.classList.remove("hidden");
      blogContent?.classList.add("visible");
      blogIcon?.classList.add("selected");
      mobileBlogIcon?.classList.add("selected");
      if (blogFontIcon) blogFontIcon.textContent = "article";
      if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";
      localStorage.setItem("page-section", "blog");
      closeNavPanel();

      updateIndicators(mobileBlogIcon, blogIcon);

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
      const contactContent = getContactContent();
      const contactIcon = getContactIcon();
      const mobileContactIcon = getMobileContactIcon();
      const contactFontIcon = getContactFontIcon();
      const mobileContactFontIcon = getMobileContactFontIcon();

      contactContent?.classList.remove("hidden");
      contactContent?.classList.add("visible");
      contactIcon?.classList.add("selected");
      mobileContactIcon?.classList.add("selected");
      if (contactFontIcon) contactFontIcon.textContent = "mail";
      if (mobileContactFontIcon) mobileContactFontIcon.textContent = "mail";
      localStorage.setItem("page-section", "contact");
      closeNavPanel();
      updateIndicators(mobileContactIcon, contactIcon);

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
      const articleContent = getArticleContent();
      const blogIcon = getBlogIcon();
      const mobileBlogIcon = getMobileBlogIcon();
      const blogFontIcon = getBlogFontIcon();
      const mobileBlogFontIcon = getMobileBlogFontIcon();

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

      updateIndicators(mobileBlogIcon, blogIcon);

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
    const articleContent = getArticleContent();
    const blogIcon = getBlogIcon();
    const mobileBlogIcon = getMobileBlogIcon();
    const blogFontIcon = getBlogFontIcon();
    const mobileBlogFontIcon = getMobileBlogFontIcon();

    hideAllPages();
    resetAllIcons();
    document.documentElement.setAttribute("data-tab", "blog");

    articleContent?.classList.remove("hidden");
    articleContent?.classList.add("visible");
    blogIcon?.classList.add("selected");
    mobileBlogIcon?.classList.add("selected");
    if (blogFontIcon) blogFontIcon.textContent = "article";
    if (mobileBlogFontIcon) mobileBlogFontIcon.textContent = "article";

    updateIndicators(mobileBlogIcon, blogIcon);

    import("../blog/article").then((module) => {
      module.renderArticle(article);
    });
    return;
  }

  if (section) {
    window.history.replaceState({}, "", "/");
  }

  const homeContent = getHomeContent();
  const homeIcon = getHomeIcon();
  const mobileHomeIcon = getMobileHomeIcon();

  homeContent?.classList.add("visible");
  homeIcon?.classList.add("selected");
  mobileHomeIcon?.classList.add("selected");

  updateIndicators(mobileHomeIcon, homeIcon);
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
      ".icon-container.selected",
    );

    if (selectedMobileItem) {
      updateSlidingIndicatorImmediate(selectedMobileItem);
    }
    if (selectedDesktopItem) {
      updateDesktopSlidingIndicatorImmediate(selectedDesktopItem);
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

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    setTimeout(handleResize, 100);
  }
});

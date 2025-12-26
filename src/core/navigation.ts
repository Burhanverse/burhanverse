/**
 * Navigation system for switching between pages
 */

const getElement = (selector: string) => document.querySelector<HTMLElement>(selector);

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

function updateSlidingIndicatorImmediate(selectedItem: HTMLElement) {
  const mobileNav = getMobileNav();
  if (!mobileNav || !selectedItem) return;

  void mobileNav.offsetHeight;
  void selectedItem.offsetWidth;

  const navRect = mobileNav.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();

  if (itemRect.width === 0 || navRect.width === 0) return;

  const left = itemRect.left - navRect.left;
  const width = itemRect.width;

  mobileNav.style.setProperty("--indicator-left", `${left}px`);
  mobileNav.style.setProperty("--indicator-width", `${width}px`);

  void mobileNav.offsetHeight;
}

function updateSlidingIndicator(selectedItem: HTMLElement) {
  const mobileNav = getMobileNav();
  if (!mobileNav || !selectedItem) return;

  updateSlidingIndicatorImmediate(selectedItem);

  const updateTimes = [16, 50, 100, 150, 200, 250, 300];
  updateTimes.forEach((delay) => {
    setTimeout(() => {
      updateSlidingIndicatorImmediate(selectedItem);
    }, delay);
  });
}

function updateIndicatorsWithRetry(mobileItem: HTMLElement | null, desktopItem: HTMLElement | null) {
  const update = () => {
    if (mobileItem) {
      updateSlidingIndicatorImmediate(mobileItem);
    }
    if (desktopItem) {
      updateDesktopSlidingIndicator(desktopItem);
    }
  };

  update();

  const updateTimes = [10, 50, 100, 200, 300, 500, 1000];
  updateTimes.forEach((delay) => {
    setTimeout(update, delay);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      update();
      setTimeout(update, 50);
    });
  }
}

function updateDesktopSlidingIndicator(selectedItem: HTMLElement) {
  const navbarContainer = getNavbarContainer();
  if (!navbarContainer || !selectedItem) return;

  const iconClickable = selectedItem.querySelector<HTMLElement>(".clickable");
  if (!iconClickable) return;

  const navRect = navbarContainer.getBoundingClientRect();
  const iconRect = iconClickable.getBoundingClientRect();

  const top = iconRect.top - navRect.top;

  navbarContainer.style.setProperty("--indicator-top", `${top}px`);
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
      const reposContent = getReposContent();
      const reposIcon = getReposIcon();
      const mobileReposIcon = getMobileReposIcon();
      
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
    
    updateIndicatorsWithRetry(mobileBlogIcon, blogIcon);
    
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
  
  updateIndicatorsWithRetry(mobileHomeIcon, homeIcon);
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

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    setTimeout(handleResize, 100);
  }
});

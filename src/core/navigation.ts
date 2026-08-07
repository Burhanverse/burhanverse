/**
 * Navigation system for switching between pages
 */

const getElement = (selector: string) =>
  document.querySelector<HTMLElement>(selector);

// Page elements
const getPageElement = (id: string) => getElement(`#${id}-page`);

// Navigation icons
const getDesktopIcon = (id: string) => getElement(`#${id}-icon`);
const getMobileIcon = (id: string) => getElement(`#mobile-${id}-icon`);

// Font icons (for icons that change text content on selection)
const getFontIcon = (id: string) => getElement(`#${id}-font-icon`);
const getMobileFontIcon = (id: string) => getElement(`#mobile-${id}-font-icon`);

// Mobile nav
const getMobileNavPanel = () => getElement(".mobile-panel-wrapper");
const getOverlay = () => getElement(".overlay");
const getMobileNav = () => getElement(".mobile-nav");
const getNavbarContainer = () => getElement(".navbar-elements-container");

let isAnimating = false;
let pendingNavigation: (() => void) | null = null;

let indicatorObserver: ResizeObserver | null = null;

// ─── Sliding Indicator Helpers ───────────────────────────────────────────────

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

// ─── Page Visibility & Icon State ────────────────────────────────────────────

const PAGE_IDS = ["home", "repos", "blog", "article", "contact"] as const;

function hideAllPages() {
  for (const id of PAGE_IDS) {
    const el = getPageElement(id);
    if (el) {
      el.classList.add("hidden");
      el.classList.remove("visible");
    }
  }
}

/** Icon IDs that participate in selection state */
const NAV_ICON_IDS = ["home", "repos", "blog", "contact"] as const;

/** Icons with swappable font-icon text content */
const FONT_ICON_DEFAULTS: Record<string, string> = {
  home: "home",
  blog: "article",
  contact: "mail",
};

function resetAllIcons() {
  for (const id of NAV_ICON_IDS) {
    const desktopIcon = getDesktopIcon(id);
    const mobileIcon = getMobileIcon(id);
    if (desktopIcon) {
      desktopIcon.classList.remove("selected");
      void desktopIcon.offsetHeight;
    }
    if (mobileIcon) {
      mobileIcon.classList.remove("selected");
      void mobileIcon.offsetHeight;
    }
  }

  // Reset font icons to defaults
  for (const [id, text] of Object.entries(FONT_ICON_DEFAULTS)) {
    const fontIcon = getFontIcon(id);
    const mobileFontIcon = getMobileFontIcon(id);
    if (fontIcon) fontIcon.textContent = text;
    if (mobileFontIcon) mobileFontIcon.textContent = text;
  }
}

// ─── Mobile Nav Panel ────────────────────────────────────────────────────────

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

// ─── Generic Navigation ──────────────────────────────────────────────────────

interface NavigateOptions {
  /** The page element ID suffix (e.g. "home" → "#home-page") */
  pageId: string;
  /** The data-tab value to set on <html> */
  tab: string;
  /** The navigation icon ID suffix (e.g. "home" → "#home-icon") */
  iconId: string;
  /** localStorage key value for page-section */
  section: string;
  /** Optional callback invoked inside the rAF after the page is shown */
  onShow?: () => void;
}

function navigateTo(options: NavigateOptions, selfRef: () => void) {
  if (isAnimating) {
    pendingNavigation = selfRef;
    return;
  }

  isAnimating = true;
  hideAllPages();
  resetAllIcons();

  document.documentElement.setAttribute("data-tab", options.tab);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const page = getPageElement(options.pageId);
      const desktopIcon = getDesktopIcon(options.iconId);
      const mobileIcon = getMobileIcon(options.iconId);

      page?.classList.remove("hidden");
      page?.classList.add("visible");
      desktopIcon?.classList.add("selected");
      mobileIcon?.classList.add("selected");
      localStorage.setItem("page-section", options.section);
      closeNavPanel();

      options.onShow?.();

      updateIndicators(mobileIcon, desktopIcon);

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

// ─── Exported Navigation Functions ───────────────────────────────────────────

export function homeSelected() {
  navigateTo(
    { pageId: "home", tab: "home", iconId: "home", section: "home" },
    homeSelected,
  );
}

export function reposSelected() {
  navigateTo(
    { pageId: "repos", tab: "repos", iconId: "repos", section: "repos" },
    reposSelected,
  );
}

export function blogSelected() {
  navigateTo(
    { pageId: "blog", tab: "blog", iconId: "blog", section: "blog" },
    blogSelected,
  );
}

export function contactSelected() {
  navigateTo(
    {
      pageId: "contact",
      tab: "contact",
      iconId: "contact",
      section: "contact",
    },
    contactSelected,
  );
}

export function articleSelected(articleSlug: string) {
  navigateTo(
    {
      pageId: "article",
      tab: "blog",
      iconId: "blog",
      section: "article",
      onShow: () => {
        import("../blog/article").then((module) => {
          module.renderArticle(articleSlug);
        });
      },
    },
    () => articleSelected(articleSlug),
  );
}

// ─── Page Initialization ─────────────────────────────────────────────────────

function initializePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");
  const article = urlParams.get("article");

  if (article) {
    const blogIcon = getDesktopIcon("blog");
    const mobileBlogIcon = getMobileIcon("blog");

    hideAllPages();
    resetAllIcons();
    document.documentElement.setAttribute("data-tab", "blog");

    const articleContent = getPageElement("article");
    articleContent?.classList.remove("hidden");
    articleContent?.classList.add("visible");
    blogIcon?.classList.add("selected");
    mobileBlogIcon?.classList.add("selected");

    updateIndicators(mobileBlogIcon, blogIcon);

    import("../blog/article").then((module) => {
      module.renderArticle(article);
    });
    return;
  }

  if (section) {
    window.history.replaceState({}, "", "/");
  }

  const homeIcon = getDesktopIcon("home");
  const mobileHomeIcon = getMobileIcon("home");
  const homeContent = getPageElement("home");

  homeContent?.classList.add("visible");
  homeIcon?.classList.add("selected");
  mobileHomeIcon?.classList.add("selected");

  updateIndicators(mobileHomeIcon, homeIcon);
}

export { closeNavPanel, openNavPanel };

// ─── Resize & Visibility Handlers ────────────────────────────────────────────

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

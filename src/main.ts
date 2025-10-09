// Import all modules (auto-execute initialization)
import "./repos/listRepo";
import "./core/theme";
import "./core/bodyLoad";
import "./blog";

// Import individual feature modules (initialized by bodyLoad)
import "./features/customCursor";
import "./features/clock";
import "./features/dateDisplay";
import "./features/dayProgress";
import "./features/subtitleStyling";

// Import blog posts for image preloading
import { blogPosts } from "./blog/posts";

// Export functions to window for inline event handlers
import { themeToggle, themeToggleHover, themeToggleLeave } from "./core/theme";
import { bodyLoaded } from "./core/bodyLoad";

/**
 * Lazy load navigation functions
 */
async function loadNavigationFunctions() {
  const nav = await import("./core/navigation");
  return nav;
}

// Make functions globally available for HTML inline handlers
declare global {
  interface Window {
    themeToggle: typeof themeToggle;
    themeToggleHover: typeof themeToggleHover;
    themeToggleLeave: typeof themeToggleLeave;
    homeSelected: () => void;
    reposSelected: () => void;
    blogSelected: () => void;
    contactSelected: () => void;
    articleSelected: (slug: string) => void;
    closeNavPanel: () => void;
    openNavPanel: () => void;
    bodyLoaded: typeof bodyLoaded;
  }
}

// Attach theme functions to window
window.themeToggle = themeToggle;
window.themeToggleHover = themeToggleHover;
window.themeToggleLeave = themeToggleLeave;
window.bodyLoaded = bodyLoaded;

// Attach navigation functions lazily
loadNavigationFunctions().then((nav) => {
  window.homeSelected = nav.homeSelected;
  window.reposSelected = nav.reposSelected;
  window.blogSelected = nav.blogSelected;
  window.contactSelected = nav.contactSelected;
  window.articleSelected = nav.articleSelected;
  window.closeNavPanel = nav.closeNavPanel;
  window.openNavPanel = nav.openNavPanel;
});

/**
 * Preload blog post images for smoother loading
 */
function preloadBlogImages(): void {
  blogPosts.forEach((post) => {
    if (post.image) {
      const img = new Image();
      img.src = post.image;
    }
  });
}

// Preload images after page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", preloadBlogImages);
} else {
  preloadBlogImages();
}

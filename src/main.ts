// Import all modules (auto-execute initialization)
import "./repos/listRepo";
import "./core/theme";
import "./core/navigation";
import "./core/bodyLoad";
import "./blog";
import "./blog/article";

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
import {
  homeSelected,
  reposSelected,
  blogSelected,
  contactSelected,
  articleSelected,
  closeNavPanel,
  openNavPanel,
} from "./core/navigation";
import { bodyLoaded } from "./core/bodyLoad";

// Make functions globally available for HTML inline handlers
declare global {
  interface Window {
    themeToggle: typeof themeToggle;
    themeToggleHover: typeof themeToggleHover;
    themeToggleLeave: typeof themeToggleLeave;
    homeSelected: typeof homeSelected;
    reposSelected: typeof reposSelected;
    blogSelected: typeof blogSelected;
    contactSelected: typeof contactSelected;
    articleSelected: typeof articleSelected;
    closeNavPanel: typeof closeNavPanel;
    openNavPanel: typeof openNavPanel;
    bodyLoaded: typeof bodyLoaded;
  }
}

// Attach to window object
window.themeToggle = themeToggle;
window.themeToggleHover = themeToggleHover;
window.themeToggleLeave = themeToggleLeave;
window.homeSelected = homeSelected;
window.reposSelected = reposSelected;
window.blogSelected = blogSelected;
window.contactSelected = contactSelected;
window.articleSelected = articleSelected;
window.closeNavPanel = closeNavPanel;
window.openNavPanel = openNavPanel;
window.bodyLoaded = bodyLoaded;

/**
 * Preload blog post images for smoother loading
 */
function preloadBlogImages(): void {
  blogPosts.forEach(post => {
    if (post.image) {
      const img = new Image();
      img.src = post.image;
    }
  });
}

// Preload images after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadBlogImages);
} else {
  preloadBlogImages();
}

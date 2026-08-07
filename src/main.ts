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

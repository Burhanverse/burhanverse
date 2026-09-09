import { createApp } from "vue";
import App from "./App.vue";
import { initCustomCursor } from "./features/customCursor";
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

// Initialize custom cursor and preloading
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initCustomCursor();
    preloadBlogImages();
  });
} else {
  initCustomCursor();
  preloadBlogImages();
}

// Mount Vue application
const app = createApp(App);
app.mount("#app");

// Fade-in body
const body = document.querySelector<HTMLElement>("body");
if (body) {
  body.style.opacity = "1";
}

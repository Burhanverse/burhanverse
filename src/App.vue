<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import StatusBar from "./components/StatusBar.vue";
import NavigationDock from "./components/NavigationDock.vue";
import HomePage from "./components/pages/HomePage.vue";
import ReposPage from "./components/pages/ReposPage.vue";
import BlogPage from "./components/pages/BlogPage.vue";
import ArticlePage from "./components/pages/ArticlePage.vue";
import ContactPage from "./components/pages/ContactPage.vue";

// Import Google's official @material/web components
import "@material/web/ripple/ripple.js";
import "@material/web/elevation/elevation.js";

type TabId = "home" | "repos" | "blog" | "article" | "contact";

const currentTab = ref<TabId>("home");
const currentArticleSlug = ref<string>("");
const theme = ref<"light" | "dark">("light");
const isMobile = ref(false);

function checkViewport() {
  isMobile.value = window.innerWidth < 768;
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    theme.value = savedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
  document.documentElement.setAttribute("theme", theme.value);
}

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("theme", theme.value);
  localStorage.setItem("theme", theme.value);
}

function navigate(tab: "home" | "repos" | "blog" | "contact") {
  currentTab.value = tab;
  currentArticleSlug.value = "";
  document.documentElement.setAttribute("data-tab", tab);
  window.history.pushState({ tab }, "", tab === "home" ? "/" : `/?section=${tab}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openArticle(slug: string) {
  currentArticleSlug.value = slug;
  currentTab.value = "article";
  document.documentElement.setAttribute("data-tab", "blog");
  window.history.pushState({ tab: "article", slug }, "", `/?article=${slug}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function parseUrl() {
  const params = new URLSearchParams(window.location.search);
  const article = params.get("article");
  const section = params.get("section") as TabId | null;

  if (article) {
    currentArticleSlug.value = article;
    currentTab.value = "article";
    document.documentElement.setAttribute("data-tab", "blog");
  } else if (section && ["home", "repos", "blog", "contact", "about"].includes(section)) {
    const tab = (section === "about" ? "contact" : section) as TabId;
    currentTab.value = tab;
    document.documentElement.setAttribute("data-tab", tab);
  } else {
    currentTab.value = "home";
    document.documentElement.setAttribute("data-tab", "home");
  }
}

onMounted(() => {
  checkViewport();
  initTheme();
  parseUrl();

  window.addEventListener("resize", checkViewport);
  window.addEventListener("popstate", parseUrl);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
  window.removeEventListener("popstate", parseUrl);
});

watch(currentTab, (newTab) => {
  document.documentElement.setAttribute("data-tab", newTab === "article" ? "blog" : newTab);
});
</script>

<template>
  <div class="tablet-viewport-shell" :class="[theme, { 'is-mobile-device': isMobile }]">
    <!-- Cozy Study Room Wallpaper Background -->
    <div class="homescreen-wallpaper-bg"></div>
    <div class="wallpaper-ambient-scrim"></div>

    <!-- Top Status Bar -->
    <StatusBar
      :theme="theme"
      :current-tab="currentTab"
      :is-mobile="isMobile"
      @toggle-theme="toggleTheme"
    />

    <!-- Dual Navigation Dock (Desktop Left Rail / Mobile Bottom Bar) -->
    <NavigationDock
      :current-tab="currentTab"
      :theme="theme"
      :is-mobile="isMobile"
      @navigate="navigate"
    />

    <!-- Main Widget Surface / Scroll Area -->
    <main class="homescreen-content-scroller">
      <Transition name="fade-slide" mode="out-in">
        <HomePage
          v-if="currentTab === 'home'"
          :is-mobile="isMobile"
        />
        <ReposPage
          v-else-if="currentTab === 'repos'"
        />
        <BlogPage
          v-else-if="currentTab === 'blog'"
          @open-article="openArticle"
        />
        <ArticlePage
          v-else-if="currentTab === 'article'"
          :article-slug="currentArticleSlug"
          @back-to-blog="navigate('blog')"
        />
        <ContactPage
          v-else-if="currentTab === 'contact'"
        />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.tablet-viewport-shell {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
  background-color: var(--md-sys-color-background, #1a1512);
  color: var(--md-sys-color-on-background, #221a16);
}

/* Study Room Wallpaper Background */
.homescreen-wallpaper-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("/img/tabletWallpaper.webp");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  transition: filter 300ms ease;
}

[theme="dark"] .homescreen-wallpaper-bg {
  filter: brightness(0.65) saturate(110%);
}

.wallpaper-ambient-scrim {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 240, 220, 0.05) 0%, rgba(30, 20, 10, 0.25) 100%);
  pointer-events: none;
  z-index: 1;
}

[theme="dark"] .wallpaper-ambient-scrim {
  background: radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 0.1) 0%, rgba(10, 8, 6, 0.5) 100%);
}

/* Content Scroller */
.homescreen-content-scroller {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 4.8rem;
  padding-bottom: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.homescreen-content-scroller::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.is-mobile-device .homescreen-content-scroller {
  padding-top: calc(4.2rem + env(safe-area-inset-top, 0));
  padding-bottom: calc(9.4rem + env(safe-area-inset-bottom, 0));
  min-height: 100dvh;
}

.is-mobile-device .homescreen-wallpaper-bg {
  background-position: 72% center;
}

.is-mobile-device .wallpaper-ambient-scrim {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* Page Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 280ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
}
</style>

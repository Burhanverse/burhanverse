<script setup lang="ts">
const props = defineProps<{
  currentTab: "home" | "repos" | "blog" | "article" | "contact";
  theme: "light" | "dark";
  isMobile: boolean;
}>();

const emit = defineEmits<{
  (e: "navigate", tab: "home" | "repos" | "blog" | "contact"): void;
}>();

const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "repos", label: "GitHub", icon: "developer_mode" },
  { id: "blog", label: "Blog", icon: "article" },
  { id: "contact", label: "About", icon: "person" },
] as const;
</script>

<template>
  <!-- Desktop / Tablet Left Vertical Dock (Free Floating Squircles Matching Mockup) -->
  <aside v-if="!isMobile" class="tablet-launcher-dock" aria-label="Launcher Rail">
    <div class="dock-floating-column">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        class="dock-launcher-btn"
        :class="{ active: currentTab === item.id || (item.id === 'blog' && currentTab === 'article') }"
        :title="item.label"
        @click="emit('navigate', item.id)"
      >
        <md-ripple></md-ripple>
        <span class="material-symbols-rounded dock-icon">{{ item.icon }}</span>
        <span class="dock-tooltip">{{ item.label }}</span>
      </button>
    </div>
  </aside>

  <!-- Google Pixel Mobile Material 3 Bottom Navigation Bar -->
  <nav v-else class="m3-bottom-nav-bar" aria-label="Material 3 Navigation Bar">
    <button
      v-for="item in navItems"
      :key="item.id"
      type="button"
      class="m3-nav-destination"
      :class="{ selected: currentTab === item.id || (item.id === 'blog' && currentTab === 'article') }"
      @click="emit('navigate', item.id)"
    >
      <div class="m3-nav-icon-container">
        <md-ripple></md-ripple>
        <span class="material-symbols-rounded m3-nav-icon">{{ item.icon }}</span>
      </div>
      <span class="m3-nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
/* ==========================================================================
   DESKTOP / TABLET VERTICAL DOCK (MATCHING USER MOCKUP EXACTLY)
   ========================================================================== */
.tablet-launcher-dock {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Background on nav buttons group */
.dock-floating-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  padding: 1.2rem 0.8rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.92));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 9999px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .dock-floating-column {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
}

/* Individual launcher buttons */
.dock-launcher-btn {
  position: relative;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: none;
  background: var(--md-sys-color-dock-btn, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  transition:
    transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1),
    border-radius 280ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 280ms ease,
    background-color 200ms ease;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
}

.dock-launcher-btn:hover {
  transform: scale(1.12);
  filter: brightness(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
}

/* Active tab button morphs into rounded squircle */
.dock-launcher-btn.active {
  border-radius: 1.4rem;
  background: var(--md-sys-color-dock-btn-active, #a64d26);
  transform: scale(1.06);
  box-shadow: 0 6px 18px rgba(191, 96, 56, 0.38);
}

.dock-icon {
  font-size: 2.2rem;
  color: #ffffff;
  transition: transform 250ms ease;
}

.dock-launcher-btn.active .dock-icon {
  font-variation-settings: "FILL" 1, "wght" 500;
  transform: scale(1.05);
}

/* Tooltip on hover */
.dock-tooltip {
  position: absolute;
  left: calc(100% + 1.2rem);
  top: 50%;
  transform: translateY(-50%) translateX(-8px);
  padding: 0.5rem 1.1rem;
  background: var(--md-sys-color-surface-container-high, #f2d8c7);
  color: var(--md-sys-color-on-surface, #221a16);
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.8rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 200ms ease, transform 200ms ease;
  z-index: 1000;
}

.dock-launcher-btn:hover .dock-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ==========================================================================
   GOOGLE PIXEL MOBILE MATERIAL 3 BOTTOM NAVIGATION BAR (80PX SPEC)
   ========================================================================== */
.m3-bottom-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(8rem + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.94));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-top: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.12));
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.08);
}

[theme="dark"] .m3-bottom-nav-bar {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.94));
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.4);
}

.m3-nav-destination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  transition: color 200ms ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.m3-nav-icon-container {
  position: relative;
  width: 6.4rem;
  height: 3.2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.m3-nav-icon {
  font-size: 2.4rem;
  transition: font-variation-settings 200ms ease, transform 200ms ease, color 200ms ease;
}

.m3-nav-label {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: font-weight 200ms ease, color 200ms ease;
}

/* Active destination state */
.m3-nav-destination.selected {
  color: var(--md-sys-color-on-surface, #221a16);
}

.m3-nav-destination.selected .m3-nav-icon-container {
  background-color: #ffd2b8;
  box-shadow: 0 1px 4px rgba(191, 96, 56, 0.18);
}

[theme="dark"] .m3-nav-destination.selected .m3-nav-icon-container {
  background-color: #723214;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.m3-nav-destination.selected .m3-nav-icon {
  color: #3b1404;
  font-variation-settings: "FILL" 1, "wght" 600;
}

[theme="dark"] .m3-nav-destination.selected .m3-nav-icon {
  color: #ffdccf;
  font-variation-settings: "FILL" 1, "wght" 600;
}

.m3-nav-destination.selected .m3-nav-label {
  font-weight: 700;
  color: #221a16;
}

[theme="dark"] .m3-nav-destination.selected .m3-nav-label {
  color: #ede0db;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  theme: "light" | "dark";
  currentTab?: "home" | "repos" | "blog" | "article" | "contact";
}>();

const emit = defineEmits<{
  (e: "toggle-theme"): void;
}>();

const currentTime = ref("");
let timer: number | null = null;

function updateTime() {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  currentTime.value = `${hours}:${mStr}`;
}

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 5000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <header class="tablet-status-bar" aria-label="Device Status Bar">
    <!-- Left status items -->
    <div class="status-left">
      <Transition name="fade-clock">
        <span v-if="currentTab !== 'home'" class="status-time">{{ currentTime }}</span>
      </Transition>
      <span class="status-badge">Pixel Tablet</span>
    </div>

    <!-- Right status icons -->
    <div class="status-right">
      <!-- Network / Wifi -->
      <span class="material-symbols-rounded status-icon" title="Wi-Fi Connected">wifi</span>
      
      <!-- Battery Status -->
      <div class="battery-indicator" title="Battery 100%">
        <span class="material-symbols-rounded status-icon">battery_full</span>
        <span class="battery-text">100%</span>
      </div>

      <!-- Quick Theme Switcher Button -->
      <button
        type="button"
        class="status-theme-btn"
        :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        @click="emit('toggle-theme')"
      >
        <md-ripple></md-ripple>
        <span class="material-symbols-rounded theme-quick-icon">
          {{ theme === "dark" ? "light_mode" : "dark_mode" }}
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.tablet-status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 90;
  user-select: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-family: "JetBrains Mono", monospace;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.status-time {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.fade-clock-enter-active,
.fade-clock-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}

.fade-clock-enter-from,
.fade-clock-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}

.status-badge {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.2rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-right {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.status-icon {
  font-size: 1.8rem;
}

.battery-indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.battery-text {
  font-size: 1.2rem;
  font-weight: 600;
}

.status-theme-btn {
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: transform 200ms ease, background-color 200ms ease;
}

.status-theme-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.theme-quick-icon {
  font-size: 1.8rem;
}

@media (max-width: 768px) {
  .tablet-status-bar {
    height: 3.4rem;
    padding: 0 1.4rem;
  }
  .status-badge {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  theme: "light" | "dark";
  currentTab?: "home" | "repos" | "blog" | "article" | "contact";
  isMobile?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-theme"): void;
}>();

// Check if device is a mobile phone
const isMobileDevice = computed(() => {
  if (props.isMobile) return true;
  if (typeof navigator !== "undefined") {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }
  return false;
});

// =============================================================================
// Time Display
// =============================================================================
const currentTime = ref("");
let timer: number | null = null;

function updateTime() {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  currentTime.value = `${hours}:${mStr}`;
}

// =============================================================================
// Battery Status API
// =============================================================================
interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}

const hasBatteryApi = ref<boolean>(false);
const batteryLevel = ref<number>(100);
const isCharging = ref<boolean>(false);
let batteryManager: BatteryManager | null = null;

const onBatteryChange = () => {
  if (batteryManager) {
    batteryLevel.value = Math.round(batteryManager.level * 100);
    isCharging.value = batteryManager.charging;
  }
};

const batteryIcon = computed(() => {
  if (!hasBatteryApi.value) {
    return "battery_full";
  }
  const lvl = batteryLevel.value;
  if (isCharging.value) {
    if (lvl >= 90) return "battery_charging_full";
    if (lvl >= 70) return "battery_charging_80";
    if (lvl >= 50) return "battery_charging_60";
    if (lvl >= 30) return "battery_charging_50";
    if (lvl >= 15) return "battery_charging_30";
    return "battery_charging_20";
  }
  if (lvl >= 95) return "battery_full";
  if (lvl >= 85) return "battery_6_bar";
  if (lvl >= 70) return "battery_5_bar";
  if (lvl >= 55) return "battery_4_bar";
  if (lvl >= 40) return "battery_3_bar";
  if (lvl >= 25) return "battery_2_bar";
  if (lvl >= 10) return "battery_1_bar";
  return "battery_alert";
});

const batteryTitle = computed(() => {
  if (!hasBatteryApi.value) {
    return "Battery: System managed";
  }
  return `${isCharging.value ? "Charging" : "Battery"}: ${batteryLevel.value}%`;
});

// =============================================================================
// Network Information API & Online Status
// =============================================================================
const isOnline = ref<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
const connectionType = ref<string>("wifi");
const effectiveType = ref<string>("");
let networkConnection: any = null;

function updateNetworkInfo() {
  if (typeof navigator === "undefined") return;
  isOnline.value = navigator.onLine;

  const conn =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!navigator.onLine) {
    connectionType.value = "offline";
    effectiveType.value = "";
    return;
  }

  if (conn) {
    const rawEff = (conn.effectiveType || "").toLowerCase();
    effectiveType.value = rawEff ? rawEff.toUpperCase() : "";

    const type = (conn.type || "").toLowerCase();
    if (
      type === "cellular" ||
      type === "wimax" ||
      rawEff === "2g" ||
      rawEff === "3g" ||
      rawEff === "slow-2g" ||
      (conn.saveData && type !== "wifi") ||
      (isMobileDevice.value && type !== "wifi" && type !== "ethernet")
    ) {
      connectionType.value = "cellular";
    } else if (type === "ethernet") {
      connectionType.value = "ethernet";
    } else {
      connectionType.value = "wifi";
    }
  } else {
    // Browsers without Network Information API (e.g. iOS Safari)
    connectionType.value = isMobileDevice.value ? "cellular" : "wifi";
    effectiveType.value = "";
  }
}

function toggleNetworkType() {
  if (!isOnline.value) return;
  // Allow user to toggle between wifi and cellular if on a mobile or restricted environment
  connectionType.value = connectionType.value === "cellular" ? "wifi" : "cellular";
}

const networkIcon = computed(() => {
  if (!isOnline.value) return "wifi_off";
  if (connectionType.value === "cellular") return "signal_cellular_alt";
  if (connectionType.value === "ethernet") return "lan";
  return "wifi";
});

const networkTitle = computed(() => {
  if (!isOnline.value) return "Network: Offline";
  if (effectiveType.value) {
    return `${connectionType.value === "cellular" ? "Cellular Mobile Data" : "Wi-Fi"} (${effectiveType.value})`;
  }
  return `${connectionType.value === "cellular" ? "Cellular Mobile Data" : "Wi-Fi"} (Connected)`;
});

// =============================================================================
// Lifecycle Hooks
// =============================================================================
onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 5000);

  // Initialize Battery API
  if (
    typeof navigator !== "undefined" &&
    "getBattery" in navigator &&
    typeof (navigator as any).getBattery === "function"
  ) {
    (navigator as any)
      .getBattery()
      .then((bm: BatteryManager) => {
        batteryManager = bm;
        hasBatteryApi.value = true;
        onBatteryChange();
        bm.addEventListener("levelchange", onBatteryChange);
        bm.addEventListener("chargingchange", onBatteryChange);
        (bm as any).onlevelchange = onBatteryChange;
        (bm as any).onchargingchange = onBatteryChange;
      })
      .catch(() => {
        hasBatteryApi.value = false;
      });
  } else {
    hasBatteryApi.value = false;
  }

  // Initialize Network Info & Listeners
  updateNetworkInfo();
  window.addEventListener("online", updateNetworkInfo);
  window.addEventListener("offline", updateNetworkInfo);

  networkConnection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  if (networkConnection) {
    if (typeof networkConnection.addEventListener === "function") {
      networkConnection.addEventListener("change", updateNetworkInfo);
    }
    networkConnection.onchange = updateNetworkInfo;
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);

  if (batteryManager) {
    batteryManager.removeEventListener("levelchange", onBatteryChange);
    batteryManager.removeEventListener("chargingchange", onBatteryChange);
    (batteryManager as any).onlevelchange = null;
    (batteryManager as any).onchargingchange = null;
  }

  window.removeEventListener("online", updateNetworkInfo);
  window.removeEventListener("offline", updateNetworkInfo);

  if (networkConnection) {
    if (typeof networkConnection.removeEventListener === "function") {
      networkConnection.removeEventListener("change", updateNetworkInfo);
    }
    networkConnection.onchange = null;
  }
});
</script>

<template>
  <header class="tablet-status-bar" aria-label="Device Status Bar">
    <!-- Left status items -->
    <div class="status-left">
      <div class="status-clock-pill" title="Current Time">
        <span class="status-time">{{ currentTime }}</span>
      </div>
      <span class="status-badge">{{ isMobile ? "Phone" : "Desktop" }}</span>
    </div>

    <!-- Right status icons -->
    <div class="status-right">
      <!-- Network / Wifi -->
      <div
        class="network-indicator"
        :class="{ 'has-text': isOnline && !!effectiveType }"
        :title="networkTitle"
        role="button"
        tabindex="0"
        @click="toggleNetworkType"
        @keydown.enter="toggleNetworkType"
      >
        <span
          class="material-symbols-rounded status-icon"
          :class="{ 'is-offline': !isOnline }"
        >
          {{ networkIcon }}
        </span>
        <span v-if="isOnline && effectiveType" class="network-text">{{ effectiveType }}</span>
      </div>
      
      <!-- Battery Status -->
      <div
        class="battery-indicator"
        :class="{ 'icon-only': !hasBatteryApi }"
        :title="batteryTitle"
      >
        <span
          class="material-symbols-rounded status-icon"
          :class="{ 'is-charging': isCharging, 'is-low': hasBatteryApi && batteryLevel <= 20 }"
        >
          {{ batteryIcon }}
        </span>
        <span v-if="hasBatteryApi" class="battery-text">{{ batteryLevel }}%</span>
      </div>

      <!-- Material 3 Theme Mode Switch (Icon-only switch) -->
      <button
        type="button"
        class="status-theme-switch"
        :class="[`theme-${theme}`, { 'is-dark': theme === 'dark' }]"
        role="switch"
        :aria-checked="theme === 'dark'"
        :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        @click="emit('toggle-theme')"
      >
        <md-ripple></md-ripple>
        <span class="switch-thumb">
          <span class="material-symbols-rounded switch-thumb-icon">
            {{ theme === "dark" ? "light_mode" : "dark_mode" }}
          </span>
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
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 90;
  user-select: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0) 100%);
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-family: "JetBrains Mono", monospace;
}

/* ==========================================================================
   LEFT STATUS GROUP
   ========================================================================== */
.status-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
}

.status-clock-pill {
  height: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0 1.15rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
}

.clock-icon {
  font-size: 1.45rem;
  line-height: 1;
  opacity: 0.9;
}

.status-time {
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  font-family: "JetBrains Mono", monospace;
}

/* Matching height & styling with right-side pills */
.status-badge {
  height: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  box-sizing: border-box;
}

/* ==========================================================================
   RIGHT STATUS GROUP
   ========================================================================== */
.status-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
}

/* Network Indicator Circle / Pill */
.network-indicator {
  height: 2.8rem;
  width: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 200ms ease, border-color 200ms ease;
}

.network-indicator:hover {
  background: rgba(255, 255, 255, 0.22);
}

.network-indicator.has-text {
  width: auto;
  padding: 0 0.85rem;
  border-radius: 9999px;
  gap: 0.35rem;
}

.network-text {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.02em;
}

/* Battery Indicator Pill */
.battery-indicator {
  height: 2.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: default;
  box-sizing: border-box;
}

.battery-indicator.icon-only {
  width: 2.8rem;
  padding: 0;
  border-radius: 50%;
  justify-content: center;
}

.status-icon {
  font-size: 1.7rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 200ms ease;
}

.status-icon.is-offline {
  color: #ff8585;
}

.status-icon.is-charging {
  color: #8ce99a;
}

.status-icon.is-low {
  color: #ff8585;
}

.battery-text {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1;
  font-family: "JetBrains Mono", monospace;
}

/* ==========================================================================
   MATERIAL DESIGN 3 THEME MODE SWITCH (ICON-ONLY PILL)
   ========================================================================== */
.status-theme-switch {
  position: relative;
  height: 2.8rem;
  width: 4.8rem;
  border-radius: 9999px;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 250ms cubic-bezier(0.2, 0, 0, 1),
              border-color 250ms cubic-bezier(0.2, 0, 0, 1),
              transform 200ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 200ms ease;
}

.status-theme-switch:hover {
  transform: scale(1.04);
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
}

.status-theme-switch:active {
  transform: scale(0.96);
}

/* Switch Thumb */
.switch-thumb {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: #ffffff;
  color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  transform: translateX(0);
  transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
              background-color 250ms cubic-bezier(0.2, 0, 0, 1),
              color 250ms cubic-bezier(0.2, 0, 0, 1);
}

.switch-thumb-icon {
  font-size: 1.35rem;
  line-height: 1;
}

/* Dark Mode State: Thumb slides to active right position */
.theme-dark {
  background: rgba(255, 182, 140, 0.22);
  border-color: rgba(255, 182, 140, 0.4);
}

.theme-dark .switch-thumb {
  transform: translateX(2.0rem);
  background: #ffb68c;
  color: #432200;
}

/* ==========================================================================
   MOBILE VIEWPORT ADAPTATIONS (<= 768px)
   ========================================================================== */
@media (max-width: 768px) {
  .tablet-status-bar {
    height: calc(3.8rem + env(safe-area-inset-top, 0px));
    padding-top: env(safe-area-inset-top, 0px);
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  .status-left {
    gap: 0.8rem;
  }

  .status-clock-pill {
    height: 2.6rem;
    padding: 0 0.9rem;
    gap: 0.45rem;
  }

  .clock-icon {
    font-size: 1.35rem;
  }

  .status-time {
    font-size: 1.15rem;
  }

  .status-badge {
    height: 2.6rem;
    padding: 0 1rem;
    font-size: 1.15rem;
  }

  .status-right {
    gap: 0.8rem;
  }

  .network-indicator {
    height: 2.6rem;
    width: 2.6rem;
  }

  .network-indicator.has-text {
    width: auto;
    padding: 0 0.75rem;
    gap: 0.3rem;
  }

  .network-text {
    font-size: 1.1rem;
  }

  .network-indicator .status-icon {
    font-size: 1.55rem;
  }

  .battery-indicator {
    height: 2.6rem;
    padding: 0 0.8rem;
    gap: 0.35rem;
  }

  .battery-indicator.icon-only {
    width: 2.6rem;
    padding: 0;
  }

  .battery-indicator .status-icon {
    font-size: 1.55rem;
  }

  .battery-text {
    font-size: 1.15rem;
  }

  .status-theme-switch {
    height: 2.6rem;
    width: 4.4rem;
    padding: 0.2rem;
  }

  .switch-thumb {
    width: 1.95rem;
    height: 1.95rem;
  }

  .theme-dark .switch-thumb {
    transform: translateX(1.8rem);
  }

  .switch-thumb-icon {
    font-size: 1.25rem;
  }
}
</style>

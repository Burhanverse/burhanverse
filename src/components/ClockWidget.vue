<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const now = ref(new Date());
let timer: number | null = null;

const hours = computed(() => {
  const h = now.value.getHours() % 12;
  return h === 0 ? 12 : h;
});

const formattedHours = computed(() => {
  return hours.value < 10 ? `0${hours.value}` : `${hours.value}`;
});

const formattedMinutes = computed(() => {
  const m = now.value.getMinutes();
  return m < 10 ? `0${m}` : `${m}`;
});

const ampm = computed(() => {
  return now.value.getHours() >= 12 ? "PM" : "AM";
});

// Analog clock hand angles
const minuteAngle = computed(() => {
  const m = now.value.getMinutes();
  const s = now.value.getSeconds();
  return (m + s / 60) * 6; // 360 / 60 = 6 deg/min
});

const hourAngle = computed(() => {
  const h = now.value.getHours() % 12;
  const m = now.value.getMinutes();
  return (h + m / 60) * 30; // 360 / 12 = 30 deg/hour
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="pixel-clock-widget" title="Current Time">
    <!-- Scalloped Flower Background from Material Design 3 Shape 1 -->
    <div class="clock-scallop-bg">
      <svg class="scallop-svg" viewBox="-4 -4 328 328" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M136.697 9.84752C137.237 9.31752 137.508 9.0475 137.738 8.8275C150.248 -2.9425 169.748 -2.9425 182.258 8.8275C182.488 9.0475 182.758 9.31752 183.298 9.84752C183.628 10.1575 183.787 10.3174 183.937 10.4674C191.947 18.1074 203.278 21.1375 214.028 18.5275C214.238 18.4775 214.458 18.4175 214.898 18.3075C215.628 18.1175 215.998 18.0274 216.308 17.9474C233.018 14.0074 249.918 23.7574 254.858 40.2074C254.948 40.5174 255.048 40.8775 255.258 41.6075C255.378 42.0475 255.438 42.2674 255.498 42.4774C258.608 53.0874 266.908 61.3874 277.518 64.4974C277.728 64.5574 277.947 64.6174 278.387 64.7374C279.117 64.9474 279.478 65.0473 279.788 65.1373C296.238 70.0773 305.988 86.9774 302.048 103.687C301.968 103.997 301.878 104.368 301.688 105.098C301.578 105.538 301.518 105.757 301.468 105.967C298.858 116.717 301.888 128.047 309.528 136.057C309.678 136.207 309.837 136.367 310.147 136.697C310.677 137.237 310.947 137.507 311.167 137.737C322.937 150.247 322.937 169.747 311.167 182.257C310.947 182.487 310.677 182.757 310.147 183.297C309.837 183.627 309.678 183.787 309.528 183.937C301.888 191.947 298.858 203.277 301.468 214.027C301.518 214.237 301.578 214.457 301.688 214.897C301.878 215.627 301.968 215.997 302.048 216.307C305.988 233.017 296.238 249.918 279.788 254.858C279.478 254.948 279.117 255.047 278.387 255.257C277.947 255.377 277.728 255.437 277.518 255.497C266.908 258.607 258.608 266.907 255.498 277.517C255.438 277.727 255.378 277.947 255.258 278.387C255.048 279.117 254.948 279.477 254.858 279.787C249.918 296.237 233.018 305.987 216.308 302.047C215.998 301.967 215.628 301.877 214.898 301.687C214.458 301.577 214.238 301.517 214.028 301.467C203.278 298.857 191.947 301.887 183.937 309.527C183.787 309.677 183.628 309.837 183.298 310.147C182.758 310.677 182.488 310.947 182.258 311.167C169.748 322.937 150.248 322.937 137.738 311.167C137.508 310.947 137.237 310.677 136.697 310.147C136.367 309.837 136.208 309.677 136.058 309.527C128.048 301.887 116.718 298.857 105.968 301.467C105.758 301.517 105.538 301.577 105.098 301.687C104.368 301.877 103.997 301.967 103.687 302.047C86.9775 305.987 70.0776 296.237 65.1376 279.787C65.0476 279.477 64.9475 279.117 64.7375 278.387C64.6175 277.947 64.5575 277.727 64.4975 277.517C61.3875 266.907 53.0875 258.607 42.4775 255.497C42.2675 255.437 42.0475 255.377 41.6075 255.257C40.8775 255.047 40.5175 254.948 40.2075 254.858C23.7575 249.918 14.0075 233.017 17.9475 216.307C18.0275 215.997 18.1176 215.627 18.3076 214.897C18.4176 214.457 18.4776 214.237 18.5276 214.027C21.1376 203.277 18.1075 191.947 10.4675 183.937C10.3175 183.787 10.1575 183.627 9.84752 183.297C9.31752 182.757 9.0475 182.487 8.8275 182.257C-2.9425 169.747 -2.9425 150.247 8.8275 137.737C9.0475 137.507 9.31752 137.237 9.84752 136.697C10.1575 136.367 10.3175 136.207 10.4675 136.057C18.1075 128.047 21.1376 116.717 18.5276 105.967C18.4776 105.757 18.4176 105.538 18.3076 105.098C18.1176 104.368 18.0275 103.997 17.9475 103.687C14.0075 86.9774 23.7575 70.0773 40.2075 65.1373C40.5175 65.0473 40.8775 64.9474 41.6075 64.7374C42.0475 64.6174 42.2675 64.5574 42.4775 64.4974C53.0875 61.3874 61.3875 53.0874 64.4975 42.4774C64.5575 42.2674 64.6175 42.0475 64.7375 41.6075C64.9475 40.8775 65.0476 40.5174 65.1376 40.2074C70.0776 23.7574 86.9775 14.0074 103.687 17.9474C103.997 18.0274 104.368 18.1175 105.098 18.3075C105.538 18.4175 105.758 18.4775 105.968 18.5275C116.718 21.1375 128.048 18.1074 136.058 10.4674C136.208 10.3174 136.367 10.1575 136.697 9.84752Z"
          class="scallop-fill"
        />
      </svg>
    </div>

    <!-- Analog Clock Hands -->
    <div class="analog-hands-container">
      <div class="analog-hand hour-hand" :style="{ transform: `rotate(${hourAngle}deg)` }"></div>
      <div class="analog-hand minute-hand" :style="{ transform: `rotate(${minuteAngle}deg)` }"></div>
      <div class="clock-pivot"></div>
    </div>

    <!-- Digital Time Overlay (Centered like in the mockup) -->
    <div class="digital-time-overlay">
      <span class="digital-hours">{{ formattedHours }}</span>
      <span class="digital-minutes">{{ formattedMinutes }}</span>
      <span class="digital-ampm">{{ ampm }}</span>
    </div>
  </div>
</template>

<style scoped>
.pixel-clock-widget {
  position: relative;
  width: 21rem;
  height: 21rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.08));
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

[theme="dark"] .pixel-clock-widget {
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.5));
}

.pixel-clock-widget:hover {
  transform: scale(1.04);
}

.clock-scallop-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.scallop-svg {
  width: 100%;
  height: 100%;
}

.scallop-fill {
  fill: var(--md-sys-color-clock-bg, #fdf1e6);
  transition: fill 300ms ease;
}

/* Analog Hands */
.analog-hands-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.analog-hand {
  position: absolute;
  left: 50%;
  border-radius: 9999px;
  transition: transform 300ms cubic-bezier(0.4, 2.08, 0.55, 0.44);
}

.hour-hand {
  width: 1.8rem;
  height: 6.2rem;
  margin-left: -0.9rem;
  bottom: calc(50% - 0.9rem);
  transform-origin: center calc(100% - 0.9rem);
  background-color: var(--md-sys-color-clock-hour-hand, #ebd28e);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
}

.minute-hand {
  width: 1.6rem;
  height: 8.2rem;
  margin-left: -0.8rem;
  bottom: calc(50% - 0.8rem);
  transform-origin: center calc(100% - 0.8rem);
  background-color: var(--md-sys-color-clock-min-hand, #6b4330);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}

.clock-pivot {
  display: none;
}

/* Digital Time Overlay */
.digital-time-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0.82;
  font-family: "Nunito Sans", "Lexend Deca", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 800;
  text-align: center;
  user-select: none;
}

.digital-hours {
  font-size: 6.2rem;
  color: var(--md-sys-color-clock-digits, #c27c36);
  letter-spacing: -0.04em;
}

.digital-minutes {
  font-size: 6.2rem;
  color: var(--md-sys-color-clock-digits, #c27c36);
  letter-spacing: -0.04em;
}

.digital-ampm {
  font-family: "Nunito Sans", "Lexend Deca", sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--md-sys-color-clock-ampm, #a1642f);
  margin-top: 0.4rem;
}

@media (max-width: 768px) {
  .pixel-clock-widget {
    width: 17.5rem;
    height: 17.5rem;
  }
  .digital-hours,
  .digital-minutes {
    font-size: 5.0rem;
  }
  .digital-ampm {
    font-size: 1.4rem;
    margin-top: 0.25rem;
  }
  .hour-hand {
    width: 1.5rem;
    height: 5.0rem;
    margin-left: -0.75rem;
    bottom: calc(50% - 0.75rem);
    transform-origin: center calc(100% - 0.75rem);
  }
  .minute-hand {
    width: 1.35rem;
    height: 6.8rem;
    margin-left: -0.675rem;
    bottom: calc(50% - 0.675rem);
    transform-origin: center calc(100% - 0.675rem);
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "small" | "medium" | "large" | number;
    contained?: boolean;
    label?: string;
    thickness?: "standard" | "thick";
  }>(),
  {
    size: "medium",
    contained: false,
    label: "",
    thickness: "thick",
  }
);

const wavyPath = "M 86.00 50.00 C 87.06 51.18, 88.37 52.52, 88.99 53.84 C 89.61 55.16, 89.97 56.65, 89.72 57.90 C 89.47 59.16, 88.57 60.39, 87.49 61.37 C 86.42 62.35, 84.68 63.09, 83.26 63.78 C 81.83 64.46, 80.12 64.85, 78.94 65.47 C 77.76 66.09, 76.79 66.61, 76.19 67.50 C 75.60 68.39, 75.49 69.49, 75.37 70.82 C 75.25 72.15, 75.54 73.88, 75.46 75.46 C 75.37 77.03, 75.35 78.92, 74.86 80.29 C 74.36 81.66, 73.57 82.96, 72.50 83.67 C 71.44 84.39, 69.92 84.62, 68.47 84.56 C 67.02 84.49, 65.27 83.78, 63.78 83.26 C 62.29 82.73, 60.80 81.80, 59.53 81.40 C 58.25 81.01, 57.20 80.69, 56.15 80.89 C 55.09 81.10, 54.24 81.81, 53.22 82.66 C 52.19 83.51, 51.18 84.94, 50.00 86.00 C 48.82 87.06, 47.48 88.37, 46.16 88.99 C 44.84 89.61, 43.35 89.97, 42.10 89.72 C 40.84 89.47, 39.61 88.57, 38.63 87.49 C 37.65 86.42, 36.91 84.68, 36.22 83.26 C 35.54 81.83, 35.15 80.12, 34.53 78.94 C 33.91 77.76, 33.39 76.79, 32.50 76.19 C 31.61 75.60, 30.51 75.49, 29.18 75.37 C 27.85 75.25, 26.12 75.54, 24.54 75.46 C 22.97 75.37, 21.08 75.35, 19.71 74.86 C 18.34 74.36, 17.04 73.57, 16.33 72.50 C 15.61 71.44, 15.38 69.92, 15.44 68.47 C 15.51 67.02, 16.22 65.27, 16.74 63.78 C 17.27 62.29, 18.20 60.80, 18.60 59.53 C 18.99 58.25, 19.31 57.20, 19.11 56.15 C 18.90 55.09, 18.19 54.24, 17.34 53.22 C 16.49 52.19, 15.06 51.18, 14.00 50.00 C 12.94 48.82, 11.63 47.48, 11.01 46.16 C 10.39 44.84, 10.03 43.35, 10.28 42.10 C 10.53 40.84, 11.43 39.61, 12.51 38.63 C 13.58 37.65, 15.32 36.91, 16.74 36.22 C 18.17 35.54, 19.88 35.15, 21.06 34.53 C 22.24 33.91, 23.21 33.39, 23.81 32.50 C 24.40 31.61, 24.51 30.51, 24.63 29.18 C 24.75 27.85, 24.46 26.12, 24.54 24.54 C 24.63 22.97, 24.65 21.08, 25.14 19.71 C 25.64 18.34, 26.43 17.04, 27.50 16.33 C 28.56 15.61, 30.08 15.38, 31.53 15.44 C 32.98 15.51, 34.73 16.22, 36.22 16.74 C 37.71 17.27, 39.20 18.20, 40.47 18.60 C 41.75 18.99, 42.80 19.31, 43.85 19.11 C 44.91 18.90, 45.76 18.19, 46.78 17.34 C 47.81 16.49, 48.82 15.06, 50.00 14.00 C 51.18 12.94, 52.52 11.63, 53.84 11.01 C 55.16 10.39, 56.65 10.03, 57.90 10.28 C 59.16 10.53, 60.39 11.43, 61.37 12.51 C 62.35 13.58, 63.09 15.32, 63.78 16.74 C 64.46 18.17, 64.85 19.88, 65.47 21.06 C 66.09 22.24, 66.61 23.21, 67.50 23.81 C 68.39 24.40, 69.49 24.51, 70.82 24.63 C 72.15 24.75, 73.88 24.46, 75.46 24.54 C 77.03 24.63, 78.92 24.65, 80.29 25.14 C 81.66 25.64, 82.96 26.43, 83.67 27.50 C 84.39 28.56, 84.62 30.08, 84.56 31.53 C 84.49 32.98, 83.78 34.73, 83.26 36.22 C 82.73 37.71, 81.80 39.20, 81.40 40.47 C 81.01 41.75, 80.69 42.80, 80.89 43.85 C 81.10 44.91, 81.81 45.76, 82.66 46.78 C 83.51 47.81, 84.94 48.82, 86.00 50.00 Z";

const pixelSize = computed(() => {
  if (typeof props.size === "number") return `${props.size}px`;
  if (props.size === "small") return "3.2rem";
  if (props.size === "large") return "7.2rem";
  return "4.8rem";
});

const strokeWidth = computed(() => {
  if (props.thickness === "standard") return 5.5;
  return 8.5;
});
</script>

<template>
  <div
    class="m3-progress-indicator-root"
    :class="{ 'with-label': !!label, 'is-contained': contained }"
    role="progressbar"
    aria-label="Loading"
    aria-live="polite"
  >
    <div
      class="m3-progress-spinner-box"
      :style="{ width: pixelSize, height: pixelSize }"
    >
      <svg
        class="m3-progress-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          v-if="contained"
          class="m3-track-disk"
          cx="50"
          cy="50"
          r="50"
        />

        <g class="m3-wavy-spin-group">
          <circle
            class="m3-wavy-base-track"
            cx="50"
            cy="50"
            r="36"
            :stroke-width="strokeWidth"
          />

          <path
            class="m3-wavy-active-arc"
            :d="wavyPath"
            :stroke-width="strokeWidth"
          />
        </g>
      </svg>
    </div>
    <span v-if="label" class="m3-progress-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.m3-progress-indicator-root {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  user-select: none;
}

.m3-progress-spinner-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.m3-progress-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.m3-track-disk {
  fill: var(--md-sys-color-surface-container-low, rgba(255, 255, 255, 0.45));
  stroke: var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.15));
  stroke-width: 1.5;
  transition: fill 250ms ease, stroke 250ms ease;
}

[theme="dark"] .m3-track-disk {
  fill: rgba(30, 27, 24, 0.65);
  stroke: rgba(255, 181, 157, 0.15);
}

.m3-wavy-spin-group {
  transform-origin: 50px 50px;
  animation: m3-expressive-wavy-spin 4.8s linear infinite;
}

.m3-wavy-base-track {
  fill: none;
  stroke: var(--md-sys-color-surface-container-highest, rgba(191, 96, 56, 0.2));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 226.2;
  stroke-dashoffset: 0;
  transform-origin: 50px 50px;
  animation: m3-expressive-track-dash 4.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transition: stroke 250ms ease;
}

[theme="dark"] .m3-wavy-base-track {
  stroke: rgba(255, 181, 157, 0.22);
}

/* Active Wavy Arc (Material 3 Expressive Sinusoidal Dash Animation) */
.m3-wavy-active-arc {
  fill: none;
  stroke: var(--md-sys-color-primary, #bf6038);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 275;
  stroke-dashoffset: 0;
  transform-origin: 50px 50px;
  animation: m3-expressive-wavy-dash 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transition: stroke 250ms ease;
}

[theme="dark"] .m3-wavy-active-arc {
  stroke: var(--md-sys-color-primary, #ffb59d);
}

@keyframes m3-expressive-wavy-dash {
  0% {
    stroke-dasharray: 8 275;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 190 275;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 8 275;
    stroke-dashoffset: -273;
  }
}

@keyframes m3-expressive-track-dash {
  0% {
    stroke-dasharray: 182 226.2;
    stroke-dashoffset: -18;
  }
  50% {
    stroke-dasharray: 32 226.2;
    stroke-dashoffset: -185;
  }
  100% {
    stroke-dasharray: 182 226.2;
    stroke-dashoffset: -244;
  }
}

@keyframes m3-expressive-wavy-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.m3-progress-label {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  text-align: center;
}

[theme="dark"] .m3-progress-label {
  color: var(--md-sys-color-on-surface-variant, #d7c2b9);
}
</style>

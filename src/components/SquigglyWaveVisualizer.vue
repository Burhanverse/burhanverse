<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    isPlaying?: boolean;
    height?: number;
    speed?: number;
  }>(),
  {
    isPlaying: false,
    height: 16,
    speed: 1.45,
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimeout: number | null = null;
let lastTimestamp: number | null = null;

const wavelength = 36; 
const maxAmplitude = 3.2;
let currentAmplitude = props.isPlaying ? maxAmplitude : 0;
let phase = 0;

function draw(timestamp: number) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (width === 0 || height === 0) return;

  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }

  const dt = lastTimestamp !== null ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0.016;
  lastTimestamp = timestamp;

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const cy = height / 2;
  const startX = 4;
  const endX = width - 8;

  const computedStyle = getComputedStyle(canvas);
  const primaryColor = computedStyle.getPropertyValue("--md-sys-color-primary").trim() || "#bf6038";

  const targetAmplitude = props.isPlaying ? maxAmplitude : 0;
  currentAmplitude += (targetAmplitude - currentAmplitude) * (1 - Math.exp(-8 * dt));

  if (props.isPlaying || currentAmplitude > 0.02) {
    phase += props.speed * dt;
  }

  ctx.beginPath();
  const totalLength = endX - startX;
  const step = 1;

  for (let x = 0; x <= totalLength; x += step) {
    const px = startX + x;
    const taper = Math.min(x / 14, (totalLength - x) / 14, 1);
    const py = cy + currentAmplitude * taper * Math.sin(x * (2 * Math.PI / wavelength) - phase);
    if (x === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.restore();

  if (props.isPlaying || currentAmplitude > 0.01) {
    animationFrameId = requestAnimationFrame(draw);
  } else {
    animationFrameId = null;
    lastTimestamp = null;
  }
}

function startAnimation() {
  if (!animationFrameId) {
    lastTimestamp = null;
    animationFrameId = requestAnimationFrame(draw);
  }
}

watch(
  () => props.isPlaying,
  () => {
    startAnimation();
  }
);

onMounted(() => {
  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        startAnimation();
      }, 150);
    });
    resizeObserver.observe(canvasRef.value);
  }
  startAnimation();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
    resizeTimeout = null;
  }
});
</script>

<template>
  <div class="squiggly-visualizer-container" :style="{ height: `${height}px` }">
    <canvas ref="canvasRef" class="squiggly-canvas"></canvas>
  </div>
</template>

<style scoped>
.squiggly-visualizer-container {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  overflow: hidden;
}

.squiggly-canvas {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  display: block;
}
</style>

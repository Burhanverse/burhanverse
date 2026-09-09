<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const now = ref(new Date());
let timer: number | null = null;

const formattedDate = computed(() => {
  return now.value.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
});

const dayProgress = computed(() => {
  const start = new Date(now.value);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.value);
  end.setHours(23, 59, 59, 999);
  const elapsed = now.value.getTime() - start.getTime();
  const total = end.getTime() - start.getTime();
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 10000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="at-a-glance-pill" title="At a Glance: Date and Day Progress">
    <div class="glance-left">
      <span class="material-symbols-rounded glance-icon">calendar_today</span>
      <span class="glance-date">{{ formattedDate }}</span>
    </div>
    <div class="glance-divider"></div>
    <div class="glance-right">
      <span class="material-symbols-rounded glance-sun-icon">wb_sunny</span>
      <span class="glance-vibe">Study Session</span>
      <span class="glance-day-pct">{{ dayProgress }}%</span>
    </div>
  </div>
</template>

<style scoped>
.at-a-glance-pill {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.4rem;
  background: var(--md-sys-color-surface-container-low, rgba(255, 248, 245, 0.85));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  user-select: none;
  font-family: "Lexend Deca", sans-serif;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

[theme="dark"] .at-a-glance-pill {
  background: var(--md-sys-color-surface-container-low, rgba(28, 20, 16, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.at-a-glance-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

[theme="dark"] .at-a-glance-pill:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.glance-left,
.glance-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.glance-icon {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.glance-sun-icon {
  font-size: 1.6rem;
  color: var(--md-sys-color-secondary, #81552a);
}

.glance-date {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface, #221a16);
}

.glance-divider {
  width: 1px;
  height: 1.4rem;
  background-color: var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.3));
}

.glance-vibe {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant, #52443d);
}

.glance-day-pct {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  background: var(--md-sys-color-primary-container, #faebd4);
  padding: 0.1rem 0.6rem;
  border-radius: 9999px;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const now = ref(new Date());
let timer: number | null = null;
let weatherTimer: number | null = null;

interface WeatherState {
  temp: string;
  condition: string;
  icon: string;
}

const weather = ref<WeatherState>({
  temp: "29°C",
  condition: "Mostly Clear",
  icon: "wb_sunny",
});

const formattedDate = computed(() => {
  return now.value.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
});

const formattedDateLong = computed(() => {
  return now.value.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
});

function getWeatherInfo(code: number, isDay = true): { condition: string; icon: string } {
  if (code === 0) {
    return { condition: isDay ? "Clear" : "Clear Night", icon: isDay ? "wb_sunny" : "bedtime" };
  }
  if (code === 1) {
    return { condition: isDay ? "Mostly Clear" : "Mostly Clear", icon: isDay ? "sunny" : "partly_cloudy_night" };
  }
  if (code === 2) {
    return { condition: "Partly Cloudy", icon: isDay ? "partly_cloudy_day" : "partly_cloudy_night" };
  }
  if (code === 3) {
    return { condition: "Overcast", icon: "cloud" };
  }
  if (code === 45 || code === 48) {
    return { condition: "Foggy", icon: "foggy" };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { condition: "Drizzle", icon: "rainy_light" };
  }
  if ([61, 63, 65, 66, 67].includes(code)) {
    return { condition: "Rain", icon: "rainy" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { condition: "Snow", icon: "weather_snowy" };
  }
  if ([80, 81, 82].includes(code)) {
    return { condition: "Showers", icon: "rainy_heavy" };
  }
  if ([95, 96, 99].includes(code)) {
    return { condition: "Storm", icon: "thunderstorm" };
  }
  return { condition: isDay ? "Sunny" : "Clear", icon: isDay ? "wb_sunny" : "bedtime" };
}

async function fetchWeather() {
  let lat = 26.2006;
  let lon = 92.9376;

  try {
    if ("geolocation" in navigator) {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000, maximumAge: 600000 });
      }).catch(() => null);
      if (pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
      }
    }
  } catch {
    // fallback to Assam coordinates
  }

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.current) {
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        const isDay = data.current.is_day === 1;
        const info = getWeatherInfo(code, isDay);
        weather.value = {
          temp: `${temp}°C`,
          condition: info.condition,
          icon: info.icon,
        };
      }
    }
  } catch (err) {
    console.warn("Could not fetch live weather from Open-Meteo, using fallback:", err);
    weather.value = {
      temp: "29°C",
      condition: "Mostly Clear",
      icon: "wb_sunny",
    };
  }
}

onMounted(() => {
  fetchWeather();
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 10000);
  // Refresh weather every 15 minutes
  weatherTimer = window.setInterval(fetchWeather, 900000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (weatherTimer) clearInterval(weatherTimer);
});
</script>

<template>
  <div class="at-a-glance-pill" :title="`At a Glance: ${formattedDateLong} • ${weather.temp} ${weather.condition}`">
    <div class="glance-left">
      <span class="material-symbols-rounded glance-icon">calendar_today</span>
      <span class="glance-date glance-date-long">{{ formattedDateLong }}</span>
      <span class="glance-date glance-date-short">{{ formattedDate }}</span>
    </div>
    <div class="glance-divider"></div>
    <div class="glance-right">
      <span class="material-symbols-rounded glance-weather-icon">{{ weather.icon }}</span>
      <span class="glance-temp">{{ weather.temp }}</span>
      <span class="glance-condition">{{ weather.condition }}</span>
    </div>
  </div>
</template>

<style scoped>
.at-a-glance-pill {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.6rem 1.4rem;
  background: var(--md-sys-color-surface-container-low, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(191, 96, 56, 0.15);
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  user-select: none;
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  transition: transform 200ms ease, box-shadow 200ms ease;
  max-width: 100%;
  box-sizing: border-box;
}

[theme="dark"] .at-a-glance-pill {
  background: var(--md-sys-color-surface-container-low, rgba(28, 20, 16, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
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
  flex-shrink: 0;
}

.glance-icon {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.glance-weather-icon {
  font-size: 1.8rem;
  color: var(--md-sys-color-secondary, #b86e24);
  font-variation-settings: "FILL" 1, "wght" 600;
}

.glance-date {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface, #221a16);
  white-space: nowrap;
}

.glance-date-short {
  display: none;
}

.glance-divider {
  width: 1px;
  height: 1.4rem;
  background-color: var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.3));
}

.glance-temp {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  white-space: nowrap;
}

.glance-condition {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  white-space: nowrap;
}

@media (max-width: 520px) {
  .at-a-glance-pill {
    padding: 0.55rem 1.2rem;
    gap: 0.8rem;
  }
  .glance-date-long {
    display: none;
  }
  .glance-date-short {
    display: inline;
  }
  .glance-date,
  .glance-temp,
  .glance-condition {
    font-size: 1.25rem;
  }
}

@media (max-width: 380px) {
  .glance-condition {
    display: none;
  }
}
</style>

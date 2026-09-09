<script setup lang="ts">
import ClockWidget from "../ClockWidget.vue";
import LastFmWidget from "../LastFmWidget.vue";
import AtAGlanceWidget from "../AtAGlanceWidget.vue";
import ProfileWidget from "../ProfileWidget.vue";
import StatsWidgets from "../StatsWidgets.vue";

defineProps<{
  isMobile: boolean;
}>();
</script>

<template>
  <div class="homescreen-view">
    <!-- Desktop / Tablet Layout (Faithful to Mockup) -->
    <div v-if="!isMobile" class="tablet-homescreen-grid">
      <!-- Left Widget Column (Mockup Position: Flower Clock on top, Media Pill on bottom) -->
      <div class="mockup-left-col">
        <ClockWidget />
        <div class="spacer-fill"></div>
        <LastFmWidget />
      </div>

      <!-- Right Widget Column (Profile, At-a-Glance, Stats Cards) -->
      <div class="mockup-right-col">
        <div class="glance-row">
          <AtAGlanceWidget />
        </div>
        <ProfileWidget />
        <StatsWidgets />
      </div>
    </div>

    <!-- Mobile Google Pixel Phone Layout -->
    <div v-else class="mobile-pixel-homescreen">
      <div class="mobile-glance-row">
        <AtAGlanceWidget />
      </div>
      <div class="mobile-clock-row">
        <ClockWidget />
      </div>
      <div class="mobile-media-row">
        <LastFmWidget />
      </div>
      <ProfileWidget />
      <StatsWidgets />
    </div>
  </div>
</template>

<style scoped>
.homescreen-view {
  width: 100%;
  max-width: 132rem;
  margin: 0 auto;
  padding: 2rem 2rem 5rem 9rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ==========================================================================
   DESKTOP / TABLET GRID (MATCHING MOCKUP SPATIAL COMPOSITION)
   ========================================================================== */
.tablet-homescreen-grid {
  display: grid;
  grid-template-columns: 34rem 1fr;
  gap: 3.2rem;
  align-items: stretch;
  min-height: 54rem;
}

.mockup-left-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 1rem;
}

.spacer-fill {
  flex: 1;
  min-height: 4rem;
}

.mockup-right-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
}

.glance-row {
  display: flex;
  justify-content: flex-start;
}

/* ==========================================================================
   GOOGLE PIXEL PHONE HOMESCREEN (STACKED)
   ========================================================================== */
.mobile-pixel-homescreen {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
  width: 100%;
}

.mobile-glance-row {
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
}

.mobile-clock-row {
  display: flex;
  justify-content: center;
  margin-block: 1.4rem;
}

.mobile-media-row {
  width: 100%;
  display: flex;
}

@media (max-width: 1024px) and (min-width: 769px) {
  .tablet-homescreen-grid {
    grid-template-columns: 28rem 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .homescreen-view {
    padding: 1rem 1.6rem 2.4rem 1.6rem;
    min-height: auto;
    justify-content: flex-start;
  }
}
</style>

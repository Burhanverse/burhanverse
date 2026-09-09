<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { fetchLastFmSummary } from "../features/statsCards/lastfmService";
import type { LastFmTrack } from "../features/statsCards/types";

import playIcon from "../assets/play.svg?raw";
import pauseIcon from "../assets/pause.svg?raw";
import SquigglyWaveVisualizer from "./SquigglyWaveVisualizer.vue";

const track = ref<LastFmTrack | null>(null);
const totalScrobbles = ref<number | null>(null);
const isLoading = ref(true);
let pollTimer: number | null = null;

const env = import.meta.env as Record<string, string | undefined>;
const lastfmApiKey = env.VITE_LASTFM_API_KEY;
const lastfmUsername = env.VITE_LASTFM_USERNAME || "Burhanverse";

const isNowPlaying = computed(() => Boolean(track.value?.nowPlaying));

async function loadLastFm() {
  if (!lastfmApiKey || !lastfmUsername) {
    track.value = {
      name: "Cozy Lofi Study Session",
      artist: "Burhanverse Radio",
      album: "Autumn Sunset Lofi",
      image: "",
      url: "https://www.last.fm",
      nowPlaying: true,
    };
    totalScrobbles.value = 1420;
    isLoading.value = false;
    return;
  }

  try {
    const summary = await fetchLastFmSummary(lastfmUsername, lastfmApiKey);
    totalScrobbles.value = summary.playcount;
    if (summary.track) {
      track.value = summary.track;
    } else {
      track.value = {
        name: "No Recent Scrobbles",
        artist: "Last.fm",
        album: "",
        image: "",
        url: `https://www.last.fm/user/${lastfmUsername}`,
        nowPlaying: false,
      };
    }
  } catch (error) {
    console.warn("Could not fetch Last.fm data, using fallback vibe:", error);
    track.value = {
      name: "Cozy Lofi Study Session",
      artist: "Burhanverse Radio",
      album: "Autumn Sunset Lofi",
      image: "",
      url: "https://www.last.fm",
      nowPlaying: true,
    };
  } finally {
    isLoading.value = false;
  }
}

function openTrack() {
  if (track.value?.url) {
    window.open(track.value.url, "_blank", "noopener,noreferrer");
  }
}

onMounted(() => {
  loadLastFm();
  pollTimer = window.setInterval(loadLastFm, 10000);
});

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<template>
  <div
    class="lastfm-scrobble-pill"
    :class="{ 'is-now-playing': isNowPlaying }"
    :title="isNowPlaying ? 'Currently playing on Last.fm • Click to open' : (track?.playedAt ? `Scrobbled ${track.playedAt} • Click to open` : 'Click to open on Last.fm')"
    @click="openTrack"
  >
    <md-ripple></md-ripple>

    <div class="pill-artwork-wrapper">
      <div class="scallop-mask-container">
        <svg class="pill-scallop-svg" viewBox="-4 -4 328 328" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="scallopCoverMask">
              <path
                d="M136.697 9.84752C137.237 9.31752 137.508 9.0475 137.738 8.8275C150.248 -2.9425 169.748 -2.9425 182.258 8.8275C182.488 9.0475 182.758 9.31752 183.298 9.84752C183.628 10.1575 183.787 10.3174 183.937 10.4674C191.947 18.1074 203.278 21.1375 214.028 18.5275C214.238 18.4775 214.458 18.4175 214.898 18.3075C215.628 18.1175 215.998 18.0274 216.308 17.9474C233.018 14.0074 249.918 23.7574 254.858 40.2074C254.948 40.5174 255.048 40.8775 255.258 41.6075C255.378 42.0475 255.438 42.2674 255.498 42.4774C258.608 53.0874 266.908 61.3874 277.518 64.4974C277.728 64.5574 277.947 64.6174 278.387 64.7374C279.117 64.9474 279.478 65.0473 279.788 65.1373C296.238 70.0773 305.988 86.9774 302.048 103.687C301.968 103.997 301.878 104.368 301.688 105.098C301.578 105.538 301.518 105.757 301.468 105.967C298.858 116.717 301.888 128.047 309.528 136.057C309.678 136.207 309.837 136.367 310.147 136.697C310.677 137.237 310.947 137.507 311.167 137.737C322.937 150.247 322.937 169.747 311.167 182.257C310.947 182.487 310.677 182.757 310.147 183.297C309.837 183.627 309.678 183.787 309.528 183.937C301.888 191.947 298.858 203.277 301.468 214.027C301.518 214.237 301.578 214.457 301.688 214.897C301.878 215.627 301.968 215.997 302.048 216.307C305.988 233.017 296.238 249.918 279.788 254.858C279.478 254.948 279.117 255.047 278.387 255.257C277.947 255.377 277.728 255.437 277.518 255.497C266.908 258.607 258.608 266.907 255.498 277.517C255.438 277.727 255.378 277.947 255.258 278.387C255.048 279.117 254.948 279.477 254.858 279.787C249.918 296.237 233.018 305.987 216.308 302.047C215.998 301.967 215.628 301.877 214.898 301.687C214.458 301.577 214.238 301.517 214.028 301.467C203.278 298.857 191.947 301.887 183.937 309.527C183.787 309.677 183.628 309.837 183.298 310.147C182.758 310.677 182.488 310.947 182.258 311.167C169.748 322.937 150.248 322.937 137.738 311.167C137.508 310.947 137.237 310.677 136.697 310.147C136.367 309.837 136.208 309.677 136.058 309.527C128.048 301.887 116.718 298.857 105.968 301.467C105.758 301.517 105.538 301.577 105.098 301.687C104.368 301.877 103.997 301.967 103.687 302.047C86.9775 305.987 70.0776 296.237 65.1376 279.787C65.0476 279.477 64.9475 279.117 64.7375 278.387C64.6175 277.947 64.5575 277.727 64.4975 277.517C61.3875 266.907 53.0875 258.607 42.4775 255.497C42.2675 255.437 42.0475 255.377 41.6075 255.257C40.8775 255.047 40.5175 254.948 40.2075 254.858C23.7575 249.918 14.0075 233.017 17.9475 216.307C18.0275 215.997 18.1176 215.627 18.3076 214.897C18.4176 214.457 18.4776 214.237 18.5276 214.027C21.1376 203.277 18.1075 191.947 10.4675 183.937C10.3175 183.787 10.1575 183.627 9.84752 183.297C9.31752 182.757 9.0475 182.487 8.8275 182.257C-2.9425 169.747 -2.9425 150.247 8.8275 137.737C9.0475 137.507 9.31752 137.237 9.84752 136.697C10.1575 136.367 10.3175 136.207 10.4675 136.057C18.1075 128.047 21.1376 116.717 18.5276 105.967C18.4776 105.757 18.4176 105.538 18.3076 105.098C18.1176 104.368 18.0275 103.997 17.9475 103.687C14.0075 86.9774 23.7575 70.0773 40.2075 65.1373C40.5175 65.0473 40.8775 64.9474 41.6075 64.7374C42.0475 64.6174 42.2675 64.5574 42.4775 64.4974C53.0875 61.3874 61.3875 53.0874 64.4975 42.4774C64.5575 42.2674 64.6175 42.0475 64.7375 41.6075C64.9475 40.8775 65.0476 40.5174 65.1376 40.2074C70.0776 23.7574 86.9775 14.0074 103.687 17.9474C103.997 18.0274 104.368 18.1175 105.098 18.3075C105.538 18.4175 105.758 18.4775 105.968 18.5275C116.718 21.1375 128.048 18.1074 136.058 10.4674C136.208 10.3174 136.367 10.1575 136.697 9.84752Z"
              />
            </clipPath>
          </defs>

          <path
            d="M136.697 9.84752C137.237 9.31752 137.508 9.0475 137.738 8.8275C150.248 -2.9425 169.748 -2.9425 182.258 8.8275C182.488 9.0475 182.758 9.31752 183.298 9.84752C183.628 10.1575 183.787 10.3174 183.937 10.4674C191.947 18.1074 203.278 21.1375 214.028 18.5275C214.238 18.4775 214.458 18.4175 214.898 18.3075C215.628 18.1175 215.998 18.0274 216.308 17.9474C233.018 14.0074 249.918 23.7574 254.858 40.2074C254.948 40.5174 255.048 40.8775 255.258 41.6075C255.378 42.0475 255.438 42.2674 255.498 42.4774C258.608 53.0874 266.908 61.3874 277.518 64.4974C277.728 64.5574 277.947 64.6174 278.387 64.7374C279.117 64.9474 279.478 65.0473 279.788 65.1373C296.238 70.0773 305.988 86.9774 302.048 103.687C301.968 103.997 301.878 104.368 301.688 105.098C301.578 105.538 301.518 105.757 301.468 105.967C298.858 116.717 301.888 128.047 309.528 136.057C309.678 136.207 309.837 136.367 310.147 136.697C310.677 137.237 310.947 137.507 311.167 137.737C322.937 150.247 322.937 169.747 311.167 182.257C310.947 182.487 310.677 182.757 310.147 183.297C309.837 183.627 309.678 183.787 309.528 183.937C301.888 191.947 298.858 203.277 301.468 214.027C301.518 214.237 301.578 214.457 301.688 214.897C301.878 215.627 301.968 215.997 302.048 216.307C305.988 233.017 296.238 249.918 279.788 254.858C279.478 254.948 279.117 255.047 278.387 255.257C277.947 255.377 277.728 255.437 277.518 255.497C266.908 258.607 258.608 266.907 255.498 277.517C255.438 277.727 255.378 277.947 255.258 278.387C255.048 279.117 254.948 279.477 254.858 279.787C249.918 296.237 233.018 305.987 216.308 302.047C215.998 301.967 215.628 301.877 214.898 301.687C214.458 301.577 214.238 301.517 214.028 301.467C203.278 298.857 191.947 301.887 183.937 309.527C183.787 309.677 183.628 309.837 183.298 310.147C182.758 310.677 182.488 310.947 182.258 311.167C169.748 322.937 150.248 322.937 137.738 311.167C137.508 310.947 137.237 310.677 136.697 310.147C136.367 309.837 136.208 309.677 136.058 309.527C128.048 301.887 116.718 298.857 105.968 301.467C105.758 301.517 105.538 301.577 105.098 301.687C104.368 301.877 103.997 301.967 103.687 302.047C86.9775 305.987 70.0776 296.237 65.1376 279.787C65.0476 279.477 64.9475 279.117 64.7375 278.387C64.6175 277.947 64.5575 277.727 64.4975 277.517C61.3875 266.907 53.0875 258.607 42.4775 255.497C42.2675 255.437 42.0475 255.377 41.6075 255.257C40.8775 255.047 40.5175 254.948 40.2075 254.858C23.7575 249.918 14.0075 233.017 17.9475 216.307C18.0275 215.997 18.1176 215.627 18.3076 214.897C18.4176 214.457 18.4776 214.237 18.5276 214.027C21.1376 203.277 18.1075 191.947 10.4675 183.937C10.3175 183.787 10.1575 183.627 9.84752 183.297C9.31752 182.757 9.0475 182.487 8.8275 182.257C-2.9425 169.747 -2.9425 150.247 8.8275 137.737C9.0475 137.507 9.31752 137.237 9.84752 136.697C10.1575 136.367 10.3175 136.207 10.4675 136.057C18.1075 128.047 21.1376 116.717 18.5276 105.967C18.4776 105.757 18.4176 105.538 18.3076 105.098C18.1176 104.368 18.0275 103.997 17.9475 103.687C14.0075 86.9774 23.7575 70.0773 40.2075 65.1373C40.5175 65.0473 40.8775 64.9474 41.6075 64.7374C42.0475 64.6174 42.2675 64.5574 42.4775 64.4974C53.0875 61.3874 61.3875 53.0874 64.4975 42.4774C64.5575 42.2674 64.6175 42.0475 64.7375 41.6075C64.9475 40.8775 65.0476 40.5174 65.1376 40.2074C70.0776 23.7574 86.9775 14.0074 103.687 17.9474C103.997 18.0274 104.368 18.1175 105.098 18.3075C105.538 18.4175 105.758 18.4775 105.968 18.5275C116.718 21.1375 128.048 18.1074 136.058 10.4674C136.208 10.3174 136.367 10.1575 136.697 9.84752Z"
            class="scallop-base-fill"
          />

          <image
            v-if="track?.image"
            :href="track.image"
            x="-4"
            y="-4"
            width="328"
            height="328"
            preserveAspectRatio="xMidYMid slice"
            clip-path="url(#scallopCoverMask)"
            class="scallop-cover-image"
          />

          <g v-else clip-path="url(#scallopCoverMask)">
            <rect x="-4" y="-4" width="328" height="328" class="scallop-fallback-rect" />
            <circle cx="160" cy="160" r="44" fill="rgba(255, 255, 255, 0.2)" />
            <path
              d="M152 136v40.55c-2.4-.95-5.1-1.55-8-1.55-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20V152h24v-16h-36z"
              fill="#ffffff"
            />
          </g>

          <path
            d="M136.697 9.84752C137.237 9.31752 137.508 9.0475 137.738 8.8275C150.248 -2.9425 169.748 -2.9425 182.258 8.8275C182.488 9.0475 182.758 9.31752 183.298 9.84752C183.628 10.1575 183.787 10.3174 183.937 10.4674C191.947 18.1074 203.278 21.1375 214.028 18.5275C214.238 18.4775 214.458 18.4175 214.898 18.3075C215.628 18.1175 215.998 18.0274 216.308 17.9474C233.018 14.0074 249.918 23.7574 254.858 40.2074C254.948 40.5174 255.048 40.8775 255.258 41.6075C255.378 42.0475 255.438 42.2674 255.498 42.4774C258.608 53.0874 266.908 61.3874 277.518 64.4974C277.728 64.5574 277.947 64.6174 278.387 64.7374C279.117 64.9474 279.478 65.0473 279.788 65.1373C296.238 70.0773 305.988 86.9774 302.048 103.687C301.968 103.997 301.878 104.368 301.688 105.098C301.578 105.538 301.518 105.757 301.468 105.967C298.858 116.717 301.888 128.047 309.528 136.057C309.678 136.207 309.837 136.367 310.147 136.697C310.677 137.237 310.947 137.507 311.167 137.737C322.937 150.247 322.937 169.747 311.167 182.257C310.947 182.487 310.677 182.757 310.147 183.297C309.837 183.627 309.678 183.787 309.528 183.937C301.888 191.947 298.858 203.277 301.468 214.027C301.518 214.237 301.578 214.457 301.688 214.897C301.878 215.627 301.968 215.997 302.048 216.307C305.988 233.017 296.238 249.918 279.788 254.858C279.478 254.948 279.117 255.047 278.387 255.257C277.947 255.377 277.728 255.437 277.518 255.497C266.908 258.607 258.608 266.907 255.498 277.517C255.438 277.727 255.378 277.947 255.258 278.387C255.048 279.117 254.948 279.477 254.858 279.787C249.918 296.237 233.018 305.987 216.308 302.047C215.998 301.967 215.628 301.877 214.898 301.687C214.458 301.577 214.238 301.517 214.028 301.467C203.278 298.857 191.947 301.887 183.937 309.527C183.787 309.677 183.628 309.837 183.298 310.147C182.758 310.677 182.488 310.947 182.258 311.167C169.748 322.937 150.248 322.937 137.738 311.167C137.508 310.947 137.237 310.677 136.697 310.147C136.367 309.837 136.208 309.677 136.058 309.527C128.048 301.887 116.718 298.857 105.968 301.467C105.758 301.517 105.538 301.577 105.098 301.687C104.368 301.877 103.997 301.967 103.687 302.047C86.9775 305.987 70.0776 296.237 65.1376 279.787C65.0476 279.477 64.9475 279.117 64.7375 278.387C64.6175 277.947 64.5575 277.727 64.4975 277.517C61.3875 266.907 53.0875 258.607 42.4775 255.497C42.2675 255.437 42.0475 255.377 41.6075 255.257C40.8775 255.047 40.5175 254.948 40.2075 254.858C23.7575 249.918 14.0075 233.017 17.9475 216.307C18.0275 215.997 18.1176 215.627 18.3076 214.897C18.4176 214.457 18.4776 214.237 18.5276 214.027C21.1376 203.277 18.1075 191.947 10.4675 183.937C10.3175 183.787 10.1575 183.627 9.84752 183.297C9.31752 182.757 9.0475 182.487 8.8275 182.257C-2.9425 169.747 -2.9425 150.247 8.8275 137.737C9.0475 137.507 9.31752 137.237 9.84752 136.697C10.1575 136.367 10.3175 136.207 10.4675 136.057C18.1075 128.047 21.1376 116.717 18.5276 105.967C18.4776 105.757 18.4176 105.538 18.3076 105.098C18.1176 104.368 18.0275 103.997 17.9475 103.687C14.0075 86.9774 23.7575 70.0773 40.2075 65.1373C40.5175 65.0473 40.8775 64.9474 41.6075 64.7374C42.0475 64.6174 42.2675 64.5574 42.4775 64.4974C53.0875 61.3874 61.3875 53.0874 64.4975 42.4774C64.5575 42.2674 64.6175 42.0475 64.7375 41.6075C64.9475 40.8775 65.0476 40.5174 65.1376 40.2074C70.0776 23.7574 86.9775 14.0074 103.687 17.9474C103.997 18.0274 104.368 18.1175 105.098 18.3075C105.538 18.4175 105.758 18.4775 105.968 18.5275C116.718 21.1375 128.048 18.1074 136.058 10.4674C136.208 10.3174 136.367 10.1575 136.697 9.84752Z"
            class="scallop-border-stroke"
          />
        </svg>
      </div>
    </div>

    <div class="pill-info-wrapper">
      <div class="pill-track-row">
        <span class="pill-track-name" :title="track?.name || 'Loading...'">
          {{ track?.name || "Loading Track..." }}
        </span>

        <span v-if="isNowPlaying" class="pill-live-badge now-playing">
          <span class="sound-wave-bars">
            <span class="bar bar-1"></span>
            <span class="bar bar-2"></span>
            <span class="bar bar-3"></span>
          </span>
          Now Playing
        </span>
        <span v-else class="pill-live-badge recently-played">
          {{ track?.playedAt || 'Last Played' }}
        </span>
      </div>

      <div class="pill-artist-name">
        {{ track?.artist || "Last.fm" }}
      </div>

      <SquigglyWaveVisualizer :is-playing="isNowPlaying" :height="16" />
    </div>

    <button
      type="button"
      class="pill-play-btn"
      :class="{ 'playing-btn': isNowPlaying }"
      :title="isNowPlaying ? 'Currently playing on Last.fm • Click to view track' : 'Last scrobbled track • Click to view on Last.fm'"
      @click.stop="openTrack"
    >
      <div v-if="isNowPlaying" class="icon-slot" v-html="pauseIcon"></div>
      <div v-else class="icon-slot" v-html="playIcon"></div>
    </button>
  </div>
</template>

<style scoped>
.lastfm-scrobble-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.2rem 0.8rem 0.8rem;
  background: var(--md-sys-color-music-pill-bg, #faebd4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.16);
  border-radius: 9999px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  user-select: none;
  max-width: 34rem;
  width: 100%;
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms ease, background-color 250ms ease, border-color 250ms ease;
  overflow: hidden;
}

[theme="dark"] .lastfm-scrobble-pill {
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.lastfm-scrobble-pill:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
}

[theme="dark"] .lastfm-scrobble-pill:hover {
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
}

.pill-artwork-wrapper {
  position: relative;
  width: 4.8rem;
  height: 4.8rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scallop-mask-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-scallop-svg {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 2px 5px rgba(191, 96, 56, 0.28));
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

[theme="dark"] .pill-scallop-svg {
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.55));
}

.lastfm-scrobble-pill:hover .pill-scallop-svg {
  transform: scale(1.05) rotate(4deg);
}

.scallop-base-fill {
  fill: var(--md-sys-color-music-badge-bg, #f8af82);
  transition: fill 250ms ease;
}

.scallop-cover-image {
  pointer-events: none;
  transform-origin: 160px 160px;
}

.scallop-fallback-rect {
  fill: var(--md-sys-color-primary, #bf6038);
}

.scallop-border-stroke {
  fill: none;
  stroke: var(--md-sys-color-music-badge-border, #d26b3f);
  stroke-width: 8;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}

.pill-info-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.pill-track-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.pill-track-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 17rem;
}

.pill-live-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.pill-live-badge.now-playing {
  background-color: var(--md-sys-color-tertiary-container, #dfe8b9);
  color: var(--md-sys-color-on-tertiary-container, #171f02);
}

.pill-live-badge.recently-played {
  background-color: rgba(0, 0, 0, 0.06);
  color: var(--md-sys-color-on-surface-variant, #52443d);
}

[theme="dark"] .pill-live-badge.recently-played {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--md-sys-color-on-surface-variant, #d8c2ba);
}

.sound-wave-bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 0.15rem;
  height: 0.8rem;
  margin-right: 0.35rem;
}

.bar {
  width: 0.2rem;
  background-color: currentColor;
  border-radius: 9999px;
  animation: barBounce 1s ease-in-out infinite alternate;
}

.bar-1 { height: 50%; animation-delay: 0ms; }
.bar-2 { height: 100%; animation-delay: 200ms; }
.bar-3 { height: 60%; animation-delay: 400ms; }

@keyframes barBounce {
  from { height: 20%; }
  to { height: 100%; }
}

.pill-artist-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pill-play-btn {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--md-sys-color-music-btn-bg, #fae298);
  border: 2px solid var(--md-sys-color-music-btn-border, #d26b3f);
  color: var(--md-sys-color-music-btn-icon, #4e2816);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(191, 96, 56, 0.25);
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms ease, box-shadow 200ms ease;
}

.pill-play-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(191, 96, 56, 0.35);
}

.pill-play-btn:active {
  transform: scale(0.95);
}

.icon-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.icon-slot :deep(svg) {
  width: 1.8rem;
  height: 1.8rem;
  fill: currentColor;
}
</style>

/**
 * Body initialization - fade in effect and initialize all features
 */

import { initCustomCursor } from "../features/customCursor";
import { initClock } from "../features/clock";
import { initDate } from "../features/dateDisplay";
import { initDayProgress } from "../features/dayProgress";
import { initSubtitleStyling } from "../features/subtitleStyling";

import { initializeStatsCards } from "../features/statsCards";

export function bodyLoaded() {
  const body = document.querySelector<HTMLElement>("body");
  if (body) {
    body.style.opacity = "1";
  }

  // Initialize all features
  initCustomCursor();
  initClock();
  initDate();
  initDayProgress();
  initSubtitleStyling();
  // NOTE: Global intervals (initClock, initSubtitleStyling, initDayProgress)
  // and document-level event listeners (initCustomCursor) are never cleaned up.
  // In a static page this is acceptable; in a future SPA/router setup, add
  // cleanup hooks (clearInterval / removeEventListener) in onUnmounted.
  initializeStatsCards();
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  window.addEventListener("load", bodyLoaded);
} else {
  bodyLoaded();
}

/**
 * Body initialization - fade in effect and initialize all features
 */

import { initCustomCursor } from "../features/customCursor";
import { initClock } from "../features/clock";
import { initDate } from "../features/dateDisplay";
import { initDayProgress } from "../features/dayProgress";
import { initSubtitleStyling } from "../features/subtitleStyling";
import { initializeEventHandlers } from "../eventHandlers";
import { initializeStatsCards } from "../repos/statsCards";

export function bodyLoaded() {
  const body = document.querySelector<HTMLElement>("body");
  if (body) {
    body.style.opacity = "1";
    body.style.cursor = "none";
  }

  // Initialize all features
  initCustomCursor();
  initClock();
  initDate();
  initDayProgress();
  initSubtitleStyling();
  initializeEventHandlers();
  initializeStatsCards();
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  window.addEventListener("load", bodyLoaded);
} else {
  bodyLoaded();
}

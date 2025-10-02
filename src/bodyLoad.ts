/**
 * Body initialization - fade in effect and initialize all features
 */

import { initCustomCursor } from './customCursor';
import { initClock } from './clock';
import { initDate } from './dateDisplay';
import { initDayProgress } from './dayProgress';
import { initSubtitleStyling } from './subtitleStyling';

export function bodyLoaded() {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.style.opacity = '1';
    body.style.cursor = 'none';
  }

  // Initialize all features
  initCustomCursor();
  initClock();
  initDate();
  initDayProgress();
  initSubtitleStyling();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  window.addEventListener('load', bodyLoaded);
} else {
  bodyLoaded();
}

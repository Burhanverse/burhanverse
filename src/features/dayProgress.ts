/**
 * Day progress bar functionality
 * Shows the progress of the current day as a percentage
 */

function getCurrentProgress(): string {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Calculate progress: (hour + minutes as fraction) / 24 hours * 100
  const progress = ((hour + (minute * (5 / 3)) / 100) / 24) * 100;
  return progress.toFixed(0);
}

function updateProgressUI(): void {
  const percent = getCurrentProgress();
  const barElement = document.getElementById(
    "progress-bar",
  ) as HTMLElement | null;

  if (barElement) {
    barElement.style.width = `${percent}%`;
  }
}

export function initDayProgress(): void {
  // Update immediately
  updateProgressUI();

  // Update every minute (60000ms)
  setInterval(updateProgressUI, 60000);
}

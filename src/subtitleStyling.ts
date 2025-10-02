/**
 * Subtitle styling functionality
 * Adds a blinking cursor effect to the subtitle
 */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let isRunning = false;

async function updateSubtitleStyling(): Promise<void> {
  if (isRunning) return;
  isRunning = true;

  const subtitle = document.querySelector('#subtitle');
  if (!subtitle) {
    isRunning = false;
    return;
  }

  const originalText = subtitle.textContent?.replace('_', '').replace('\xa0', '') || 'Burhanverse';

  // Show cursor
  subtitle.textContent = `${originalText}_`;
  await sleep(1000);

  // Hide cursor (use non-breaking space)
  subtitle.textContent = `${originalText}\xa0`;

  isRunning = false;
}

export function initSubtitleStyling(): void {
  // Start the animation
  updateSubtitleStyling();
  
  // Repeat every 2 seconds
  setInterval(updateSubtitleStyling, 2000);
}

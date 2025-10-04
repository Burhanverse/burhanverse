/**
 * Clock display functionality
 * Updates the time display every 5 seconds
 */

export function updateClock(): void {
  const date = new Date();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();

  // Add leading zeros
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }

  const clockElements = document.querySelectorAll<HTMLElement>(".clock");
  clockElements.forEach((clockElement) => {
    const isCompact = clockElement.classList.contains("clock--compact");
    const content = isCompact
      ? `<span class="clock-hours">${hour}</span><span class="clock-separator">:</span><span class="clock-minutes">${minute}</span>`
      : `<span class="clock-hours">${hour}</span><br><span class="clock-minutes">${minute}</span>`;

    clockElement.innerHTML = content;
  });

  // Update every 5 seconds
  setTimeout(updateClock, 5000);
}

export function initClock(): void {
  updateClock();
}

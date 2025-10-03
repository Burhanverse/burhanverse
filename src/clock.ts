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

  const clockElement = document.querySelector(".clock");
  if (clockElement) {
    clockElement.innerHTML = `<span class="clock-hours">${hour}</span><br><span class="clock-minutes">${minute}</span>`;
  }

  // Update every 5 seconds
  setTimeout(updateClock, 5000);
}

export function initClock(): void {
  updateClock();
}

/**
 * Custom cursor functionality
 * Tracks mouse position and applies visual effects
 */

export function initCustomCursor(): void {
  const cursor = document.querySelector(".cursor") as HTMLElement | null;
  if (!cursor) return;

  // Track mouse movement
  document.addEventListener("mousemove", (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Add click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
  });

  // Add hover effect using event delegation for dynamic elements
  document.addEventListener("mouseover", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest(".clickable");
    if (clickable) {
      cursor.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", (e: MouseEvent) => {
    // mouseout behaves correctly with closest because when leaving the clickable element
    // entirely, we should remove the class.
    const target = e.target as HTMLElement;
    const clickable = target.closest(".clickable");
    if (clickable) {
      cursor.classList.remove("hover");
    }
  });
}

/**
 * Custom cursor functionality
 * Tracks mouse position and applies visual effects
 */

export function initCustomCursor(): void {
  const cursor = document.querySelector(".cursor") as HTMLElement | null;
  if (!cursor) return;

  const clickableElements = document.querySelectorAll(".clickable");

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

  // Add hover effect for clickable elements
  clickableElements.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}

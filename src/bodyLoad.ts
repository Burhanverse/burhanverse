/**
 * Body initialization - fade in effect and custom cursor
 */

export function bodyLoaded() {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.style.opacity = '1';
    body.style.cursor = 'none';
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  window.addEventListener('load', bodyLoaded);
} else {
  bodyLoaded();
}

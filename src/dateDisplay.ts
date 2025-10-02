/**
 * Date display functionality
 */

export function initDate(): void {
  const date = new Date();

  const dateNow = date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Store date if needed elsewhere
  (window as any).dateNow = dateNow;
}

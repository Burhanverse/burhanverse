/**
 * Pull to Refresh functionality for mobile browsers
 */

let startY = 0;
let currentY = 0;
let isPulling = false;
const pullThreshold = 80; // Distance to pull before refresh triggers
const minPullDistance = 20; // Minimum distance before indicator appears (prevents accidental pulls)

const pageContent = document.querySelector<HTMLElement>('.page-content-wrapper');

// Create refresh indicator
const refreshIndicator = document.createElement('div');
refreshIndicator.className = 'pull-to-refresh-indicator';
refreshIndicator.innerHTML = `
  <div class="refresh-spinner">
    <span class="material-symbols-rounded">refresh</span>
  </div>
`;

// Insert indicator at the top of page content
if (pageContent) {
  pageContent.insertBefore(refreshIndicator, pageContent.firstChild);
}

function handleTouchStart(e: TouchEvent) {
  if (!pageContent) return;
  
  // Only trigger if scrolled to top
  if (pageContent.scrollTop === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
  }
}

function handleTouchMove(e: TouchEvent) {
  if (!isPulling || !pageContent) return;
  
  currentY = e.touches[0].clientY;
  const pullDistance = currentY - startY;
  
  // Only allow pulling down and only after minimum distance
  if (pullDistance > minPullDistance && pageContent.scrollTop === 0) {
    e.preventDefault();
    
    // Calculate progress (0 to 1) starting from minPullDistance
    const effectivePullDistance = pullDistance - minPullDistance;
    const progress = Math.min(effectivePullDistance / pullThreshold, 1);
    
    // Update indicator
    const rotation = progress * 360;
    const scale = 0.5 + (progress * 0.5);
    const opacity = progress;
    
    refreshIndicator.style.transform = `translateX(-50%) translateY(${pullDistance * 0.5}px)`;
    refreshIndicator.style.opacity = `${opacity}`;
    
    const spinner = refreshIndicator.querySelector('.refresh-spinner') as HTMLElement;
    if (spinner) {
      spinner.style.transform = `scale(${scale})`;
    }
    
    const icon = refreshIndicator.querySelector('.material-symbols-rounded') as HTMLElement;
    if (icon) {
      icon.style.transform = `rotate(${rotation}deg)`;
    }
    
    // Add "ready" class when threshold is reached
    if (effectivePullDistance >= pullThreshold) {
      refreshIndicator.classList.add('ready');
    } else {
      refreshIndicator.classList.remove('ready');
    }
  }
}

function handleTouchEnd() {
  if (!isPulling || !pageContent) return;
  
  const pullDistance = currentY - startY;
  const effectivePullDistance = pullDistance - minPullDistance;
  
  if (effectivePullDistance >= pullThreshold) {
    // Trigger refresh
    refreshIndicator.classList.add('refreshing');
    refreshIndicator.classList.remove('ready');
    
    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } else {
    // Reset indicator
    resetIndicator();
  }
  
  isPulling = false;
  startY = 0;
  currentY = 0;
}

function resetIndicator() {
  refreshIndicator.style.transform = 'translateX(-50%)';
  refreshIndicator.style.opacity = '0';
  refreshIndicator.classList.remove('ready', 'refreshing');
  
  const spinner = refreshIndicator.querySelector('.refresh-spinner') as HTMLElement;
  if (spinner) {
    spinner.style.transform = '';
  }
  
  const icon = refreshIndicator.querySelector('.material-symbols-rounded') as HTMLElement;
  if (icon) {
    icon.style.transform = '';
  }
}

// Add event listeners only on mobile devices
if ('ontouchstart' in window && pageContent) {
  pageContent.addEventListener('touchstart', handleTouchStart, { passive: false });
  pageContent.addEventListener('touchmove', handleTouchMove, { passive: false });
  pageContent.addEventListener('touchend', handleTouchEnd);
  pageContent.addEventListener('touchcancel', handleTouchEnd);
}

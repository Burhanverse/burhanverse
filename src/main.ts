// Import all modules (auto-execute initialization)
import './listRepo';
import './theme';
import './navigation';
import './bodyLoad';

// Import individual feature modules (initialized by bodyLoad)
import './customCursor';
import './clock';
import './dateDisplay';
import './dayProgress';
import './subtitleStyling';

// Export functions to window for inline event handlers
import { themeToggle, themeToggleHover, themeToggleLeave } from './theme';
import { homeSelected, reposSelected, infoSelected, contactSelected, closeNavPanel, openNavPanel } from './navigation';
import { bodyLoaded } from './bodyLoad';

// Make functions globally available for HTML inline handlers
declare global {
  interface Window {
    themeToggle: typeof themeToggle;
    themeToggleHover: typeof themeToggleHover;
    themeToggleLeave: typeof themeToggleLeave;
    homeSelected: typeof homeSelected;
    reposSelected: typeof reposSelected;
    infoSelected: typeof infoSelected;
    contactSelected: typeof contactSelected;
    closeNavPanel: typeof closeNavPanel;
    openNavPanel: typeof openNavPanel;
    bodyLoaded: typeof bodyLoaded;
  }
}

// Attach to window object
window.themeToggle = themeToggle;
window.themeToggleHover = themeToggleHover;
window.themeToggleLeave = themeToggleLeave;
window.homeSelected = homeSelected;
window.reposSelected = reposSelected;
window.infoSelected = infoSelected;
window.contactSelected = contactSelected;
window.closeNavPanel = closeNavPanel;
window.openNavPanel = openNavPanel;
window.bodyLoaded = bodyLoaded;

console.log('🚀 Burhanverse Portfolio - All features initialized');

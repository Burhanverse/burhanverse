/**
 * Article: Creating Beautiful UI Animations
 */

import { ArticleContent } from '../types';

export const article3: ArticleContent = {
  id: 3,
  slug: 'ui-animations',
  sections: [
    {
      type: 'heading',
      content: 'The Art of Animation'
    },
    {
      type: 'paragraph',
      content: 'Animations bring life to user interfaces, providing visual feedback and guiding users through interactions. When done well, they enhance usability and create delightful experiences. However, poorly executed animations can frustrate users and harm performance.'
    },
    {
      type: 'heading',
      content: 'Animation Principles'
    },
    {
      type: 'list',
      content: [
        'Purpose: Every animation should have a clear purpose',
        'Duration: Keep animations short (200-400ms for most UI)',
        'Easing: Use appropriate easing functions for natural motion',
        'Performance: Animate transform and opacity for best performance',
        'Accessibility: Respect prefers-reduced-motion settings'
      ]
    },
    {
      type: 'heading',
      content: 'CSS Transitions'
    },
    {
      type: 'paragraph',
      content: 'CSS transitions are the simplest way to add smooth animations to your UI. They\'re performant and easy to implement for common use cases like hover effects and state changes.'
    },
    {
      type: 'code',
      content: `/* Example: Smooth hover effect */
.button {
  background-color: var(--primary);
  transition: all 200ms cubic-bezier(0.420, 0.000, 0.580, 1.000);
}

.button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Respecting user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
      language: 'css'
    },
    {
      type: 'heading',
      content: 'Performance Tips'
    },
    {
      type: 'paragraph',
      content: 'For the best performance, stick to animating transform and opacity properties. These properties are handled by the GPU and won\'t trigger layout recalculations. Avoid animating properties like width, height, top, or left, as these force the browser to reflow the page.'
    },
    {
      type: 'code',
      content: `// Good: GPU-accelerated properties
.element {
  transition: transform 300ms, opacity 300ms;
}

// Avoid: These trigger layout recalculation
.element {
  transition: width 300ms, height 300ms, top 300ms;
}`,
      language: 'css'
    },
    {
      type: 'paragraph',
      content: 'Use the will-change property sparingly to hint to the browser which properties will animate, but remember to remove it after the animation completes to avoid performance issues.'
    }
  ]
};

/**
 * Article: Getting Started with Material Design 3
 */

import { ArticleContent } from '../types';

export const article1: ArticleContent = {
  id: 1,
  slug: 'material-design-3',
  sections: [
    {
      type: 'heading',
      content: 'Introduction to Material Design 3'
    },
    {
      type: 'paragraph',
      content: 'Material Design 3 is the latest evolution of Google\'s design system, introducing a more personal and adaptive approach to design. It builds upon the foundations of Material Design while adding new features like dynamic color, improved accessibility, and enhanced customization options.'
    },
    {
      type: 'heading',
      content: 'Key Features'
    },
    {
      type: 'list',
      content: [
        'Dynamic Color: Automatically generates color schemes from wallpapers',
        'Enhanced Typography: Better readability and visual hierarchy',
        'Improved Components: More flexible and customizable UI elements',
        'Accessibility First: Built-in support for accessibility standards',
        'Cross-platform Consistency: Works seamlessly across devices'
      ]
    },
    {
      type: 'heading',
      content: 'Dynamic Color System'
    },
    {
      type: 'paragraph',
      content: 'One of the most exciting features of Material Design 3 is the dynamic color system. This allows your app to automatically generate a color palette based on the user\'s wallpaper or a source color, creating a personalized experience.'
    },
    {
      type: 'code',
      content: `// Example: Generating a color scheme
const theme = {
  primary: 'var(--md-sys-color-primary)',
  onPrimary: 'var(--md-sys-color-on-primary)',
  primaryContainer: 'var(--md-sys-color-primary-container)',
  onPrimaryContainer: 'var(--md-sys-color-on-primary-container)'
};`,
      language: 'javascript'
    },
    {
      type: 'heading',
      content: 'Implementation Tips'
    },
    {
      type: 'paragraph',
      content: 'When implementing Material Design 3 in your projects, start with the color system and typography. These foundational elements will guide the rest of your design decisions. Use the official Material Theme Builder to generate your color palettes and ensure consistency across your application.'
    },
    {
      type: 'paragraph',
      content: 'Remember to test your designs with different color schemes and in both light and dark modes to ensure a great experience for all users.'
    }
  ]
};

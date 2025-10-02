/**
 * Article: Building Modern Web Apps with TypeScript
 */

import { ArticleContent } from '../types';

export const article2: ArticleContent = {
  id: 2,
  slug: 'typescript-web-apps',
  sections: [
    {
      type: 'heading',
      content: 'Why TypeScript?'
    },
    {
      type: 'paragraph',
      content: 'TypeScript has become an essential tool for modern web development. It adds static typing to JavaScript, catching errors at compile-time rather than runtime, and provides better tooling support through intelligent code completion and refactoring.'
    },
    {
      type: 'heading',
      content: 'Core Benefits'
    },
    {
      type: 'list',
      content: [
        'Type Safety: Catch errors before they reach production',
        'Better IDE Support: Enhanced autocomplete and IntelliSense',
        'Improved Refactoring: Rename symbols safely across your codebase',
        'Self-Documenting Code: Types serve as inline documentation',
        'Easier Maintenance: Large codebases become more manageable'
      ]
    },
    {
      type: 'heading',
      content: 'Getting Started'
    },
    {
      type: 'paragraph',
      content: 'Setting up TypeScript in your project is straightforward. You can add it to an existing JavaScript project or start fresh with a TypeScript template.'
    },
    {
      type: 'code',
      content: `// Installing TypeScript
npm install -D typescript

// Creating a tsconfig.json
npx tsc --init

// Basic TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}`,
      language: 'typescript'
    },
    {
      type: 'heading',
      content: 'Best Practices'
    },
    {
      type: 'paragraph',
      content: 'Start by enabling strict mode in your tsconfig.json. This will catch more potential errors and encourage better coding practices. Use interfaces and types to define your data structures clearly, and leverage TypeScript\'s utility types for common patterns.'
    },
    {
      type: 'paragraph',
      content: 'Don\'t be afraid to use "any" sparingly when you\'re first migrating a project, but make it a goal to replace these with proper types over time. The investment in typing your code pays dividends in reduced bugs and improved developer experience.'
    }
  ]
};

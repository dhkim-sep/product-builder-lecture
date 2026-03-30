# Lotto Number Generator - Project Blueprint

## Project Overview
A simple web application that generates 5 sets of Lotto numbers including a bonus number. The application follows modern web standards using framework-less HTML, CSS, and JavaScript.

## Current Features
- Generates 5 sets of random Lotto numbers (1-45).
- Includes a bonus number for each set.
- Responsive design (initial implementation).

## Planned Changes: Dark/Light Mode Implementation
### 1. Refactoring
- Move internal styles from `index.html` to `style.css`.
- Move internal scripts from `index.html` to `main.js`.
- Clean up `index.html` to link to external assets.

### 2. Design & Styling (Modern CSS)
- Define CSS variables for colors, backgrounds, and text.
- Create two color palettes:
  - **Light Mode**: White/Light Gray background, Dark text, Blue accents.
  - **Dark Mode**: Dark Blue/Black background, Light text, Vibrant accents.
- Implement a theme toggle component using Web Components or a simple toggle button.
- Use CSS transitions for smooth theme switching.

### 3. Functionality (Modern JS)
- Implement `ThemeManager` to handle theme switching.
- Persist the user's theme preference in `localStorage`.
- Ensure the application respects the system's `prefers-color-scheme`.

### 4. Deployment
- Use Git to track changes.
- Push the changes to the repository for deployment.

## Implementation Steps
1. [x] Create/Update `style.css` with CSS variables and theme layers.
2. [x] Update `index.html` with theme toggle UI and external links.
3. [x] Update `main.js` with Lotto logic and Theme switching logic.
4. [x] Verify functionality and responsiveness.
5. [x] Git commit and push.

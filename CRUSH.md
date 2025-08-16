# CRUSH.md - Ribo Project Guidelines

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run check` - Type checking (Svelte + TS)

## Code Style Guidelines
- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Avoid (except where required)
- **Imports**: Group by type (external > internal)
- **Components**: PascalCase (e.g., `CHero.svelte`)
- **Props**: kebab-case in templates, camelCase in JS
- **Types**: Always use TypeScript types
- **Error Handling**: Prefer try/catch with clear error messages

## Svelte Specifics
- Use reactive declarations (`$:`) sparingly
- Keep component logic in `<script>` tags
- Prefer Svelte stores for state management

## Testing Notes
- No test framework detected (consider adding Vitest/Jest)

## Additional Tools
- ESLint: Configured for Svelte + TS
- Tailwind: Used for styling
- Flowbite: UI component library
- Locomotive Scroll: Smooth scrolling
- GSAP: Animation library
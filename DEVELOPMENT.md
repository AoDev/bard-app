# Rsbuild Frontend Boilerplate Development

## Main Technologies

- [react](https://react.dev/) -  component based UI
- [mobx](https://mobx.js.org/) -  state management
- [less](https://lesscss.org/) - css pre-processor
- [rsbuild](https://rsbuild.dev/) - modern bundler
- [biome](https://biomejs.dev/) - js/ts formatter and linter
- [prettier](https://prettier.io/) - other files formatter
- [typescript](https://www.typescriptlang.org/) - type safe
- [vitest](https://vitest.dev/) - Testing framework

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)

## Local development

```
- git clone
- npm i
- npm run dev
```

The development server will start and automatically open your default browser to `http://localhost:3000`.

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Check for lint and type issues.
- `npm run format`: Format code
- `npm test`: run tests once
- `npm run test:watch`: run tests in watch mode

### CSS intellisense in VS Code / Cursor

For suggestions of CSS classes, use the extension `Zignd.html-css-class-completion`.
- Check vs code settings for `CSS languages`. They should include: 
  `"css.enabledLanguages": ["jsx","tsx","html","typescript"],`
- Build the project once locally, the output CSS will be dist folder.
- Run the extension command `Cache CSS class definitions`.

## Documentation

For detailed documentation and guidelines, please refer to the [Frontend Guide](./docs/frontend-guide/).



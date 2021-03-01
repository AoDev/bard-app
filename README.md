# Bard

## What is this?

> A simple way for developers to create the stories their users should live.

### In more technical terms

It's a recipe for a Single Page, Progressive Web App (SPA / PWA) with Mobx / React where the focus is on simplicity of implementation. The goal being that developers of any level can dedicate most of their time to building business value instead of learning techs.

## The name

> In medieval Gaelic and British culture, a **"bard"** was a story teller. They would talk about the people's journey in the world. As developers the applications we build allow users to interact with data and make their own journey to reach their goal.

## Tech used

- UI: [React](https://reactjs.org/)
- app state: [mobx](https://mobx.js.org/)
- other libs: [lodash](https://lodash.com), [axios (xhr)](https://github.com/axios/axios), [workbox (PWA)](https://developers.google.com/web/tools/workbox/) ...
- test: [jest](https://jestjs.io/) + [enzyme](https://airbnb.io/enzyme/)
- lint: [eslint (JS)](https://eslint.org/) + [stylelint (CSS)](https://stylelint.io/)
- bundle: [Webpack](https://webpack.js.org/)

## App architecture design fundamentals

You can always fix a bug in a library, but a bad architecture will turn your developer life into Hell.

### [Clean architecture by Robert C. Martin (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

> “By separating the software into layers, and conforming to The Dependency Rule, you will create a system that is intrinsically testable, with all the benefits that implies.”

### [Decouple state and UI by mobx author](https://hackernoon.com/how-to-decouple-state-and-ui-a-k-a-you-dont-need-componentwillmount-cc90b787aa37)

> "Strategies for dealing with routing, data fetching, authentication and workflow testing without the UI layer."

### [App shell architecture](https://developers.google.com/web/fundamentals/architecture/app-shell)

> "An application shell (or app shell) architecture is one way to build a Progressive Web App that reliably and instantly loads on your users' screens, similar to what you see in native applications."

Using [bard-router](https://github.com/AoDev/bard-router) that was created for this purpose.

## Code style

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

(with some more rules for React/JSX)

## How to run and build? (scripts)

| script                | objective                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| `npm run dev`         | for local development, hot reloaded, served at localhost:3000 by default. |
| `npm run package:web` | create production dist; output in `dist` folder by default.               |

## Code structure overview

```
src/
  application/
    App/               =  UI (React)
    shared-components/ =  business specific reusable UI comp.
    stores/            =  app state (mobx)
  assets/              =  images / icons
  lib/                 =  utils / api clients, etc. (local reusable libs)
  styles/              =  app css (less)
  ui-framework/        =  Generic UI; styles + components
```

## Production build chunks

Thanks to Webpack, by default the application code is split into:

| File                   | Content                                                    |
| ---------------------- | ---------------------------------------------------------- |
| app.[hash].js          | public, first load code                                    |
| private.[hash].js      | private section, loaded lazily after public (app) content. |
| ui-framework.[hash].js | generic reusable UI                                        |
| vendors.[hash].js      | third-party libs (node_modules)                            |
| style.[hash].css       | all app css                                                |

### Explanation about these splits

- `app/private`: allows **faster initial load**. Having a split for the private section, (eg: user needs to be logged in), means less code to load at first. (optional if no private section)
- `vendors`: allows **lightweight updates** as long as dependencies are the same. By default, it is like a "catch all third-party dependencies". That can be improved by you only, depending on your app.
- `ui-framework`: allows **separation of concerns, code sharing and lightweight updates**. Could be extracted from the repo as a standalone library, shared between multiple apps. Corresponds to code in `ui-framework` mentioned in previous section.

For extra information and improvements, check the ["Analyze and improve your app bundles" section](#improve-bundle).

## Tests

Use `npm test` to run both unit tests and e2e tests.

### Unit tests

Run with `npm run test-unit`.

_Jest_ is setup as test runner and _enzyme_ is available for React components.  
The convention for test filenames is `module.spec.js`.

### E2E, integration tests

Run with `npm run test-e2e`.

Uses `puppeteer` to control the browser.  
Also runs with `Jest` to write the tests.

**Before running tests**

- You need to have a running instance of the app available.
- Modify the test suite in test/e2e.spec.js when needed.

The tests need two environment variables:

- `APP_URL` (default: http://localhost:3000)
- `E2E_CONFIG`: valid values: `headless`, `osx_chrome`.

You can set them in a `.env` file.

- `headless` will not open your local browser.
- `to view in local browser`, check puppeteer docs. For convenience, I could add a pre-configured `osx_chrome` config because it's my working environment. Due to the number of combinations OS <-> Browser, we can add more configs later, with your help.

## Analyze and improve your app bundles

<a name="improve-bundle"></a>
Generate a useful report about your build thanks to [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

1. turn on the analyzer by setting `ANALYZE_BUNDLE=true` as env var.  
   For example in the `.env file`.

2. Run dev or create production build

- `npm run dev` (development)
- `npm run package:web` (production)

Usually you would want to check production.

By default the analyzer will serve the analysis on http://localhost:8888.

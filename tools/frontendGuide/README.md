# FrontendGuidePlugin

A rs-build plugin that picks the ui-framework markdown docs and turn them into a json that can be consumed by the FrontendGuide.tsx component to visualize the docs inside the app.


Currently it has no config. It outputs the json in 
`src/App/Public/UIFramework/FrontendGuide`

## Usage

```ts
// rsbuild.config.ts
import {frontendGuidePlugin} from './tools/frontendGuide'

export default defineConfig({
  ...,
  plugins: [
    frontendGuidePlugin(),
  ]
})
```
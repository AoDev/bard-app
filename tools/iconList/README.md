# rsbuild svg sprite list plugin

List the icons in the sprite to get typescript definition and name list.

## usage

```ts
import {listIconsPlugin} from './tools/iconList'

const options = {
  srcFolder: string // where the sprite svg are
  output?: {
    tsDefinitions?: string // where the TS definition will be written
    list?: string // where an array with the name of icons will be written
  }
  formatCode?: (code: string, parser?: string) => Promise<string> // how the generated files should be formatted
  verbose?: boolean // whether to log operations to console (default: false)
}

export default defineConfig({
  plugins: [
    listIconsPlugin({
      srcFolder: resolve('SOME_FOLDER', 'assets', 'svg-sprite'),
      output: {
        tsDefinitions: resolve('SOME_FOLDER', 'iconNames.d.ts'),
      },
      verbose: true, // Enable logging
    }),
  ],
})
```

### Formatting output code (optional)

2 ready-made formatters are available for `biome` and `prettier`.

```ts
import {biomeFormat} from './tools/iconList/formatters/biomeFormat'
listIconsPlugin({formatCode: biomeFormat, ...})
```

### Example of creating your formatting function with prettier

```ts
import prettier from 'prettier'

// format
const prettierFormat = async (code: string, parser?: string) => {
  const options = await prettier.resolveConfig('.prettierrc')
  return prettier.format(code, {...options, parser})
}

listIconsPlugin({formatCode: prettierFormat, ...})
```

# Feature Generator

This directory contains scripts to generate new features with the proper structure according to the project's conventions.

## Available Generators

- `generate-feature.ts` - TypeScript version with additional options

## How to Use

Use [`tsx`](https://tsx.is/).

```bash
# if you have tsx installed globally
tsx ./tools/featureGenerator/generate-feature.ts
# or
npx tsx ./tools/featureGenerator/generate-feature.ts
```

3. Follow the prompts to:
   - Enter the feature name
   - Choose whether to include a Store file (TypeScript version only)
   - Specify where to create the feature (defaults to `src/App/[FeatureName]`)

## Generated Files

For a feature named "MyFeature", the generator will create:

- `MyFeature.tsx` - The React component using MobX
- `MyFeatureVM.ts` - The ViewModel for the component
- `index.ts` - Exports the component wrapped with withVM
- `MyFeature.less` - Empty LESS stylesheet
- `MyFeatureStore.ts` - (Optional, TypeScript version only) Store file

These files are based on the snippets found in the MobX README.

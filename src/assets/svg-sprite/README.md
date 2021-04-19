# svg-sprite

The svg-sprite is meant to have an easy to use UI icon solution.  
For this, there is the `<Icon/>` component in the ui-framework.

The sprite is created automatically at build time from icons svg files present in the `assets/svg-sprite` folder thanks to [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)

## Icons rules

The icons format is SVG and must follow certain rules and recommendations to work properly.

1. Regarding color

- Most icons SVG should not have hard-coded colors.
- Hard-coded colors would be for brand logos, etc.
- Icons that have no hard-coded colors can be colored dynamically through CSS or the `color` component prop <Icon color="#f00"/>.

2. SVG files

- **Consistent size and spacing**  
  Ideally all UI icons should have a consistent size in a 32 x 32 viewBox. Avoid any useless space between the icon and the artboard.
- **File naming**  
  File naming is important for maintainance and code. The name will be used in the code and should be easy to identify. If a file is renamed, make sure the code is updated.
- **Not all svg should be in the sprite**:  
  While any SVG could actually be added, try not to mix what is considered a UI icon with a possible stand-alone illustration that probably has not its place in the sprite and should be loaded as a regular image instead.
- **Optimize SVG**  
  Use tools such as [SVGO](https://github.com/svg/svgo).

# UI Framework

Composed of **React components** and **CSS styles**.

## Goals

- **Develop faster and easier** with reusable generic components (buttons, etc) and a css architecture that scales.

- **Reduce code (DRY)**: if done properly, an application entire CSS can be very small with
  - 80% coming from ui-framework
  - 20% specific styles (feature specific).

## Layers

<img width="1186" alt="ui-layers-01" src="https://user-images.githubusercontent.com/1526150/107490882-c2099980-6b8a-11eb-990d-20972eb51f13.png">

## CSS styles architecture

CSS themselves have their own architecture based on [Atomic CSS classes](https://css-tricks.com/lets-define-exactly-atomic-css/).

- **Avoids mixing appearance, positioning and functional styles.**
- **Leverage composition of classes** to achieve goals.  
  eg: `<div class="bg--light border--rounded shadow-1"/>`

### Divided in 3 main categories

- **cosmetic**: classes dedicated to specific appearance attributes such as _borders_ or _backgrounds_.

- **elements**: classes dedicated to identifiable elements such as _buttons_, _tables_ or _inputs_.

- **layout**: classes dedicated to positioning and spacing such as _grid_, _flex_, _margins_ or _padding_.

  For easier maintainability, layout is split into 2 categories:

  - **layout-self**: classes affects the element itself.
  - **layout-children**: classes affects the children of the element.

### Variables and pre-processors

The language does not really matter: [less](http://lesscss.org/) or [sass](https://sass-lang.com/) are fine.

- variables are found in the `variable` file and can be changed easily to customize elements.

### Other CSS classes

- _utils_: other classes that may alter _behaviour_ or _visibility_ that don't fit well in the 3 main categories.

- _reset_:
  - some general resets for elements such as img, body, html...
  - note: the framework uses [normalize.css](https://necolas.github.io/normalize.css/) to reset some elements.

**Components styles**

There are UI elements that works only with javascript so they are encapsulated in React components.

They may need specific styles that wouldn't really exist without the React component. So it sometimes makes sense to define their styles in a `*.less` file located in their folder.

_eg: the Switch component has a `Switch.js` and a `Switch.less` for the styles._

### How the Framework exports its styles

The different CSS classes of the framework are imported and reexported in an index file.

This is the `ui-framework/styles/index.less` file.

It looks like this:

```less
// ...

// Layout
@import './layout/layout-children';
@import './layout/...';

// Cosmetic
@import './cosmetic/backgrounds';
@import './cosmetic/...';

// Elements
@import './elements/buttons';
@import './elements/...';

// Components
@import '../components/Icon/Icon';
@import '../components/...';
```

### Integration of the framework CSS in the app

The application has a style entry point: `src/styles/index.less`.

This guy imports:

- app components specific styles
- framework styles

It looks like this:

```less
@import '../ui-framework/styles/variables.less';
@import './variables.less';
@import '../ui-framework/styles/index.less';
@import './reset.less';
// + app specific styles
```

**The order of import matters**

Because the framework is imported first, our app specific components and app specific styles also can use the less.js mixins / variables, from it.

### Final words about the framework CSS

There is **NO "CSS in JS"** on purpose. There is more control, ease of maintainance and code reuse possible by keeping the CSS layer isolated.

## React Components

The same thing applies with the components. They are exported / imported through index.js files.

```js
export {default as Breadcrumbs} from './Breadcrumbs'
export {default as Button} from './Button'
export {default as Callout} from './Callout'
export {default as Icon} from './Icon'
export {default as Loader} from './Loader'
export {default as ConfirmDialog} from './ConfirmDialog'
export {default as Modal} from './Modal'
...
```

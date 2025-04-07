# CSS Rules

The main philosophy is to use atomic classes. (Similar to tailwind css)
90% of CSS should come from the framework. The rest are specfic to the app.

* Global CSS is defined in the ui-framework as a set of atomic classes always available.
* Local CSS is defined close to the component code, often using BEM syntax.

## Tooling

I prefer using pre-processors like less or sass. CSS in js solutions, styled components, they tend to discard the philosophy of CSS completely. Promoting inline styling disguised as "component" and leaky abstraction.

## Rules

These are rules to make CSS easily maintained, keep mental sanity and scale for big apps.
There are always exceptions, it's normal. But 95% of the time, the rule shouldn't be broken.


### Rule 1: Component CSS should not be modified from the outside world.

A component in this case, is a bunch of nested html tags with different classes.

For example a "loader component":

```html
<div class="loader">
  <div class="loader__inner">
    <div class="loader__dot" />
    <div class="loader__dot" />
    <div class="loader__dot" />
  </div>
</div>
```

Means that loader**inner, loader**dot classes, should not be changed from outside.

eg: **forbidden**

```css
.my-page .loader__dot {
  color: red;
}
```

A component should be considered a black box from outside. Of course, there are exceptions.

### Rule 2: Avoid nesting and descendant selectors

```less
// BAD
.parent {
  .child {
    color: #000;
  }
}

// BETTER (BEM)
.parent__child {
  color: #000;
}
```

Reason: this avoids unexpected side effects when elements are placed in different containers.

### Rule 3: Avoid targeting HTML elements

_BAD_

```less
.parent span {
  color: #000;
}
```

```html
<div className="parent">
  <span>Description</span>
</div>
```

_BETTER_

```less
.parent__description {
  color: #000;
}
```

```html
<div className="parent">
  <span className="parent__description">Description</span>
</div>
```

Reason:

- avoids unexpected side effects when elements are placed in different containers

### Rule 3: Avoid nesting of class names composition

Preprocessors allow to write code like this:

```less
// BAD
.parent {
  &__child {
    color: #000;
  }
  &__other {
    color: #000;
  }
}

Avoid this magic and write it like this:

// Correct
.parent__child {
  color: #000;
}
.parent__other {
  color: #000;
}
```

Reason: finding the actual class in the code base is a nightmare.

---

[Next: "Design accessibility in mind"](frontend-08-design-aim-colors.md)

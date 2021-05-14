# Code guidelines

## Javascript style

Style is enforced through `prettier` and linters such as `eslint`.

**Recommended**

Setup your editor properly.

- get linting warnings as you type.
- run code formatting automatically on save.

## CSS styles

**Avoid nesting and descendant selectors**

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

**Avoid targeting HTML elements**

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

- this avoids unexpected side effects when elements are placed in different containers and CSS
- CSS performance is the worst when targeting HTML elements.

**Avoid nesting of class names composition**

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

[Next: "UI framework importance"](frontend-06-ui-framework.md)

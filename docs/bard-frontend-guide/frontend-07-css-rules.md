# CSS Rules

These are rules to make CSS easily maintained, keep mental sanity and scale for big apps.

Before I go into the rules themselves, know that of course, there are always exceptions that makes us break the rules, it's normal. But 95% of the time, the rule shouldn't be broken.

## Rule 1: Component CSS should not be modified from the outside world.

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

> Component CSS classes should not be modified from the outside world.

Means that loader**inner, loader**dot classes, should not be changed from outside.

eg: **forbidden**

```css
.my-page .loader__dot {
  color: red;
}
```

A component should be considered a black box from outside. Of course, there are exceptions.

---

[Next: "Design accessibility in mind"](frontend-08-design-aim-colors.md)

# What is a (Mobx) store at code level?

A store is an ES6 class. It has properties and methods to get, hold and manipulate data for a **specific** area of the business. eg: userStore, productStore, ...

_Note_: Mobx can work with plain objects as well, but classes give us some advantages, so we will always use classes. ([See: a short note on classes](https://mobx.js.org/observable-state.html#a-short-note-on-classes))

_Conclusion_: "stores" are just "models" supercharged with observable capabilities thanks to Mobx.

## Typical store structure

```ts
import * as mobx from 'mobx'

export default class MyStore {
  myValue = true

  get myValueNegated() {
    return !this.myValue
  }

  changeMyValue(newValue: boolean) {
    this.myValue = newValue
  }

  constructor(rootStore) {
    this.rootStore = rootStore

    // (*) Explanation below
    mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
  }
}
```

## The one magic line

```ts
mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
```

This one liner that we put in class constructors gives the class observable capabilities:

- properties will become [observable values](https://mobx.js.org/observable-state.html#creating-observable-state).
- methods become [mobx actions](https://mobx.js.org/actions.html).
- getters become [computed values](https://mobx.js.org/computeds.html).

In 90% of cases you will want **to use the exact same options that were in the example above**.

**In details**

- `autoBind: true`: will bind the methods to the instance (the `this` value).

  **In practice**: manually binding the `this` value is typically needed when a method is set on a DOM element like a _button onClick handler_. This solves it for us. No need for arrow functions or to call `fn.bind(this)`. (eg: `this.changeMyValue = this.changeMyValue.bind(this)`)

- `deep: false`: the observable changes are limited at the **reference** level only.

  **In practice**: Mobx has [different "observation levels"](https://mobx.js.org/observable-state.html#available-annotations) to track values. Setting `deep` to false is **a sane default**. We basically only track reference change. For example: `array.push()` won't trigger an observable change, because the array reference has not changed. Instead we would set a new array that contains the updates. It is a more functional approach (less mutation, more performant and compatible with other apis).

---

[Next: "What is a VM - View-Model? (mobx-react)"](frontend-03-3-view-models_mobx-react.md)

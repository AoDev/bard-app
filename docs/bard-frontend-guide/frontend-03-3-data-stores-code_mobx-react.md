# What is a (Mobx) store at code level? (mobx-react)

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

(\*) This line gives the class observable capabilities:

- properties will become [observable values](https://mobx.js.org/observable-state.html#creating-observable-state).
- methods become [mobx actions](https://mobx.js.org/actions.html).
- getters become [computed values](https://mobx.js.org/computeds.html).

**Mobx store options**

In general you will want **to use the same options that were in the example above**.

- `autoBind: true` will bind the methods to the instance (the `this` value).  
  **In practice**: manually binding the `this` value is typically needed when a method is set on a DOM element like a _button onClick handler_. This solves it for us. No need for arrow functions or to call `fn.bind(this)`. (eg: `this.changeMyValue = this.changeMyValue.bind(this)`)

- `deep: false` the observable changes are limited at the reference level only.  
  **In practice**: Mobx has [different "levels"](https://mobx.js.org/observable-state.html#available-annotations) to track values. Setting `deep` to false allows to avoid some problems with external libraries and native structures like arrays. **It is a sane default**. But keep in mind that: `array.push()` won't trigger an observable change, because the array reference has not changed while `array.concat()` will because it returns a new reference.

---

[Next: "What is a VM - View-Model? (mobx-react)"](frontend-03-3-view-models_mobx-react.md)

# The Mobx / React combo

- We have external stores where our data is made **observable** with Mobx.
- React UI components **observe** the data and **update automatically**.

> We use the observer pattern to make React trully reactive.

## About Mobx

Mobx official docs are [here](http://mobx.js.org/).  
Mobx itself is a library that lets you implement business logic following the **observer pattern**.

### Mobx is NOT a Framework

It does not impose, nor help you with structuring your code.  
_There are many ways to use Mobx_ to write React App.

Mobx' goal is to provide an **easy way** to deal with observables.
It is that simplicity of use that makes it powerful and enjoyable at the same time. ([Transparent Functional Reactive Programming](https://medium.com/hackernoon/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.9aufnt6up))


## Principles we are trying to model

We strongly emphasize that business data and UI states are two different things.  
We follow the [MVVM pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel). (Model View View-Model)

- The app data (layer) is in external stores while the UI components state are in a VM (view-model).
- We like simple: there is little to no difference to manage local UI state and app data.
  - A VM is also a store but, it's local, temporary and connects external store to components.
  - We don't need react internal state most of the time. (no hooks or classes setState)
  - We just need to know javascript and a couple of things from Mobx.
- We want most components to be [controlled from outside](https://reactjs.org/docs/forms.html#controlled-components).
- The appearance of the UI is implemented in a UI Framework (Styles and components library).

<img width="576" alt="frontend-layers" src="https://user-images.githubusercontent.com/1526150/107215672-ea1ebe80-6a0b-11eb-9c47-9630179875b2.png">

**Another way to explain the clear separation of concerns**

Even though the UI is built to match the data, UI and data are separate layers. You should be able to throw away your entire UI without touching the stores or throw away the stores and feed the data to your UI in a different way.

> The external stores (= data layer) live on their own and don't need the UI for the business goal to be achieved.

---

[Next: "Structure of the data layer (mobx-react)"](frontend-03-2-structure-of-datalayer_mobx-react.md)

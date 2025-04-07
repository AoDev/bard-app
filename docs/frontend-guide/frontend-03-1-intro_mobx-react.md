# The Mobx / React combo

This is a detailed explanation of the usage of Mobx with React.  
For a simplified gist, check the next chapter: `04 feature gist`.

## Overview of the Entities

- **External Data Stores**: our data layer that holds the app global state.
- **View Models (VM)**: temporary UI state + connect external store to UI components.
- **UI components**: usually plain React functional components, no internal state. (internal state in VM)
- **UI framework**: generic and reusable UI styles and components. It is a key ingredient to scale UI development.

<img width="576" alt="frontend-layers" src="https://user-images.githubusercontent.com/1526150/107215672-ea1ebe80-6a0b-11eb-9c47-9630179875b2.png">

## Intro to Mobx

Mobx official docs are [here](http://mobx.js.org/).

Mobx itself is a library that lets you implement business logic following the **observer pattern**.

### Mobx is NOT a Framework

It does not impose, nor help you with structuring your code.

_There are many ways to use Mobx_ to write React App.

Mobx' goal is to provide an **easy way** to deal with observables.
It is that simplicity of use that makes it powerful and enjoyable at the same time. ([Transparent Functional Reactive Programming](https://medium.com/hackernoon/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.9aufnt6up))

### About the Mobx lib version

Mobx API has changed over time. This guide is using Mobx V6 (latest at the time of this writing).

## The relation between Stores and React UI

**The UI layer should limit itself to consume the data layer.**

- The app state is in external stores.
- No need for component react internal state most of the time. (no hooks or classes setState)
- We want most components to be [controlled from outside](https://reactjs.org/docs/forms.html#controlled-components).
- Local component state is provided through a "view-model" (VM) which in the end, is just a store as well. (More details in next chapters.)

> The external stores (= data layer) live on their own and don't need the UI for the business goal to be achieved.

**How to know if you do it right**

Even though the UI is built to match the data, UI and data are separate layers. You should be able to throw away your entire UI without touching the stores or throw away the stores and feed the data to your UI in a different way.

---

[Next: "Structure of the data layer (mobx-react)"](frontend-03-2-structure-of-datalayer_mobx-react.md)

# Structure of the data layer

**Reminder**: One goal of this recipe is to separate data management from UI components as much as possible.
This way, React components become simple reactive "templates".

**There are 3 levels**

- RootStore
- "Feature" stores
- "Models"

<img width="450" alt="3-layers-stores" src="https://user-images.githubusercontent.com/1526150/118300431-346b7c00-b4e2-11eb-812d-8eec8c6e7b61.png">

All of these are implemented using the observable capabilities of Mobx.

## RootStore: where everything starts

The **RootStore** is the backbone of the data layer.

It is responsible:

- for instantiating and connecting the other stores between themselves.
- for allowing the app state to be shared to the UI layer.
- for implementing use cases (or user stories) that depend on multiple stores.

## "Feature" stores

They hold and manipulate the state for a particular feature.
By feature I don't mean a small thing but rather something like:

- a `userStore` to represent everything about the user
- a `paymentStore` to model, check and list payments
- a `productStore` to fetch, save and filter the list of products
- ...

Depending on your app, you'll have clearly defined features that are usually matching a page / screen.

## Models

Models and stores are kind of the same thing but a model in our context is a small standalone entity.

Like the _ProductStore_ has a list of _ProductModels_.

> A model has only one responsibility. It represents one single "thing".
> A store can be interacting with all kinds of smaller models to implement a business use case.

---

[Next: "What is a (Mobx) store at code level? (mobx-react)"](frontend-03-3-data-stores-code_mobx-react.md)

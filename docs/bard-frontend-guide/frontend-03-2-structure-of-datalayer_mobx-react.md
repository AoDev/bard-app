# Structure of the data layer (mobx-react)

**Reminder**: One goal of this recipe is to separate data management from UI components as much as possible.
This way, React components become simple reactive "templates".

**There are 3 levels**

- RootStore
- Feature specific stores
- "Models"

## RootStore: where everything starts

The **RootStore** is the backbone of the data layer.

It is responsible:

- for instantiating and connecting the other stores between themselves.
- for allowing the app state to be shared in the entire app and to the UI layer.
- for implementing use cases (or user stories) that depend on multiple stores.

## Features specific stores

They hold and manipulate the state for a particular feature.
By feature I don't mean a small thing but rather something like:

`userStore`: everything about the user
`productStore`:

## Models

RootStore

- UIStore
- StakingStore
  - UserBalance
  - Rewards
  - Representatives

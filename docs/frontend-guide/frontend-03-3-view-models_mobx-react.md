# What is a VM - View-Model? (mobx-react)

> A VM is a connector between the View Layer and the Data Layer and is used as local state.

**It is a store but it's a temporary one**.

Instead of being an "external store", it is meant to be local state and / or a connector between the data layer and the UI components. Where you put click handlers or values of form inputs, etc...

They are typically created per feature sections or when the UI becomes complex and need to be split in smaller units. Like `productVM` for the part of an app that would deal with products.

### Using the "withVM" utility

`withVM` was created to make dev life easier. It runs the necessary logic to connect UI components + VM + external data stores.

Under the hood it is using mobx-react `inject`, which in turn, is using `React Context`.

### The advantage of this approach

**In short: it is much simpler.**

- **You can use "vanilla" javascript** to build your logic instead of learning and dealing with the caveats of React specific API such as `hooks` or classes `setState`.

- **Same code everywhere**  
  The way to code local state and global app state are the same. (declarative observable stores)

---

[Next: "How the data flows throughout the app (mobx-react)"](frontend-03-4-data-flow_mobx-react.md)

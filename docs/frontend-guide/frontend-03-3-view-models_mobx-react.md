# What is a VM - View-Model?

We want a simple life. So, a VM implementation is basically the same as an external store.

**It is a store but it's a temporary one**.

It is meant to be local state and / or a connector between the data layer and the UI components. Where you put click handlers or values of form inputs, etc...

They are typically created per feature sections or when the UI becomes complex and need to be split in smaller units. Like `productVM` for the part of an app that would deal with products.


## The advantage of this approach

**In short: it is much simpler.**

- **You can use "vanilla" javascript** to build your logic. No need to learn extra API's and dealing with the caveats of React such as `hooks` or classes `setState`. Or even the need for a 3rd party that requires to learn their own API's.

- **Same code pattern everywhere**  
  The way to code local state and global app state are the same. (declarative observable stores)


> A VM is a connector between the View Layer and the Data Layer and is used as local state.


---

[Next: "How the data flows throughout the app (mobx-react)"](frontend-03-4-data-flow_mobx-react.md)

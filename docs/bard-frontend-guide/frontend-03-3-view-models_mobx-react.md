# What is a VM - View-Model? (mobx-react)

> A VM is a connector between the View Layer and the Data Layer.

**It is a store but it's a temporary one**.

Instead of being an "external store", it is meant to be local state and / or a connector between the data layer and the UI components. Where you put click handlers or values of form inputs, etc...

They are typically created per feature sections or when the UI becomes complex and need to be split in smaller units. Like `productVM` for the part of an app that would deal with products.

### The "withVM" utility

`withVM` is a small utility I created to make dev life easier. It runs the necessary logic to connect UI components + VM + external data stores.

Under the hood it is using mobx-react `inject`, which in turn, is using `React Context`.
If you know _Redux_ it's a bit similar to using `connect state to props`.

### The advantage of this approach

**In short: it is much simpler.**

- **You can use vanilla javascript** to build your logic instead of learning and dealing with the caveats of React specific API such as `hooks` or classes `setState`.

- **Same code everywhere**  
  The way to code local state and global app state are the same. (declarative observable stores)

- **With VM, you don't need wrappers for 3rd party imperative libraries**.  
  Because React is declarative while some libs are imperative, you will find tons of React "wrappers" that serve as bridge. That means that sometimes you need to learn both the wrapper and the original library api's. The wrappers sometimes have bugs or may be outdated. We avoid all these problems.

---

[Next: "How the data flows throughout the app (mobx-react)"](frontend-03-4-data-flow_mobx-react.md)

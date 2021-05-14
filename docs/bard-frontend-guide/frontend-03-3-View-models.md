# What is a View-Model? (VM)

**It is also a store but it's a temporary one**.

Instead of being an "external store", it is meant to be local state and / or a connector between the data layer and the UI components. Where you put click handlers or values of form inputs, etc...

They are typically created per feature sections or when the UI becomes complex and need to be split in smaller units. Like `productVM` for the part of an app that would deal with products.

### The "withVM" utility

`withVM` is a small utility I created to make dev life easier. It is simply a tool that allows to connect UI components + VM + external data stores.

Under the hood it is using mobx-react `inject`, which in turn, is using `React Context`.
If you know _Redux_ it's a bit similar to using `connect state to props`.

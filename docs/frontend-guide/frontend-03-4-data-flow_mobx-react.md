# Passing data to UI components

## How React components get the stores data?

Mobx has a specific lib for React data binding. It is called [Mobx-React](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react)
It exposes utilities like `observer`, `provider` and `inject`.

Note that over time, developers have changed their mind about how to write React apps. (flux, event emitters, HOC, classes, hooks, context,...)
The same happened to Mobx. `provider` and `inject` are not "fashion enough" nowadays. **This recipe keeps using `provider` and `inject`**.

## Differences with stand alone React when passing props

With stand alone React, we are used to pass multiple props to components. With Mobx, we pass entire objects (stores and models) that are observable.

Here is a contrieved example:

**React stand alone**

```tsx
// Component
function UserDetails (props) {
  return (
    <div>{props.firstName} {props.lastName} {props.age}</div>
  )
}

// Usage
<UserDetails firstName="John" lastName="Doe" age={20}>
```

**Mobx-react**

```tsx
// Component
function UserDetails (props) {
  return (
    <div>{user.firstName} {user.lastName} {user.age}</div>
  )
}

// Usage
<UserDetails user={user}>
```

We will have 99% of our components as `observers`.
We will provide the app state (data layer) with `inject`.

---

[Next: "App feature gist"](frontend-04-feature-gist.md)

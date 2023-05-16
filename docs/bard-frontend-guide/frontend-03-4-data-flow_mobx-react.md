# Passing data to UI components (mobx-react)

## How React components get the stores data?

Mobx has a specific lib for React data binding. It is called [Mobx-React](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react)
It exposes utilities like `observer`, `provider` and `inject`.

Note that over time, developers have changed their mind about how to write React apps. (flux, event emitters, HOC, classes, hooks, context,...)
The same happened to Mobx. Although there are recommended alternatives, **this recipe keeps using `provider` and `inject`**.

## RootStore
As indicated earlier, the app has a "rootStore" that will be available to any component. Using context under the hood, the app is wrapped with Provider like this.

```tsx
import {Provider} from 'mobx-react'
const rootStore = new RootStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider rootStore={rootStore}>
    <App />
  </Provider>
)
```

## inject

Any component can get the rootStore by using `inject`.

```tsx
// App.tsx
import {inject, observer} from 'mobx-react'

function App({rootStore}: {rootStore: RootStore}) {
  return (
    <>
      <UserDetails user={rootStore.user} />  
    </>
  )
}

export default inject((stores) => ({rootStore: stores.rootStore}))(observer(App))
```

## withVM

Reminder

> withVM is a small utility to make dev life easier, so that you don't need to deal with `inject` and have an easy way to handle local state while keeping your components pure. 

### Example with a user profile and form handling

```tsx
// UserProfileVM.ts - local state like form inputs, submit
class UserProfileVM {
  inputFirstName: ''
  inputLastName: ''

  updateUser(event: FormEvent) {
    this.user.update(...)
  }

  constructor({rootStore}) {
    this.user = rootStore.user // <- rootStore is available thanks to withVM
    mobx.makeAutoObservable(...) // mobx init
  }
}

// UserProfile.tsx codes purely implements the view, keeping it simple and easy to update.
function UserProfile ({vm}: {vm: UserProfileVM}) {
  return (
    <form submit={vm.updateUser}>
     <input value={vm.user.inputFirstName} />
     <input value={vm.user.inputLastName} />
    </form>
  )
}

// index.ts in UserProfile folder
import withVM from 'app-lib/mobx/withVM'
import UserProfile from './UserProfile'
import UserProfileVM from './UserProfileVM' 
export default withVM(UserProfile, UserProfile)


// Usage
// UserProfile is getting data automatically, can be imported anywhere and rendered anywhere without dealing with props passing or inject.
import UserProfile from './UserProfile'

<App>
  <UserProfile /> 
</App>

```
Assuming that RootStore contains a UserStore with all sort of logic related to the user.

* The code above has created a UserProfile component that will receive a "vm" prop. 
* This vm is UserProfileVM and contains logic to handle a form state to update the user data.
* This vm got access to the RootStore automatically and so, to the userStore as well.

> Keeping things separated in this way allows to build large complex app.



## Props passing

Thank to the nature of mobx observables, we can pass full entities (objects) to child components with high performance by default.

Mobx will ensure that any property change to an object will cause React to re-render only the components that uses that property. (you get optimized component rendering for free :))


```tsx
// Component
function UserDetails ({user}) {
  return (
    <div>{user.firstName} {user.lastName}</div>
  )
}

// Usage
<App>
  <UserDetails user={rootStore.user}>
</App>
```

Here, if user.firstName changes, `<App />` will not re-render, but `<UserDetails />` will.

## Summary

> Most of our components will be `observers`.
> We will provide the app state (data layer) mostly with `withVM` and component `props`.

---

[Next: "App feature gist"](frontend-04-feature-gist.md)

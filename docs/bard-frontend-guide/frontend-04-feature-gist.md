# A Frontend Recipe: Gist

Almost no explanations, very summarized guide through a pseudo code example.

<img width="576" alt="frontend-layers" src="https://user-images.githubusercontent.com/1526150/107215672-ea1ebe80-6a0b-11eb-9c47-9630179875b2.png">

## File Structure

```
src/
  index.tsx

  App/
    Feature/
      index.ts
      Feature.less
      Feature.tsx
      FeatureItemList.tsx
      FeatureVM.ts

  stores/
    RootStore.ts
    UIStore.ts
    FeatureStore.ts

  styles/
    index.less

  ui-framework/
    components/
      Button.js
      Button.less

    styles/
      index.less

      elements/
        buttons.less
        panels.less
```

_Note the naming conventions. Folder, styles, VM, Component with same name..._

**src/index.tsx**

Where app is bootstrapped, UI mounted, RootStore instantiated.

```tsx
import {Provider} from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.scss'

const rootStore = new RootStore()

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## App/

**App.tsx**

= Root Component

```tsx
import React from 'react'
import Feature from './Feature'

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <Feature />
    </div>
  )
}
```

## App/Feature/

**index.ts**

= exports a component (Feature) connected to external stores through a VM

```ts
import withVM from 'app-lib/withVM'
import Feature from './Feature'
import FeatureVM from './FeatureVM'
export default withVM(Feature, FeatureVM)
```

**FeatureVM.ts**

= local store(state) + provide access to external store.

```ts
import * as mobx from 'mobx'
import {RootStore, FeatureStore} from 'src/stores'

export default class FeatureVM {
  public rootStore: RootStore
  public featureStore: FeatureStore

  public word = 'World'

  public changeWord() {
    this.word = 'There'
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.featureStore = rootStore.featureStore
    mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
  }
}
```

**Feature.tsx**

= UI for the feature

```tsx
import React from 'react'
import FeatureVM from './FeatureVM'
import FeatureItemList from './FeatureItemList'
import {Button} from 'ui-framework'

export default class Feature ({vm} : {vm: FeatureVM}) {
  return (
    <div className='panel'>
      Hello {vm.word}

      <Button onClick={vm.changeWord}>
        Change word
      </Button>

      <div className='feature__very-specific-style'>
        <FeatureItemList vm={vm}>
      </div>
    </div>
  )
}
```

**FeatureItemList.tsx**

= sub component for the feature. Receives the vm through props from parent component.

```tsx
import React from 'react'
import FeatureVM from './FeatureVM'

export class Feature {{vm} : {vm: FeatureVM}} {
  return (
    <div>
      {vm.featureStore.list.map((item) => <div>{item.data}</div>)}
    </div>
  )
}

export default observer(FeatureItemList)
```

**Feature.scss** (optional)

= specific styles for the feature UI if needed.

```scss
.feature__very-specific-style {
  position: absolute;
  top: 100px;
}
```

## /stores

**FeatureStore.ts**

= app state for a particular business use case

```ts
import * as mobx from 'mobx'

export default class FeatureStore {
  list = []

  constructor(rootStore: RootStore) {
    this.rootStore = RootStore
    mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
  }
}
```

**RootStore.ts**

= app root state.

- Injected in UI components with `withVM` util. (React Context)
- Instantiates other stores.

```ts
import * as mobx from 'mobx'
import FeatureStore from './FeatureStore'

export default class RootStore {
  constructor() {
    this.featureStore = new FeatureStore(this)
    mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
  }
}
```

## /styles

**index.scss**

= imports all styles from ui framework and app specific.

```scss
@import '../ui-framework/styles/index.scss';

@import '../App/Feature/Feature.scss';
```

---

[Next: "Code guidelines"](frontend-05-code-guidelines.md)

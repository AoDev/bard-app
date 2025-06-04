## Component snippet

```tsx
import {observer} from 'mobx-react'
import type {ComponentVM} from './ComponentVM'

export const Component = observer(({vm}: {vm: ComponentVM}) => {
  return (
    <div>
      Hello
    </div>
  )
})
```

## Store snippet

```ts
import {setMethod, assignMethod, toggleMethod} from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export default class FeatureStore {
  rootStore: RootStore
  set = setMethod<FeatureStore>(this)
  assign = assignMethod<FeatureStore>(this)
  toggle = toggleMethod<FeatureStore>(this)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
  }
}
```

## VM snippet

```ts
import {setMethod, assignMethod} from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class FeatureVM {
  rootStore: RootStore
  set = setMethod<FeatureVM>(this)
  assign = assignMethod<FeatureVM>(this)

  destroyVM() {
    // cleanup
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
```

### withVM usage
Feature is a React component.

```ts
import {withVM} from '@lib/mobx/withVM'
import {Feature} from './Feature'
import {FeatureVM} from './FeatureVM'
export default withVM(Feature, FeatureVM)
```

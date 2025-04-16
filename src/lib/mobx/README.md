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
import * as store from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export default class FeatureStore {
  rootStore: RootStore
  set: store.SetMethod<FeatureStore>
  assign: store.AssignMethod<FeatureStore>
  toggle: store.ToggleMethod<FeatureStore>

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.set = store.setMethod<FeatureStore>(this)
    this.assign = store.assignMethod<FeatureStore>(this)
    this.toggle = store.toggleMethod<FeatureStore>(this)
    makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
  }
}
```

## VM snippet

```ts
import * as store from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class FeatureVM {
  rootStore: RootStore
  set: store.SetMethod<FeatureVM>
  assign: store.AssignMethod<FeatureVM>

  destroyVM() {
    // cleanup
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.set = store.setMethod<FeatureVM>(this)
    this.assign = store.assignMethod<FeatureVM>(this)
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

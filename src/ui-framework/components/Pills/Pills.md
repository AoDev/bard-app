
### Simple example
The simplest example creates pills from an array of string.
The same string will be used as item id and label.

```
const items = ['one', 'two', 'three']
initialState = {activePill: 'one'}

function setActivePill (pillId) {
  setState({activePill: pillId})
}

<Pills items={items} activePill={state.activePill} onSelect={setActivePill}/>
```

### More complex example with objects

You can provide objects as items to have more control over the pills.

Take into account the following:

By default, _objectIdKey and objectLabelKey_ are "id" and "label" respectively.  
But, if you want to provide a different object structure, just indicate what to use.

- The value emited on select will be the value of item.objectIdKey.
- The "activePill" is always a string and will be matched with item.objectIdKey.
- You can disable a pill item by setting a 'disabled' property to true.  
  It is recommended to disabled a pill if clicking it will have no useful effect. (empty data)

```
const items = [
  {id: 'all', label: 'all: 10'},
  {id: 'warning', label: 'warning: 2'},
  {id: 'critical', label: 'critical: 0', disabled: true},
  {id: 'notreporting', label: 'not reporting: 1'}
]

initialState = {activePill: items[0].id}

function setPill (pillId) {
  setState({activePill: pillId})
}

<Pills
    items={items}
    activePill={state.activePill}
    onSelect={setPill}/>
```

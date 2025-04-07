### Simple example with an array of strings

```
// 1. Define your initial state.

const options = ['First option', 'Second option', 'Third option'];

initialState = {
  options,
  optionSelected: options[0]
};

// 2. Define an handler to update your state on change.

function setOption (event) {
  setState({
    optionSelected: event.target.value
  })
}

// 3. Use the selector component.

<DocsFakeContainer>
  <Selector
    id="styleguide-select-example"
    optionSelected={state.optionSelected}
    onChange={setOption}
    options={state.options}
    width={300}/>
  <div>
    Selected value:
    <span id="output">"{state.optionSelected}"</span>
  </div>
</DocsFakeContainer>

```

### More complex example with objects

```
// 1. Define your initial state.

const options = [
  { id: 1, name: 'First option' },
  { id: 2, name: 'Second option' },
  { id: 3, name: 'Third option' }
];

initialState = {
  options,
  optionSelected: options[0]
};

// 2. Define an handler to update your state on change.

function setOption (item) {
  setState({
    optionSelected: item
  })
}

// 3. Use the selector component.

<DocsFakeContainer>
  <Selector
    id="styleguide-select-example"
    optionSelected={state.optionSelected}
    objectIdKey="id"
    objectLabelKey="name"
    onChange={setOption}
    onChangeEmit="item"
    options={state.options}
    width={300}/>
  <div>
    Selected value:
    <span id="output">"{state.optionSelected.name}" with id: {state.optionSelected.id}</span>
  </div>
</DocsFakeContainer>

```

### You can choose what to emit

This is especially useful when you need to work with objects.

import * as mobx from 'mobx'
import withVM from 'bard-instruments/lib/react-mobx/withVM'
import CytoscapeDemo from './CytoscapeDemo'
import cytoscape from 'cytoscape'

const {observable, action} = mobx

const layoutOptions = {
  name: 'breadthfirst',
  directed: true,
  roots: '#a',
  padding: 10
}

function runDemo (container) {
  const cy = cytoscape({
    container,

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
      .selector('node')
      .style({
        'content': 'data(id)'
      })
      .selector('edge')
      .style({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd'
      })
      .selector('.highlighted')
      .style({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

    elements: {
      nodes: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'c'}},
        {data: {id: 'd'}},
        {data: {id: 'e'}},
      ],
      edges: [
        {data: {id: 'ae', weight: 1, source: 'a', target: 'e'}},
        {data: {id: 'ab', weight: 3, source: 'a', target: 'b'}},
        {data: {id: 'be', weight: 4, source: 'b', target: 'e'}},
        {data: {id: 'bc', weight: 5, source: 'b', target: 'c'}},
        {data: {id: 'ce', weight: 6, source: 'c', target: 'e'}},
        {data: {id: 'cd', weight: 2, source: 'c', target: 'd'}},
        {data: {id: 'de', weight: 7, source: 'd', target: 'e'}}
      ],
    },

    layout: layoutOptions,
  })

  return cy
}

class CytoscapeDemoVM {
  cy = null
  @observable.ref mountRef = null

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  @action.bound getMountRef (element) {
    this.mountRef = element
    if (element) {
      // ref callback will return null on unmount
      this.cy = runDemo(this.mountRef, this.nodes, this.edges)
    }
  }

  @action.bound addNode () {
    const newNode = {data: {id: String(Date.now())}}
    this.cy.add([Object.assign({group: 'nodes'}, newNode)])
    this.cy.layout(layoutOptions).run()
  }

  destroyVM () {
    this.cy.destroy()
  }

  constructor ({rootStore}) {
    this.appStore = rootStore.appStore
    this.router = rootStore.router
    this.uiStore = rootStore.uiStore
  }
}

export default withVM(CytoscapeDemo, CytoscapeDemoVM)

import ObservableViewport from './ObservableViewport'
import * as mobx from 'mobx'

const breakPoints = {
  small: 767,
  medium: 960,
}

/**
 * Observable screen media queries.
 */
export default class MediaQuery {
  viewPort = new ObservableViewport()

  get smScreen() {
    return this.viewPort.size.width <= breakPoints.small
  }

  get mdMinusScreen() {
    return this.viewPort.size.width <= breakPoints.medium
  }

  get mdScreen() {
    return (
      this.viewPort.size.width > breakPoints.small && this.viewPort.size.width <= breakPoints.medium
    )
  }

  get mdPlusScreen() {
    return this.viewPort.size.width > breakPoints.small
  }

  get lgScreen() {
    return this.viewPort.size.width > breakPoints.medium
  }

  constructor() {
    mobx.makeAutoObservable(this, undefined, {autoBind: true, deep: false})
  }
}

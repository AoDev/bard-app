import _ from 'lodash'
import * as mobx from 'mobx'
const {observable, action} = mobx

export default class ObservableViewport {
  static getViewPortSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  }

  size = ObservableViewport.getViewPortSize()

  updateViewportSize() {
    this.size = ObservableViewport.getViewPortSize()
  }

  destroy() {
    window.removeEventListener('resize', this.throttledUpdateViewportSize)
  }

  constructor() {
    mobx.makeObservable(this, {
      size: observable.ref,
      updateViewportSize: action.bound,
    })

    // Track viewport dimensions
    this.throttledUpdateViewportSize = _.throttle(this.updateViewportSize, 250, {
      leading: false,
    })
    window.addEventListener('resize', this.throttledUpdateViewportSize, {
      passive: true,
    })
  }
}

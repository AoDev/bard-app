import * as mobx from 'mobx'

/**
 * Generic View Model for simple dialogs.
 * It has a `visible` property that can be changed with `hide`/`show`/`toggle`
 */
export default class DialogVM {
  id = ''
  transitionDelay = 0
  /**
   * @type {'hidden' | 'visible' | 'showing' | 'hiding'}
   */
  state = 'hidden'

  get visible() {
    return this.state === 'visible' || this.state === 'showing' || this.state === 'hiding'
  }

  /**
   * Helper to set values through mobx actions.
   */
  set(prop, value) {
    this[prop] = value
  }

  show() {
    if (this.transitionDelay) {
      this.state = 'showing'
      setTimeout(() => {
        this.set('state', 'visible')
      }, this.transitionDelay)
    } else {
      this.set('state', 'visible')
    }
  }

  /**
   * @param {function=} cb optional callback to run after once hidden. Useful if there is a transition.
   */
  hide(cb) {
    if (this.transitionDelay) {
      this.set('state', 'hiding')
      setTimeout(() => {
        this.set('state', 'hidden')
        if (typeof cb === 'function') {
          cb()
        }
      }, this.transitionDelay)
    } else {
      this.set('state', 'hidden')
    }
  }

  toggle() {
    this.state === 'visible' ? this.hide() : this.show()
  }

  /**
   * - __id__: optional id passed for debugging purposes
   * - __visible__: initial state of the dialog. Default: `false`
   * - __transitionDelay__: amount of time between the state hiding and visible false. Default: `0`
   * @param {{ id?: string, visible: boolean, transitionDelay?: number }} props
   */
  constructor(props) {
    if (props) {
      const {visible, ...otherProps} = props
      Object.assign(this, otherProps)
      if (props.visible) {
        this.state = 'visible'
      }
    }
    mobx.makeObservable(this, {
      id: mobx.observable,
      visible: mobx.computed,
      transitionDelay: mobx.observable,
      state: mobx.observable,
      set: mobx.action.bound,
      show: mobx.action.bound,
      hide: mobx.action.bound,
      toggle: mobx.action.bound,
    })
  }
}

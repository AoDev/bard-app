import * as mobx from 'mobx'

const {action, observable} = mobx

export default class DialogVM {
  visible = false

  set(prop, value) {
    this[prop] = value
  }

  hide() {
    this.visible = false
  }

  show() {
    this.visible = true
  }

  toggleVisibility() {
    this.visible = !this.visible
  }

  /**
   * @param {{id: String, visible: Boolean}} props
   */
  constructor(props = {}) {
    mobx.makeObservable(this, {
      visible: observable,
      set: action.bound,
      hide: action.bound,
      show: action.bound,
      toggleVisibility: action.bound,
    })

    Object.assign(this, props)
  }
}

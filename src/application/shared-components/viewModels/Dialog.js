import * as mobx from 'mobx'

const {action, observable} = mobx

export default class Dialog {
  @observable visible = false
  @action.bound hide () {
    this.visible = false
  }
  @action.bound show () {
    this.visible = true
  }
  @action.bound toggleVisibility () {
    this.visible = !this.visible
  }

  /**
   * @param {{id: String, visible: Boolean}} props
   */
  constructor (props = {}) {
    Object.assign(this, props)
  }
}

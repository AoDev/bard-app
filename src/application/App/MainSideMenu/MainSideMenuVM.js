import * as mobx from 'mobx'

/**
 * @typedef {import('../../stores/RootStore').default} RootStore
 * @typedef {''} section
 */

export default class MainSideMenuVM {
  /**
   * @type {section}
   */
  section = ''
  subsectionMode = false
  /**
   * @type {{fn: function, title: string}[]} backBehaviour
   */
  backBehaviour = []
  headerTitle = ''

  get session() {
    return this.rootStore.session
  }

  /**
   * @param {section} section
   */
  changeSection(section) {
    this.section = section
  }

  hideSection() {
    this.changeSection('')
  }

  /**
   * @param {{fn: function, title: string}} backBehaviour
   */
  addBackBehaviour(backBehaviour) {
    this.backBehaviour = this.backBehaviour.concat(backBehaviour)
    this.headerTitle = backBehaviour.title || 'Back'
  }

  back() {
    if (this.backBehaviour.length > 0) {
      const {fn} = this.backBehaviour.shift()
      fn()
      this.headerTitle = ''
    } else {
      this.changeSection('')
    }
  }

  enableSubsectionMode() {
    this.subsectionMode = true
  }

  disableSubsectionMode() {
    this.subsectionMode = false
  }

  set(prop, value) {
    this[prop] = value
  }

  assign(props) {
    Object.assign(this, props)
  }

  hideMenu() {
    this.rootStore.uiStore.mainSideMenu.toggle()
    setTimeout(() => {
      this.assign({section: '', backBehaviour: [], headerTitle: ''})
    }, 500)
  }

  /**
   * @param {{rootStore: RootStore}} param0
   */
  constructor({rootStore}) {
    this.rootStore = rootStore
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}

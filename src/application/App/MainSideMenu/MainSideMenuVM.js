import * as mobx from 'mobx'

/**
 * @typedef {import('../../stores/RootStore').default} RootStore
 * @typedef {''} section
 */

const {observable, action} = mobx

export default class MainSideMenuVM {
  /**
   * @type {section}
   */
  @observable section = ''
  @observable subsectionMode = false
  /**
   * @type {{fn: function, title: string}[]} backBehaviour
   */
  @observable.ref backBehaviour = []
  @observable headerTitle = ''

  get session () {
    return this.rootStore.coreStore.session
  }

  /**
   * @param {section} section
   */
  @action.bound changeSection (section) {
    this.section = section
  }

  @action.bound hideSection () {
    this.changeSection('')
  }

  /**
   * @param {{fn: function, title: string}} backBehaviour
   */
  @action.bound addBackBehaviour (backBehaviour) {
    this.backBehaviour = this.backBehaviour.concat(backBehaviour)
    this.headerTitle = backBehaviour.title || 'Back'
  }

  @action.bound back () {
    if (this.backBehaviour.length > 0) {
      const {fn} = this.backBehaviour.shift()
      fn()
      this.headerTitle = ''
    }
    else {
      this.changeSection('')
    }
  }

  @action.bound enableSubsectionMode () {
    this.subsectionMode = true
  }

  @action.bound disableSubsectionMode () {
    this.subsectionMode = false
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  @action.bound hideMenu () {
    this.rootStore.uiStore.mainSideMenu.toggleVisibility()
    setTimeout(() => {
      this.assign({section: '', backBehaviour: [], headerTitle: ''})
    }, 500)
  }

  /**
   * @param {{rootStore: RootStore}} param0
   */
  constructor ({rootStore}) {
    this.rootStore = rootStore
  }
}

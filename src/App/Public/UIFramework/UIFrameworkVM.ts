import {includes} from '@lib/array'
import {setMethod, toggleMethod} from '@lib/mobx/store.helpers'
import {zoomTransition} from '@src/config/dialogConfig'
import type {RootStore} from '@src/stores'
import type {DialogVM, IconName} from '@ui'
import * as mobx from 'mobx'
import sections from './FrontendGuide/sections.json'

const menuSections = ['components', 'frontend-guide', 'css'] as const
const componentSections = ['buttons', 'forms', 'icons', 'modals', 'notes'] as const
const cssSections = ['typography', 'tables', 'links'] as const

export type MenuSection = (typeof menuSections)[number]
export type ComponentSection = (typeof componentSections)[number]
export type CssSection = (typeof cssSections)[number]
export type FrontendGuideSection = `frontend-${string}`
export type ContentId = ComponentSection | FrontendGuideSection | CssSection

function validateGuideData() {
  return sections.filter(
    (section): section is {id: FrontendGuideSection; title: string; content: string} =>
      section.id.startsWith('frontend-')
  )
}

export type UIFWMenuType = {
  id: MenuSection
  label: string
  items: {label: string; value: ContentId}[]
}

/**
 * @example
 * labelFromContentId('css-typography') // 'CSS Typography'
 */
function labelFromContentId(contentId: ContentId) {
  return contentId.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

const componentMenu: UIFWMenuType = {
  id: 'components',
  label: 'Components',
  items: componentSections.map((section) => ({label: labelFromContentId(section), value: section})),
}

const cssMenu: UIFWMenuType = {
  id: 'css',
  label: 'CSS',
  items: cssSections.map((section) => ({label: labelFromContentId(section), value: section})),
}

const frontendGuideMenu: UIFWMenuType = {
  id: 'frontend-guide',
  label: 'Frontend Guide',
  items: validateGuideData().map((section) => ({label: section.title, value: section.id})),
}

export class UIFrameworkVM {
  set = setMethod<UIFrameworkVM>(this)
  toggle = toggleMethod<UIFrameworkVM>(this)

  menus: Record<MenuSection, UIFWMenuType> = {
    components: componentMenu,
    'frontend-guide': frontendGuideMenu,
    css: cssMenu,
  }

  userHasConfirmedModal: null | boolean = null
  inputNoteWithBackground = false
  iModalFullscreen = false
  iModalWidth: '1x' | '2x' | '3x' = '2x'
  inputModalWithCloseButton = true
  inputHideOnOverlayClick = true
  inputTableNarrow = false
  iIconBgColor = 'var(--color-green-aim)'
  iIconBgPadding = 5
  iIconColor = 'var(--color-txt-inverse)'
  iIconName: IconName = 'caret-right'
  iIconSearch = ''
  iIconSize = 24
  rootStore: RootStore
  testModal: DialogVM

  confirmUserAction(hasConfirmed: boolean) {
    this.userHasConfirmedModal = hasConfirmed
    setTimeout(() => {
      this.set('userHasConfirmedModal', null)
    }, 2000)
  }

  destroyVM() {
    this.rootStore.uiStore.dialogs.remove([this.testModal])
  }

  goToSection(contentId: ContentId) {
    const sectionId = contentId.startsWith('frontend-')
      ? 'frontend-guide'
      : includes(cssSections, contentId)
        ? 'css'
        : includes(componentSections, contentId)
          ? 'components'
          : undefined
    if (!sectionId) {
      console.error('Invalid contentId, could not find corresponding section', contentId)
      return
    }
    this.rootStore.router.goTo(`/public/ui-framework?sectionid=${sectionId}&contentid=${contentId}`)
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore

    mobx.makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
    this.testModal = this.rootStore.uiStore.dialogs.create({
      id: 'test-modal',
      transition: zoomTransition,
    })
  }
}

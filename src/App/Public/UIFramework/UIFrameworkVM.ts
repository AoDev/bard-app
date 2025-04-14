import {includes} from '@lib/array'
import * as store from '@lib/mobx/store.helpers'
import {zoomTransition} from '@src/config/dialogConfig'
import type {RootStore} from '@src/stores'
import type {DialogVM, IconName} from '@ui'
import * as mobx from 'mobx'
import sections from './FrontendGuide/sections.json'

/**
 * Specific state for the form demo
 */
class DemoFormVM {
  set: store.SetMethod<DemoFormVM>

  inputSwitch = false
  inputSelect = 1
  inputSelectOptions = [1, 2, 3, 4, 5]
  select2 = undefined
  selectOptions2 = [
    {id: 1, label: 'one', invalidLabel: true},
    {id: 2, label: 'two', invalidLabel: true},
  ]

  constructor() {
    this.set = store.setMethod<DemoFormVM>(this)
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}

/**
 * Specific state for the buttons demo
 */
export class DemoButtonsVM {
  set: store.SetMethod<DemoButtonsVM>

  iButtonIsLoading = false
  iButtonDisabled = false
  iButtonActive = false
  iButtonFocused = false
  iButtonCaretRight = false
  iButtonCaretRightEnd = false
  iButtonIcon = false
  iButtonRound = false
  iButtonNarrow = false

  iBtnSelected: 'one' | 'two' = 'one'

  constructor() {
    this.set = store.setMethod<DemoButtonsVM>(this)
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}

const menuSections = ['components', 'frontend-guide'] as const

export const componentSections = [
  'buttons',
  'forms',
  'icons',
  'links',
  'modals',
  'notes',
  'tables',
  'typography',
] as const

export type MenuSection = (typeof menuSections)[number]
export type ComponentSection = (typeof componentSections)[number]
export type ContentId = ComponentSection | `frontend-${string}`

export function isContentId(contentId: unknown): contentId is ContentId {
  return (
    typeof contentId === 'string' &&
    (includes(componentSections, contentId) || contentId.startsWith('frontend-'))
  )
}

/**
 * Get the contentId and menuSection from the router params
 */
export function getContentFromParams(params: Record<string, string | number>): {
  contentId: ContentId
  menuSection: MenuSection
} {
  const {contentid, sectionid} = params
  const contentId: ContentId = isContentId(contentid) ? contentid : 'buttons'
  const menuSection: MenuSection = sectionid === 'frontend-guide' ? 'frontend-guide' : 'components'
  return {contentId, menuSection}
}

const componentItems: {label: string; value: ComponentSection}[] = componentSections.map(
  (section) => ({
    label: section.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
    value: section,
  })
)

const frontendGuideItems = sections.reduce((acc: {label: string; value: ContentId}[], section) => {
  if (isContentId(section.id)) {
    acc.push({label: section.title, value: section.id})
  }
  return acc
}, [])

export type UIFWMenuType = {
  id: MenuSection
  label: string
  items: {label: string; value: ContentId}[]
}

export class UIFrameworkVM {
  set: store.SetMethod<UIFrameworkVM>
  toggle: store.ToggleMethod<UIFrameworkVM>

  menus: Record<MenuSection, UIFWMenuType> = {
    components: {id: 'components', label: 'Components', items: componentItems},
    'frontend-guide': {id: 'frontend-guide', label: 'Frontend Guide', items: frontendGuideItems},
  }

  userHasConfirmedModal: null | boolean = null
  demoFormVM = new DemoFormVM()
  demoButtonsVM = new DemoButtonsVM()
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
  iSection: ComponentSection | string = 'buttons'
  iMenuSection: MenuSection = 'components'

  get contentSelected() {
    return getContentFromParams(this.rootStore.router.params)
  }

  confirmUserAction(hasConfirmed: boolean) {
    this.userHasConfirmedModal = hasConfirmed
    setTimeout(() => {
      this.set('userHasConfirmedModal', null)
    }, 2000)
  }

  destroyVM() {
    this.rootStore.uiStore.dialogs.remove([this.testModal])
  }

  toggleSection(section: MenuSection) {
    this.iMenuSection = section
  }

  goToSection(contentId: ContentId) {
    const sectionId = contentId.startsWith('frontend-') ? 'frontend-guide' : 'components'
    this.rootStore.router.goTo(`/public/ui-framework?sectionid=${sectionId}&contentid=${contentId}`)
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.set = store.setMethod<UIFrameworkVM>(this)
    this.toggle = store.toggleMethod<UIFrameworkVM>(this)

    mobx.makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
    this.testModal = this.rootStore.uiStore.dialogs.create({
      id: 'test-modal',
      transition: zoomTransition,
    })
  }
}

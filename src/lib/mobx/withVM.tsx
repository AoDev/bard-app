import * as mobxReact from 'mobx-react'
import {type ComponentType, type FC, type MemoExoticComponent, memo, useEffect, useRef} from 'react'

export interface IViewModel {
  onMount?: () => void | Promise<void>
  onUnmount?: () => void | Promise<void>
  [x: string]: any
}

type Constructable<T extends IViewModel, P extends {rootStore: any}> = new (props: P) => T

interface IComponentWithVMProps<T> {
  vm: T
  [x: string]: any
}

interface IProviderProps {
  [x: string]: any
  rootStore?: any
}

// A component wrapped in React.memo (like mobx's observer) is an object
// with a `type` property pointing to the original component.
const isMemoComponent = (c: unknown): c is MemoExoticComponent<ComponentType<any>> =>
  typeof c === 'object' && c !== null && 'type' in c

/**
 * Tries to determine a Component's name
 * @param {function} Component
 */
function getComponentDisplayName<T>(
  Component:
    | ComponentType<IComponentWithVMProps<T>>
    | MemoExoticComponent<ComponentType<IComponentWithVMProps<T>>>
) {
  if (isMemoComponent(Component)) {
    const unwrappedComponent = Component.type
    return unwrappedComponent.displayName || unwrappedComponent.name || 'Unknown'
  }

  // It's a regular function or class component
  return Component.displayName || Component.name || 'Unknown'
}

/**
 * `withVM` is a higher order component that allows to easily keep separated
 * the definition of a component internal state and its actual view (render) part.
 *
 * The `vm` or view-model, is an entity responsible for bridging the business data layer
 * and the UI. In general, you create a vm for top-level sections such as feature pages
 * or stand-alone "widgets" and pass it to children components.
 *
 * What `withVM` does technically:
 * - it creates an intermediary React component (= bridge)
 * - this component will do nothing except instantiating the VM and pass it to the actual UI component.
 * - the VM will be injected with the mobx rootStore, giving access the the business data layer.
 * - the rootStore is expected to be provided as a prop called "rootStore" in React Context.
 * - Optionally, a `onMount` method can be defined for initialization.
 * - Optionally, a `onUnmount` method can be defined for cleanup.
 *
 * @example
 * ```ts
 * import {withVM} from '@lib/mobx/withVM'
 * import {ProfileSettings} from './ProfileSettings'
 * import {ProfileSettingsVM} from './ProfileSettingsVM'
 * export default withVM(ProfileSettings, ProfileSettingsVM)
 * ```
 */
export function withVM<T extends IViewModel, P extends {rootStore: any}>(
  Component: ComponentType<IComponentWithVMProps<T>>,
  VM: Constructable<T, P>
) {
  const VMProvider = (props: P & IProviderProps) => {
    const {rootStore, ...otherProps} = props
    const {current: vm} = useRef(new VM(props))
    useEffect(() => {
      vm.onMount?.()

      return () => {
        vm.onUnmount?.()
      }
    }, [])
    return <Component vm={vm} {...otherProps} />
  }
  VMProvider.displayName = `${getComponentDisplayName(Component)}WithVM`
  return mobxReact.inject('rootStore')(memo(VMProvider)) as unknown as FC<Omit<P, 'rootStore'>>
}

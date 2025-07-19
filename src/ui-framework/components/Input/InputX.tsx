import type {NonFunctionKeys} from '@lib/mobx/store.helpers'
import {observer} from 'mobx-react'
import {Input, InputClearButton} from '../Input'
import type {IInputBasicProp} from './InputBasic'

interface IProps<T> extends IInputBasicProp {
  id?: string
  name: Extract<keyof T, string>
  withClearBtn?: boolean
  vm: T & {
    set: <K extends NonFunctionKeys<T>>(prop: K, value: T[K]) => void
  }
}

/**
 * InputX is an Input component that automatically binds to a property of the view model.
 * @example
 * // We have a vm with {firstName: string, lastName: string}
 * <InputX vm={vm} name="firstName" />
 */
export const InputX = observer(function InputX<vm>({
  vm,
  name,
  id,
  withClearBtn = false,
  ...otherProps
}: IProps<vm>) {
  const input = (
    <Input
      id={id || name || undefined}
      name={name}
      value={vm[name] as string | number | boolean | undefined}
      onChangeNameValue={vm.set}
      {...otherProps}
    />
  )
  if (withClearBtn) {
    return (
      <div className="input--with-clear-button">
        {input}
        <InputClearButton prop={name} vm={vm} />
      </div>
    )
  }
  return input
})

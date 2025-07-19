import {observer} from 'mobx-react'
import {type CSSProperties, useCallback} from 'react'
import {Button, Icon} from '../../'

interface IProps<T> {
  prop: Extract<keyof T, string>
  vm: T & {
    set: (prop: any, value: any) => void
  }
}

const style: CSSProperties = {position: 'absolute', right: '-14px', bottom: '-5px'}

/**
 * Adds a clear button to the right of the input
 * - Must be placed in the same container than the input
 * - The container must have position relative and in general with a fixed width or display flex
 * - In most cases you can use the className "input--with-clear-button"
 * @example
 * <div className="input--with-clear-button">
 *   <Input />
 *   <InputClearButton prop="iTextControlled" vm={demoFormVM} />
 * </div>
 */
export const InputClearButton = observer(function InputClearButton<vm>({vm, prop}: IProps<vm>) {
  const clear = useCallback(() => vm.set(prop, ''), [prop, vm])
  const visible = vm[prop] !== ''
  if (!visible) {
    return null
  }
  return (
    <Button
      round
      className={visible ? 'zoom-in hover--grow10p' : 'zoom-out'}
      variant="invisible"
      style={style}
      onClick={clear}
    >
      <Icon
        name="cross"
        color="var(--color-txt-default)"
        bgColor="var(--color-bg-alternative)"
        size={20}
        bgPadding={5}
      />
    </Button>
  )
})

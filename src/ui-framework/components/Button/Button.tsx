import {type CSSProperties, memo} from 'react'
import {Icon} from '../Icon'
import {Loader} from '../Loader'
import {ButtonBasic, type IButtonBasicProps} from './ButtonBasic'

export const buttonVariants = [
  'primary',
  'secondary',

  'red',
  'green',
  'invisible',

  'link',
  'menu',
  'tab',
  'theader',

  'icon',
] as const

export type ButtonVariant = (typeof buttonVariants)[number]

const loaderPlacement: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-20px',
  marginTop: '-10px',
}

const loaderRoundPlacement: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-15px',
  marginTop: '-7px',
}

const loader = (
  <div style={loaderPlacement}>
    <Loader />
  </div>
)
const loaderRound = (
  <div style={loaderRoundPlacement}>
    <Loader small />
  </div>
)
const iconCaretRight = (
  <span className="margin-left-1ch">
    <Icon name="caret-right" size={14} />
  </span>
)
const iconCaretRightEnd = (
  <span className="flex-row-end">
    <Icon name="caret-right" size={14} />
  </span>
)

export interface IButtonProps<V> extends IButtonBasicProps<V> {
  active?: boolean
  /** Add an arrow on the right of the button text */
  caretRight?: boolean
  /** Add an arrow at the extreme right of the button */
  caretRightEnd?: boolean
  /** Content of the button */
  children?: React.ReactNode
  /** CSS class */
  className?: string
  /** Disable the button + sets styles to diabled looking. */
  disabled?: boolean
  /** Focus / hover state programmatically */
  focused?: boolean
  /** Replace the button text by a loader. */
  isLoading?: boolean
  narrow?: boolean
  round?: boolean
  /** Change appearance of the button */
  variant?: ButtonVariant
  sizing?: 'auto' | 'medium' | 'narrow'
}

/**
 * Extended Button component
 *
 * __Extras compared to normal html button:__
 *
 * * You can pass a isLoading attribute to replace the text by a loader.
 * * Has variant for styling
 * * Can add caret icons easily
 */
export const Button = memo(function Button<V>(props: IButtonProps<V>) {
  const {
    active,
    caretRight = false,
    caretRightEnd = false,
    children,
    className = '',
    disabled,
    focused = false,
    isLoading = false,
    variant,
    round = variant === 'icon',
    sizing = 'medium',
    narrow,
    ...otherProps
  } = props

  const variantClass = variant ? `btn btn--${variant}` : ''

  let cssClasses = `${variantClass} ${className} btn--${sizing}`
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  round && (cssClasses += ' btn-round')
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  active && (cssClasses += ' active')
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  focused && (cssClasses += ' focus')
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  disabled && (cssClasses += ' disabled')
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  isLoading && (cssClasses += ' btn-loading')
  // biome-ignore lint/suspicious/noAssignInExpressions: no worries
  narrow && (cssClasses += ' btn--narrow')

  return (
    <ButtonBasic {...otherProps} className={cssClasses} disabled={disabled || isLoading}>
      {isLoading && variant !== 'icon' && (round ? loaderRound : loader)}
      {children}
      {caretRight && iconCaretRight}
      {caretRightEnd && iconCaretRightEnd}
    </ButtonBasic>
  )
})

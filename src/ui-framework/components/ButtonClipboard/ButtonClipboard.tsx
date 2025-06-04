import Clipboard from 'clipboard'
import {
  type AllHTMLAttributes,
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {Button} from '../Button'
import {Icon} from '../Icon'

// Avoid depending on external libraries, allowing it to be self contained
function isNumber(val: unknown): val is number {
  return typeof val === 'number' && isFinite(val)
}

const successIcon = <Icon name="check-circle" color="var(--color-green-aim)" size={16} />
const failIcon = <Icon name="cross" color="var(--color-red-aim)" size={16} />
const wrapperStyle: CSSProperties = {lineHeight: 1} // Fix some alignments issues

interface IButtonClipboardProps extends AllHTMLAttributes<HTMLButtonElement> {
  text: string
  color?: string
  top?: number
  size?: number
}

type CopyState = '' | 'success' | 'fail'

export const ButtonClipboard = (props: IButtonClipboardProps) => {
  const [copied, setCopied] = useState<CopyState>('')
  const elementRef = useRef<HTMLSpanElement>(null)
  const clipboardRef = useRef<Clipboard | null>(null)

  const notifyCopy = useCallback((successful: boolean) => {
    setCopied(successful ? 'success' : 'fail')

    setTimeout(() => {
      if (elementRef.current) {
        setCopied('')
      }
    }, 3000)
  }, [])

  useEffect(() => {
    if (elementRef.current) {
      clipboardRef.current = new Clipboard(elementRef.current, {
        text: () => props.text,
      })
      clipboardRef.current.on('success', () => notifyCopy(true))
      clipboardRef.current.on('error', () => notifyCopy(false))
    }

    return () => {
      clipboardRef.current?.destroy()
    }
  }, [props.text, notifyCopy])

  if (!Clipboard.isSupported()) {
    return null
  }

  const styles: CSSProperties = isNumber(props.top)
    ? {position: 'relative', top: `${props.top}px`}
    : {}

  return (
    <span ref={elementRef} style={wrapperStyle}>
      <Button
        variant="invisible"
        aria-label="Copy to Clipboard"
        style={styles}
        className={props.className || ''}
      >
        {copied === '' && (
          <Icon
            name="copy"
            color={props.color || 'var(--color-txt-muted)'}
            size={props.size || 16}
          />
        )}
        {copied === 'success' && successIcon}
        {copied === 'fail' && failIcon}
      </Button>
    </span>
  )
}

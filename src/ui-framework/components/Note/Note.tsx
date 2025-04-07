export type NoteVariant = 'red' | 'green' | 'blue' | 'orange' | 'neutral'

interface IProps {
  variant?: NoteVariant
  withBackground?: boolean
  className?: string
  children?: React.ReactNode
}

export function Note({variant = 'neutral', withBackground, className = '', children}: IProps) {
  const cssClasses = `note note--${variant}${withBackground ? '--with-bg' : ''} ${className}`
  return <div className={cssClasses}>{children}</div>
}

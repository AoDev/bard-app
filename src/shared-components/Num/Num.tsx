import {abbreviate, autoFormat, formatPercent} from '@lib/formatters/number'

const estimateSign = <span className="txt-muted">~</span>
const getColorClass = (value: string | number | undefined, autoColor: boolean) => {
  if (!autoColor) {
    return ''
  }
  return Number(value) > 0 ? ' txt-good' : Number(value) < 0 ? ' txt-bad' : ''
}

interface INumProps {
  abbreviated?: boolean
  autoColor?: boolean
  className?: string
  decimals?: number
  estimate?: boolean
  masked?: boolean
  percent?: boolean
  percentWithSign?: boolean
  title?: string | number
  value: string | number | undefined
  withSign?: boolean
}

// title is automatically set for the abbreviated value to be known fully on hover

export function Num({
  value,
  decimals,
  masked,
  abbreviated,
  autoColor = false,
  percent,
  percentWithSign,
  className,
  estimate,
  withSign,
  ...otherProps
}: INumProps) {
  if (masked) {
    return <span>…</span>
  }

  const cssClass = `${className || ''} ${getColorClass(value, autoColor)}`
  return (
    <span
      {...otherProps}
      className={cssClass}
      title={abbreviated && !masked ? autoFormat(value) : ''}
    >
      {estimate && estimateSign}
      {abbreviated
        ? abbreviate(value, decimals, withSign)
        : percent || percentWithSign
          ? formatPercent(value, withSign)
          : autoFormat(value, decimals || 16, {sign: withSign})}
      {percentWithSign && '%'}
    </span>
  )
}

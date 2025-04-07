import {Icon, type IconName} from '@ui'
import {Link} from 'bard-router'
import {type CSSProperties, type ReactNode, memo} from 'react'

const iconSize = 24

export const MenuButton = memo(
  (props: {
    className?: string
    icon: IconName
    label: ReactNode
    onClick: () => void
    style?: CSSProperties
    to: string
  }) => {
    const cssClass = `btn btn--msm hover--grow2p ${props.className || ''}`
    return (
      <Link
        autoActive
        className={cssClass}
        onClick={props.onClick}
        to={props.to}
        style={props.style}
      >
        <Icon top={4} name={props.icon} size={iconSize} />
        <span>{props.label}</span>
      </Link>
    )
  }
)

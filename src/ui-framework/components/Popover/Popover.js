import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactPopover from 'react-popover'

const variantClasses = {
  primary: 'Popover-primary',
  white: 'Popover-white',
}

/**
 * A generic popover component useful to display tooltips and context menus.
 *
 * Example:
 * <Popover
 *   body={headerMenu}
 *   onOuterAction={uiStore.hideHeaderMenu}
 *   isOpen={uiStore.headerMenuVisible}>
 *   <Button
 *     name="headerMenuVisible"
 *     onClick={uiStore.toggleProp}
 *     onClickEmit="name-value">
 *     Toggle menu
 *   </Button>
 * </Popover>
 */
export default class Popover extends Component {
  render() {
    let extraClasses = variantClasses[this.props.variant]
    let props = this.props

    if (this.props.className) {
      const {className, ...otherProps} = this.props
      extraClasses = `${className} ${extraClasses}`
      props = otherProps
    }

    return <ReactPopover {...props} className={extraClasses} />
  }
}

Popover.propTypes = {
  variant: PropTypes.oneOf(['primary', 'white']),
  className: PropTypes.string,
}

Popover.defaultProps = {
  variant: 'white',
  enterExitTransitionDurationMs: 200,
  tipSize: 10,
}

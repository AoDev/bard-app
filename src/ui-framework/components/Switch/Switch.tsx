import RcSwitch from 'rc-switch'
import React from 'react'

interface ISwitchProps {
  checkedChildren?: string
  id?: string
  name?: string
  onChange?: (val: boolean) => void
  onChangeNameValue?: (name: any, value: boolean) => void
  unCheckedChildren?: string
  value: boolean
}

/**
 * A switch component that you can use instead of a checkbox.
 * Note: the switch is animated but it doesn't work in the styleguide docs.
 */
export class Switch extends React.Component<ISwitchProps> {
  static defaultProps = {
    checkedChildren: 'on',
    unCheckedChildren: 'off',
  }

  constructor(props: ISwitchProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  /**
   * Handle the native onChange event.
   */
  onChange(newValue: boolean) {
    this.props.onChange?.(newValue)
    this.props.onChangeNameValue?.(this.props.name, newValue)
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {value, onChange, onChangeNameValue, ...otherProps} = this.props
    return <RcSwitch {...otherProps} onChange={this.onChange} checked={value} />
  }
}

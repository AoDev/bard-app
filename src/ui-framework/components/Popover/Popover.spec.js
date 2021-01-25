/* eslint-disable no-unused-expressions */
import React from 'react'
import {shallow} from 'enzyme'
import ReactPopover from 'react-popover'

import Popover from './Popover'

describe('<Popover />', () => {
  let wrapper
  let props
  const popoverContent = <div className="popover-content">something</div>
  const popoverTarget = <button id="some-button">Button</button>

  beforeEach(() => {
    props = {
      body: popoverContent,
      isOpen: true,
      onOuterAction() {},
      preferPlace: 'below',
      className: 'some-extra-class',
    }

    wrapper = shallow(<Popover {...props}>{popoverTarget}</Popover>)
  })

  it('should use react-popover internally', () => {
    const popover = wrapper.find(ReactPopover)
    expect(popover).toHaveLength(1)
  })

  it('should pass all the props to react-popover', () => {
    const popover = wrapper.find(ReactPopover)
    expect(popover.prop('body')).toEqual(props.body)
    expect(popover.prop('isOpen')).toEqual(props.isOpen)
    expect(popover.prop('onOuterAction')).toEqual(props.onOuterAction)
    expect(popover.prop('preferPlace')).toEqual(props.preferPlace)
  })

  it('should contain the target', () => {
    expect(wrapper.contains(popoverTarget)).toEqual(true)
  })

  it.skip('should have the target without the popover on server side', () => {
    // expect(wrapper.contains(popoverTarget)).toEqual(true)
    // expect(wrapper.contains(ReactPopover)).toEqual(false)
  })

  // TODO: currently it's not clear how many variants there will be. Only "primary" is defined.
  describe('design variants for colors', () => {
    // Should set colors for arrows / background based on a variant name.
    it('should use the variant "white" by default', () => {
      const popover = wrapper.instance()
      expect(popover.props.variant).toEqual('white')
    })

    it('should use class "Popover-white" for the variant "white"', () => {
      const popover = wrapper.find(ReactPopover)
      expect(popover.prop('className')).toContain('Popover-white')
    })

    it('should be able to add the variant class and an extra class', () => {
      const popover = wrapper.find(ReactPopover)
      expect(popover.prop('className')).toEqual('some-extra-class Popover-white')
    })
  })
})

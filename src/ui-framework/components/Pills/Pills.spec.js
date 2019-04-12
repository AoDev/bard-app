import React from 'react'
import {shallow} from 'enzyme'
import Pills from './Pills'

describe('<Pills />', () => {
  var wrapper
  var props

  beforeEach(() => {
    props = {
      itemSelected: 'one',
      items: ['one', 'two', 'three'],
      onChange: jest.fn()
    }

    wrapper = shallow(<Pills {...props}/>)
  })

  it('should create as many pills as props.items', () => {
    const pills = wrapper.find('[data-pill]')
    expect(pills).toHaveLength(props.items.length)
  })

  describe('default props', () => {
    it('should set "id" for objectIdKey and "label" for objectLabelKey', () => {
      const instanceProps = wrapper.instance().props
      expect(instanceProps.objectIdKey).toBe('id')
      expect(instanceProps.objectLabelKey).toBe('label')
    })

    it('should set "vertical" to false', () => {
      const instanceProps = wrapper.instance().props
      expect(instanceProps.vertical).toBe(false)
    })
  })

  describe('The active pill', () => {
    it('should be set from the itemSelected prop', () => {
      const activePill = wrapper.find('.active')
      expect(activePill).toHaveLength(1)
      expect(activePill.children().text()).toMatch('one')
    })

    it('should not have onClick handler', () => {
      // Prevents the user from clicking the same active pill repeatedly
      const activePill = wrapper.find('.active')
      expect(activePill.find('a').prop('onClick')).toBeNull()
    })
  })

  describe('Clicking a pill', () => {
    it('should call the onChange handler', () => {
      // NOTE: Could not creating a test without faking the event completely
      const pillTwoLink = wrapper.find('a').at(1)
      const dummyEvent = {
        preventDefault: function () {},
        target: {dataset: {pill: 'two'}}
      }
      pillTwoLink.simulate('click', dummyEvent)
      expect(props.onChange).toHaveBeenCalled()
    })
  })

  describe('When the items are strings', () => {
    it('should use the string as label for each item', () => {
      wrapper.find('a').forEach((node, index) => {
        expect(node.text()).toMatch(props.items[index])
      })
    })

    it('should use the string as pill id for each item', () => {
      wrapper.find('[data-pill]').forEach((node, index) => {
        expect(node.prop('data-pill')).toMatch(props.items[index])
      })
    })
  })

  describe('When the items are objects', () => {
    beforeEach(() => {
      props = {
        itemSelected: 'one',
        items: [
          {_id: 'one', name: 'pill one'},
          {_id: 'two', name: 'pill two'},
          {_id: 'three', name: 'pill three'}
        ],
        objectIdKey: '_id',
        objectLabelKey: 'name',
        onChange: jest.fn()
      }

      wrapper = shallow(<Pills {...props}/>)
    })

    it('should use the objectLabelKey to set the label for each item', () => {
      wrapper.find('a').forEach((node, index) => {
        expect(node.text()).toMatch(props.items[index][props.objectLabelKey])
      })
    })

    it('should use the objectIdKey to set the pill id for each item', () => {
      wrapper.find('[data-pill]').forEach((node, index) => {
        expect(node.prop('data-pill')).toMatch(props.items[index][props.objectIdKey])
      })
    })
  })

  describe('Vertical layout', () => {
    it('should set the "nav-stacked" css class on the list', () => {
      wrapper.setProps({vertical: true})
      expect(wrapper.find('.nav-stacked')).toHaveLength(1)
    })
  })
})

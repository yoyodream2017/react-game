import React from 'react'
import { shallow, mount } from 'enzyme'
import Sokoban from '../../../components/sokoban/Sokoban'
import renderer from 'react-test-renderer'

const simulateKeyEvent = (number) => {
  //37 left 38 top 39 right 40 bottom
  let event = new KeyboardEvent('keydown', {'keyCode': number})
  window.dispatchEvent(event)
}

describe('render', () => {
  it('renders without error', () => {
    const wrapper = shallow(<Sokoban />)

    expect(wrapper).toBeTruthy()
  })

  it('renders fitting snapshot', () => {
    const tree = renderer
      .create(<Sokoban />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with correct style', () => {
    const wrapper = shallow(<Sokoban />)

    expect(wrapper.find('.game').length).toBe(1)
    expect(wrapper.find('.game-board').length).toBe(1)
  })
})

describe('default value', () => {
  it('default state is right', () => {
    const wrapper = mount(<Sokoban />)

    expect(wrapper.state('stage')).toBe(1)
    expect(wrapper.state('boardSize')).toBe(15)
  })
})

describe('function', () => {
  it('key down direction can make character moves well', () => {
    const wrapper = mount(<Sokoban />)

    expect(wrapper.state('style')).toEqual({
      left: '160px',
      top: '160px',
      backgroundPositionX: '0px',
      backgroundPositionY: '0px'
    })

    simulateKeyEvent(37) // press left

    expect(wrapper.state('style')).toEqual({
      left: '128px',
      top: '160px',
      backgroundPositionX: '0px',
      backgroundPositionY: '-32px'
    })
  })

  it('character can push box to move', () => {
    const wrapper = mount(<Sokoban />)

    expect(wrapper.state('boxes')).toEqual([
      [5, 6], [6, 6], [7, 6]
    ])

    simulateKeyEvent(39) // press right

    expect(wrapper.state('boxes')).toEqual([
      [5, 7], [6, 6], [7, 6]
    ])
  })

  it('character cannot move when engaging wall', () => {
    const wrapper = mount(<Sokoban />)

    simulateKeyEvent(37) // press left

    expect(wrapper.state('style')).toEqual({
      left: '128px',
      top: '160px',
      backgroundPositionX: '0px',
      backgroundPositionY: '-32px'
    })
    
    simulateKeyEvent(37) // press left

    expect(wrapper.state('style')).toEqual({
      left: '96px',
      top: '160px',
      backgroundPositionX: '-32px',
      backgroundPositionY: '-32px'
    })

    simulateKeyEvent(37) // engage the wall then press left, keep the same left while bg changes

    expect(wrapper.state('style')).toEqual({
      left: '96px',
      top: '160px',
      backgroundPositionX: '-64px',
      backgroundPositionY: '-32px'
    })
  })

  it('calculate winning and stage number increase', async () => {
    const wrapper = mount(<Sokoban />)

    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(38)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(37)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(40)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(39)  
    simulateKeyEvent(37)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(37)
    simulateKeyEvent(40)
    simulateKeyEvent(40)
    simulateKeyEvent(39)
    simulateKeyEvent(38)
    simulateKeyEvent(38)
    simulateKeyEvent(39)
    simulateKeyEvent(39)
    simulateKeyEvent(40)

    // before last move
    expect(wrapper.state('boxes')).toEqual([
      [4,6], [6,6], [8,7] 
    ])

    // go to next stage
    simulateKeyEvent(37)

    expect(wrapper.state('boxes')).toEqual([
      [4, 6], [5, 5], [5, 7], [6, 3], [6, 4], [6, 6], [7, 5], [7, 7], [8, 6]
    ])
    expect(wrapper.state('stage')).toBe(2)
  })
})

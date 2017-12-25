import React, { Component } from 'react'
import SokobanBoard from './SokobanBoard'

class Sokoban extends Component {
  constructor(props) {
    super(props)
    this.boardSize = 15,
    this.squares = [
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '2', '2', '2', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '2', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0', '1', '1'],
      ['1', '1', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
      ['1', '1', '2', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0', '1', '1'],
      ['1', '1', '2', '2', '2', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
    ]
    this.state = {
      style: {
        left: '320px',
        top: '320px',
        backgroundPositionX: '0px',
        backgroundPositionY: '0px'
      }
    }
  }

  move(evt) {
    //First set a const style to record current style. check the square type on the position after character move to judge whether can move or not. If available just set state, if not just return.
    const e = evt || window.event
    const keyCode = e.keyCode
    const style = Object.assign({}, this.state.style)

    switch(keyCode) {
    case 37:
      this.characterMove('left', style)

      break
    case 38:
      this.characterMove('top', style)

      break
    case 39:
      this.characterMove('right', style)
      
      break
    case 40:
      this.characterMove('bottom', style)
      
      break
    }

    this.setState({
      style
    })
  }

  characterMove(direction, style) {
    const [position, stepSign, stepSize] = this.stepInfo(direction)
    
    if(this.checkFaceTo() === direction) {
      style.backgroundPositionX = parseInt(style.backgroundPositionX) - 32 + 'px'
    }else{
      style.backgroundPositionY = stepSize * 32 + 'px'
    }

    style[position] = parseInt(style[position]) + stepSign * 32 + 'px'

    if(this.checkWall([style.top, style.left])) {
      style[position] = parseInt(style[position]) - stepSign * 32 + 'px'
    }
  }

  checkFaceTo() {
    const { backgroundPositionY } = this.state.style

    switch(backgroundPositionY){
    case '0px':
      return 'bottom'
    case '-32px':
      return 'left'
    case '-64px':
      return 'right'
    case '-96px':
      return 'top'
    }
  }

  stepInfo(direction) {
    switch(direction) {
    case 'bottom':
      return ['top', 1, 0]
    case 'left':
      return ['left', -1, -1]
    case 'right':
      return ['left', 1, -2]
    case 'top':
      return ['top', -1, -3]
    }
  }

  checkWall(position) {
    const [i, j] = this.generateCoordinate(position)
    const wallList = ['1']

    return wallList.includes(this.squares[i][j])
  }

  generateCoordinate([x, y]) {
    return [Math.abs(parseInt(x)/32), Math.abs(parseInt(y)/32)]
  }

  generatePosition([x, y]) {
    const signX = x === 0 ? 1 : -1
    const signY = y === 0 ? 1 : -1

    return [signX*x*32+'px', signY*y*32+'px']
  }

  componentDidMount() {
    window.addEventListener('keydown', (evt) => {
      this.move(evt)
    })
  }

  render() {
    return (
      <div className='game-component soko-game'>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        <div className="game">
          <div className="game-board">
            <SokobanBoard
              squares={this.squares}
              boardSize={this.boardSize}
            />
            <div className='character' style={this.state.style}></div> 
          </div> 
        </div>
      </div>
    )
  }
}

export default Sokoban

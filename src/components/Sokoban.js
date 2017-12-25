import React, { Component } from 'react'
import SokobanBoard from './SokobanBoard'
import findIndex from '../utils/DeepArrayIndex'

class Sokoban extends Component {
  constructor(props) {
    super(props)
    this.boardSize = 15,
    this.gameOver = false
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
        left: '224px',
        top: '384px',
        backgroundPositionX: '0px',
        backgroundPositionY: '0px'
      },
      box: [
        [4, 9], [4, 10], [5, 8], [7, 8], [8, 7], [8, 9], [8, 11], [9, 8], [11, 8]
      ]
    }
  }

  move(evt) {
    //First set a const style to record current style. check the square type on the position after character move to judge whether can move or not. If available just set state, if not just return.
    if (this.gameOver) {
      return
    }

    const e = evt || window.event
    const keyCode = e.keyCode
    const style = Object.assign({}, this.state.style)
    const box = this.state.box.slice()

    switch(keyCode) {
    case 37:
      this.characterMove('left', style, box)

      break
    case 38:
      this.characterMove('top', style, box)

      break
    case 39:
      this.characterMove('right', style, box)
      
      break
    case 40:
      this.characterMove('bottom', style, box)
      
      break
    }

    this.setState({
      style,
      box
    })
  }

  characterMove(direction, style, box) {
    const [position, stepSign, stepSize, boxMove] = this.stepInfo(direction)
    
    if(this.checkFaceTo() === direction) {
      style.backgroundPositionX = parseInt(style.backgroundPositionX) - 32 + 'px'
    }else{
      style.backgroundPositionY = stepSize * 32 + 'px'
    }

    style[position] = parseInt(style[position]) + stepSign * 32 + 'px'

    const coord = this.generateCoordinate([style.top, style.left])
    const wallCoord = [coord[0] + boxMove[0], coord[1] + boxMove[1]]
    const coordIndex  = findIndex(box, coord)
    const wallCoordIndex = findIndex(box, wallCoord)

    if (coordIndex !== undefined && this.checkWall(wallCoord)) {
      style[position] = parseInt(style[position]) - stepSign * 32 + 'px'

      return
    } else if (coordIndex !== undefined && wallCoordIndex !== undefined) {
      style[position] = parseInt(style[position]) - stepSign * 32 + 'px'

      return
    } else if (coordIndex !== undefined) {
      box[coordIndex] = wallCoord
    } else {
      if(this.checkWall(coord) ) {
        style[position] = parseInt(style[position]) - stepSign * 32 + 'px'
      }
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
      return ['top', 1, 0, [1, 0]]
    case 'left':
      return ['left', -1, -1, [0, -1]]
    case 'right':
      return ['left', 1, -2, [0, 1]]
    case 'top':
      return ['top', -1, -3, [-1, 0]]
    }
  }

  checkWall(coord) {
    const [i, j] = coord
    const wallList = ['1']

    return wallList.includes(this.squares[i][j])
  }

  generateCoordinate([x, y]) {
    return [ parseInt(x) / 32 , parseInt(y) / 32]
  }

  generatePosition([x, y]) {
    return [ x * 32 + 'px', y * 32 + 'px']
  }

  componentDidMount() {
    window.addEventListener('keydown', (evt) => {
      this.move(evt)
    })
  }

  renderBoxList() { 
    const boxList = this.state.box.map(arr => {
      const [i,j] = this.generatePosition(arr)
      const style = {
        left: j,
        top: i
      }
      
      return (
        <div className='box' style={style} key={`'box'+ ${JSON.stringify(style)}`}></div>
      )
    })

    return(
      boxList
    )
  }

  calculateCount() {
    let count = 0
    
    this.state.box.forEach(([i, j]) => {
      if(this.squares[i][j] === '2'){
        count ++
      }
    })

    return count
  }

  renderWinning() {
    const count = this.calculateCount()
    const message = 'Congratulations! You\'ve won the Game.'

    if(count === this.state.box.length) {
      return (
        <div>{message}</div> 
      )
    } 
  }

  render() {
    return (
      <div className='game-component soko-game'>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        {this.renderWinning()}
        <div className="game">
          <div className="game-board">
            <SokobanBoard
              squares={this.squares}
              boardSize={this.boardSize}
            />
            <div className='character' style={this.state.style}></div>
            {this.renderBoxList()}
          </div> 
        </div>
      </div>
    )
  }
}

export default Sokoban

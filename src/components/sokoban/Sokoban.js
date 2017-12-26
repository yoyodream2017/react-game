import React, { Component } from 'react'
import SokobanBoard from './SokobanBoard'
import findIndex from '../../utils/DeepArrayIndex'
import config from './config'

class Sokoban extends Component {
  constructor(props) {
    super(props)
    
    this.gameOver = false
    
    this.state = config.slice()[1]
  }

  move(evt) {
    //First set a const style to record current style. check the square type on the position after character move to judge whether can move or not. If available just set state, if not just return.
    if (this.gameOver) {
      return
    }

    const e = evt || window.event
    const keyCode = e.keyCode
    const style = Object.assign({}, this.state.style)
    const boxes = this.state.boxes.slice()

    switch(keyCode) {
    case 37:
      this.characterMove('left', style, boxes)

      break
    case 38:
      this.characterMove('top', style, boxes)

      break
    case 39:
      this.characterMove('right', style, boxes)
      
      break
    case 40:
      this.characterMove('bottom', style, boxes)
      
      break
    }

    this.setState({
      style,
      boxes
    })
  }

  characterMove(direction, style, boxes) {
    const [position, stepSign, stepSize, boxMove] = this.stepInfo(direction)
    
    if(this.checkFaceTo() === direction) {
      style.backgroundPositionX = parseInt(style.backgroundPositionX) - 32 + 'px'
    }else{
      style.backgroundPositionY = stepSize * 32 + 'px'
    }

    style[position] = parseInt(style[position]) + stepSign * 32 + 'px'

    const coord = this.generateCoordinate([style.top, style.left])
    const wallCoord = [coord[0] + boxMove[0], coord[1] + boxMove[1]]
    const coordIndex  = findIndex(boxes, coord)
    const wallCoordIndex = findIndex(boxes, wallCoord)

    if (coordIndex !== undefined && this.checkWall(wallCoord)) {
      style[position] = parseInt(style[position]) - stepSign * 32 + 'px'

      return
    } else if (coordIndex !== undefined && wallCoordIndex !== undefined) {
      style[position] = parseInt(style[position]) - stepSign * 32 + 'px'

      return
    } else if (coordIndex !== undefined) {
      boxes[coordIndex] = wallCoord
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

    return wallList.includes(this.state.squares[i][j])
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
    const boxList = this.state.boxes.map(arr => {
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
    
    this.state.boxes.forEach(([i, j]) => {
      if(this.state.squares[i][j] === '2'){
        count ++
      }
    })

    return count
  }

  renderWinning() {
    const count = this.calculateCount()
    const message = 'Congratulations! You\'ve won the Game.'

    if(count === this.state.boxes.length) {
      return (
        <div>{message}</div> 
      )
    } 
  }

  render() {
    const globalClass = ['game-component', ' soko-game' ]
    const groundStyle = this.state.groundStyle
    globalClass.push(groundStyle)
    return (
      <div className={globalClass.join(' ')}>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        {this.renderWinning()}
        <div className="game">
          <div className="game-board">
            <SokobanBoard
              squares={this.state.squares}
              boardSize={this.state.boardSize}
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

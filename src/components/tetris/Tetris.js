import React, { Component } from 'react'
import TetrisBoard from './TetrisBoard'
import randInt from '../../utils/RandomInt'

class Tetris extends Component {
  constructor(props) {
    super(props)
    this.boardSize = [15, 10]
    this.gameOver = false
    this.timer = null
    this.state = {
      bonus: 0,
      pause: false,
      type: null,
      direction: null,
      position: [],
      boxes: [],
      squares: Array.from({length: this.boardSize[0]}).map(() => new Array(this.boardSize[1]).fill('1'))
    }
  }

  gameClear() {

    clearInterval(this.timer)

    this.timer = null
    
    this.gameOver = false

    this.pause = false// in case pause then clear 

    this.setState({
      bonus: 0,
      type: null,
      direction: null,
      position: [],
      boxes: [],
      squares: Array.from({length: this.boardSize[0]}).map(() => new Array(this.boardSize[1]).fill('1'))
    }, () => {
      this.resetBlock()
    })
  }

  gameStart() {
    if(this.timer) {
      return
    }

    this.timer = setInterval(() => {
      
      if (this.gameOver) {
        return
      }

      let type = this.state.type
      let direction = this.state.direction
      let position = this.state.position.slice()
      let boxes = this.state.boxes.slice()

      position[0]++

      if (this.reachBottom(position, boxes)) {
        position[0]--

        let positions = this.generateBoxPositions(position, boxes)

        this.resetSquares(positions)

        return
      }

      this.setState({
        type,
        direction,
        position,
        boxes
      })
    }, 500)
  }

  gamePause() {

    if(this.timer) {
      clearInterval (this.timer)
      this.timer = null
      this.pause = true
    } else {
      this.timer = setInterval(() => {
        let type = this.state.type
        let direction = this.state.direction
        let position = this.state.position.slice()
        let boxes = this.state.boxes.slice()

        position[0]++

        if (this.reachBottom(position, boxes)) {
          position[0]--
  
          let positions = this.generateBoxPositions(position, boxes)
  
          this.resetSquares(positions)
  
          return
        }
        this.pause = false

        this.setState({
          type,
          direction,
          position,
          boxes
        })
      }, 500)
    }
  }

  resetBlock() {
    const type = randInt(6)
    const direction = randInt(4)
    let [position, boxes] = this.generateBoxes(type, direction)

    this.setState({
      type,
      direction,
      position,
      boxes
    })
  }

  generateBoxes (type, direction) {
    let boxes = []
    let position = []

    switch(type) {
    case 1:
      switch(direction % 2) {
      case 1:
        boxes = [
          [-1,0], [0, 0], [1, 0], [2, 0]
        ]

        position = [-3, 4]

        break
      case 0:
        boxes = [
          [0,-1], [0, 0], [0, 1], [0, 2]
        ]

        position = [-1, 4]
      
        break
      }

      break
    case 2:
      switch(direction % 4) {
      case 1:
        boxes = [
          [-1,-1], [-1, 0], [0, 0], [1, 0]
        ]

        position = [-2, 5]

        break
      case 2:
        boxes = [
          [0, -1], [0, 0], [0, 1], [-1, 1]
        ]

        position = [-1, 4]

        break
      case 3:
        boxes = [
          [-1, 0], [0, 0], [1, 0], [1, 1]
        ]

        position = [-2, 4]

        break
      case 0:
        boxes = [
          [1, -1], [0, -1], [0, 0], [0, 1]
        ]

        position = [-2, 4]

        break
      }
    
      break
    case 3:
      switch(direction % 2) {
      case 1:
        boxes = [
          [-1,-1], [-1, 0], [0, 0], [0, 1]
        ]

        position = [-1, 4]

        break
      case 0:
        boxes = [
          [1, -1], [0, -1], [0, 0], [-1, 0]
        ]

        position = [-2, 5]

        break
      }

      break
    case 4:
      switch(direction % 1) {
      case 0:
        boxes = [
          [0, 0], [0, 1], [1, 0], [1, 1]
        ]

        position = [-2, 4]

        break
      }
        
      break
    case 5:
      switch(direction % 4) {
      case 1:
        boxes = [
          [-1, 0], [0, -1], [0, 0], [0, 1]
        ]

        position = [-1, 4]

        break
      case 2:
        boxes = [
          [-1, 0], [0, 0], [0, 1], [1, 0]
        ]

        position = [-2, 4]

        break
      case 3:
        boxes = [
          [0, -1], [0, 0], [0, 1], [1, 0]
        ]

        position = [-2, 4]

        break
      case 0:
        boxes = [
          [-1, 0], [0, -1], [0, 0], [1, 0]
        ]

        position = [-2, 5]

        break
      }
      
      break

    case 6:
      switch(direction % 4) {
      case 1:
        boxes = [
          [-1,1], [-1, 0], [0, 0], [1, 0]
        ]

        position = [-2, 4]

        break
      case 2:
        boxes = [
          [0, -1], [0, 0], [0, 1], [1, 1]
        ]

        position = [-1, 4]

        break
      case 3:
        boxes = [
          [-1, 0], [0, 0], [1, 0], [1, -1]
        ]

        position = [-2, 5]

        break
      case 0:
        boxes = [
          [-1, -1], [0, -1], [0, 0], [0, 1]
        ]

        position = [-2, 4]

        break
      }
  
      break
    }
    
    return [position, boxes]
  }

  moveForbid(method, position, boxes) {
    let positions = this.generateBoxPositions(position, boxes)
    let maxY = positions[0][1]

    positions.forEach(arr => {
      if (maxY < arr[1]) {
        maxY = arr[1]
      }
    })

    const squares = this.state.squares.slice()
    let runOnce = true

    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i]

      switch(method) {
      case 'left':
        if (x < 0) {
          continue
        }

        if (squares[x][y] === '2') {
          position[1]++

          return
          
        }

        break
      case 'right':
        if (x < 0) {
          continue          
        }

        if (squares[x][y] === '2') {
          position[1]--

          return
          
        }
        
        break
      case 'bottom':
        if (x < 0) {
          continue          
        }

        if ( x > 14 || squares[x][y] === '2' ) {
          position[0]--

          return
        }

        break
      

      case 'change':      
         
        if (maxY === 10 && runOnce) {
          runOnce = false
          position[1]--
          let currentPositions = this.generateBoxPositions(position, boxes)

          for (let z = 0; z < currentPositions.length; z++) {
            const [j, k] = currentPositions[z]
            if (j < 0) {
              continue
            }

            if (j > 14 || squares[j][k] === '2') {
              position[1]++

              return true
            }
          }
        }

        if (maxY === 11 && runOnce) {
          runOnce = false
          position[1] -= 2
          let currentPositions = this.generateBoxPositions(position, boxes)

          for (let z = 0; z < currentPositions.length; z++) {
            const [j, k] = currentPositions[z]
            if (j < 0) {
              continue
            }

            if (j > 14 || squares[j][k] === '2') {
              position[1]+=2

              return true
            }
          }
        }

        if (x < 0) {
          continue
        }

        if (y === -1) {
          position[1]++

          let currentPositions = this.generateBoxPositions(position, boxes)

          for (let z = 0; z < currentPositions.length; z++) {
            const [j, k] = currentPositions[z]
            if (j < 0) {
              continue
            }

            if (j > 14 || squares[j][k] === '2') {
              position[1]--

              return true
            }
          }
        }

        if (x > 14 || squares[x][y] === '2') {
          return true
        }

      }
    }
    
  }

  reachBottom(position, boxes) {
    let positions = this.generateBoxPositions(position, boxes)
    const squares = this.state.squares.slice()

    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i]

      if (x < 0 || y < 0) {
        continue
      }

      if (x === 15) {
        return true
      }
      
      if (squares[x][y] === '2') {
        return true
      }

    }

    return false
  }

  resetSquares(positions) {
    const squares = this.state.squares.slice()
    const type = randInt(6)
    const direction = randInt(4)
    let [position, boxes] = this.generateBoxes(type, direction)

    positions.forEach(arr => {
      const [i, j] = arr

      if (i < 0) {
        this.gameOver = true 
      } else { 
        squares[i][j] = '2'
      }
    })

    this.setState({
      type,
      direction,
      boxes,
      position,
      squares
    }, () => {
      this.removeSquares()
    })
  }
  
  removeSquares() {
    const squares = this.state.squares.slice()
    let bonus = this.state.bonus
    let removeLineCount = 0

    squares.forEach((line, index) => {
      let count = 0

      line.forEach(square => {
        if (square === '2') {
          count++
        }
      })

      if (count === 10) {
        squares.splice(index, 1)
        squares.unshift(new Array(10).fill('1'))
        removeLineCount++
      }

    })

    switch(removeLineCount){
    case 1:
      bonus += 10

      break
    case 2:
      bonus += 30
      
      break
    case 3:
      bonus += 60
      
      break
    case 4:
      bonus += 100
    
      break
    }

    this.setState({
      bonus,
      squares
    })

  }

  move(evt) {
    if (this.gameOver || this.pause) {
      return
    }
    const type = this.state.type
    let direction = this.state.direction   
    let boxes = this.state.boxes.slice()
    const position = this.state.position.slice()

    const e = evt || window.ebvent
    const keyCode = e.keyCode

    switch(keyCode) {
    case 37:
      this.boxMove('left', type, direction, position, boxes)

      break
    case 38:
      direction++
      if(this.boxMove('change', type, direction, position, boxes)){
        direction--
      }
      
      break
    case 39:
      this.boxMove('right', type, direction, position, boxes)
      
      break
    case 40:
      this.boxMove('bottom', type, direction, position, boxes)

      break

    }

    this.setState({
      direction,
      position,
      boxes
    })
  }

  boxMove(method, type, direction, position, boxes) {// eslint-disable-line
    const positions = this.generateBoxPositions(position, boxes)
    const squares = this.state.squares.slice()
    let minX = positions[0][1]
    let maxX = positions[0][1]

    for (let i = 0; i < positions.length; i++) {
      if (minX > positions[i][1]) {
        minX = positions[i][1]
      }
      if (maxX < positions[i][1]) {
        maxX = positions[i][1]
      }
    }

    if (method === 'left') {
      if(minX > 0) {
        position[1]--
      }

      this.moveForbid('left', position, boxes)
    }

    if (method === 'right') {
      if(maxX < 9) {
        position[1]++
      }

      this.moveForbid('right', position, boxes)

    }

    if (method === 'bottom') {
      position[0]++

      this.moveForbid('bottom', position, boxes)     
    }

    if (method === 'change') {

      for (let z = 0; z < positions.length; z++) {
        const [j, k] = positions[z]
        if (j < 0) {
          continue
        }

        if (j > 14 || (k > 0 && squares[j][k-1] === '2') || (k < 14 && squares[j][k+1] === '2')) {

          return true
        }
      }
      
      let [, calcuBoxes] = this.generateBoxes(type, direction)

      if (this.moveForbid('change', position, calcuBoxes)) {

        return true
      }

      boxes.forEach((arr, index) => {
        arr[0] = calcuBoxes[index][0]
        arr[1] = calcuBoxes[index][1]
      })
    }
  }

  generatePosition([x, y]) {
    return [ x * 32 + 'px', y * 32 + 'px']
  }

  generateBoxPositions(position, boxes) {
    
    return boxes.map(arr => {
      let array = [] 
      array[0] = arr[0] + position[0]
      array[1] = arr[1] + position[1]
      
      return array
    })
  }

  renderBoxList() {
    let positions = this.generateBoxPositions(this.state.position, this.state.boxes)

    const boxList = positions.map(arr => {
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

  renderGameOver() {
    const message = <h4>Game Over</h4>
    if (this.gameOver) {
      return(
        message
      )
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (evt) => {
      this.move(evt)
    })

    this.resetBlock()
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <div className='game-component tetris'>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        <div className="game">
          <div className="game-board">
            <TetrisBoard
              boardSize={this.boardSize}
              squares={this.state.squares}
            />
            {this.renderBoxList()}
          </div>
          <div className="game-info">
            <button className='game-info_button' onClick={() => this.gameStart()}>Start</button><br/>
            <button className='game-info_button' onClick={() => this.gamePause()}>Pause</button><br/>
            <button className='game-info_button' onClick={() => this.gameClear()}>Clear</button><br/>
            <div>Bonus: {this.state.bonus}</div>
            {this.renderGameOver()}
          </div>


        </div>
      </div>
    )
  }
}

export default Tetris

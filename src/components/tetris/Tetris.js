import React, { Component } from 'react'
import TetrisBoard from './TetrisBoard'
import randNum from '../../utils/RandomNum'

class Tetris extends Component {
  constructor(props) {
    super(props)
    this.boardSize = [15, 10]
    this.gameOver = false
    this.state = {
      bonus: 0,
      timer: null,
      type: null,
      direction: null,
      position: [],
      boxes: [],
      squares: Array.from({length: this.boardSize[0]}).map(() => new Array(this.boardSize[1]).fill('1'))
    }
  }

  gameRestart() {

    clearInterval(this.state.timer)

    this.setState({
      bonus: 0,
      timer: null,
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
    if(this.state.timer) {
      return
    }

    const timer = setInterval(() => {
      
      if (this.gameOver) {
        return
      }

      let type = this.state.type
      let direction = this.state.direction
      let position = this.state.position.slice()
      let boxes = this.state.boxes.slice()

      position[0]++

      if (this.reachBottom(boxes, position)) {
        position[0]--

        let positions = this.generateBoxPositions(boxes, position)

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

    this.setState({
      timer
    })
  }

  gamePause() {
    const timer = this.state.timer

    if(timer) {
      clearInterval (timer)

      this.setState({
        timer: null
      })
    } else {
      this.setState({
        timer: setInterval(() => {
          let type = this.state.type
          let direction = this.state.direction
          let position = this.state.position.slice()
          let boxes = this.state.boxes.slice()

          position[0]++

          if (this.reachBottom(boxes, position)) {
            position[0]--
    
            let positions = this.generateBoxPositions(boxes, position)
    
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
      })
    }
  }

  resetBlock() {
    const type = randNum(5)
    const direction = randNum(4)
    let [boxes, position] = this.generateBoxes(type, direction)

    this.setState({
      type,
      direction,
      boxes,
      position
    })
  }

  generateBoxes (type, direction, pos = []) {
    let boxes = []
    let position = pos.slice()

    const noPosition = position.length === 0

    switch(type) {
    case 1:
      switch(direction % 2) {
      case 1:
        boxes = [
          [-1,0], [0, 0], [1, 0], [2, 0]
        ]

        if (noPosition) {
          position = [-3, 4]
        }

        break
      case 0:
        boxes = [
          [0,-1], [0, 0], [0, 1], [0, 2]
        ]

        if (noPosition) {
          position = [-1, 4]
        }

        break
      }

      break
    case 2:
      switch(direction % 4) {
      case 1:
        boxes = [
          [-1,-1], [-1, 0], [0, 0], [1, 0]
        ]

        if (noPosition) {
          position = [-2, 5]
        }

        break
      case 2:
        boxes = [
          [0, -1], [0, 0], [0, 1], [-1, 1]
        ]

        if (noPosition) {
          position = [-1, 4]
        }

        break
      case 3:
        boxes = [
          [-1, 0], [0, 0], [1, 0], [1, 1]
        ]

        if (noPosition) {
          position = [-2, 4]
        }

        break
      case 0:
        boxes = [
          [1, -1], [0, -1], [0, 0], [0, 1]
        ]

        if (noPosition) {
          position = [-2, 4]
        }

        break
      }
    
      break
    case 3:
      switch(direction % 2) {
      case 1:
        boxes = [
          [-1,-1], [-1, 0], [0, 0], [0, 1]
        ]

        if (noPosition) {
          position = [-1, 4]
        }

        break
      case 0:
        boxes = [
          [1, -1], [0, -1], [0, 0], [-1, 0]
        ]

        if (noPosition) {
          position = [-2, 5]
        }

        break
      }

      break
    case 4:
      switch(direction % 1) {
      case 0:
        boxes = [
          [0, 0], [0, 1], [1, 0], [1, 1]
        ]

        if (noPosition) {
          position = [-2, 4]
        }

        break
      }
        
      break
    case 5:
      switch(direction % 4) {
      case 1:
        boxes = [
          [-1, 0], [0, -1], [0, 0], [0, 1]
        ]

        if (noPosition) {
          position = [-1, 4]
        }

        break
      case 2:
        boxes = [
          [-1, 0], [0, 0], [0, 1], [1, 0]
        ]

        if (noPosition) {
          position = [-2, 4]
        }

        break
      case 3:
        boxes = [
          [0, -1], [0, 0], [0, 1], [1, 0]
        ]

        if (noPosition) {
          position = [-2, 4]
        }

        break
      case 0:
        boxes = [
          [-1, 0], [0, -1], [0, 0], [1, 0]
        ]

        if (noPosition) {
          position = [-2, 5]
        }

        break
      }
      
      break
    }
    
    return [boxes, position]
  }

  reachBottom(box, position) {
    let positions = this.generateBoxPositions(box, position)
    const squares = this.state.squares.slice()

    for(let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i]

      if( x <= 0 || y <= 0) {
        continue
      }

      if(x === 15) {
        return true
      }
      
      if(squares[x][y] !== "1") {
        return true
      }


    }

    return false
  }

  resetSquares(positions) {
    const squares = this.state.squares.slice()
    const type = randNum(5)
    const direction = randNum(4)
    let [boxes, position] = this.generateBoxes(type, direction)

    try {
      positions.forEach(arr => {
        const [i, j] = arr
        
        squares[i][j] = '2'

      })
    }

    catch(err) {
      this.gameOver = true
    }

    this.setState({
      type,
      direction,
      boxes,
      position,
      squares
    })
  }

  move(evt) {
    if (this.gameOver || this.gamePause()) {
      return
    }

    const boxes = this.state.boxes.slice()
    const position = this.state.position.slice()
    const direction = this.state.direction

    const e = evt || window.ebvent
    const keyCode = e.keyCode

    switch(keyCode) {
    case 37:
      this.boxMove('left', position, direction)

      break
    case 38:
      this.boxMove('top', position, direction)

      break
    case 39:
      this.boxMove('right', position, direction)
      
      break
    case 40:
      this.boxMove('bottom', position, direction)

      break
    case 13:
      this.boxMove('change', position, direction)
      
      break
    }

    if(keyCode !==40) {
      this.setState({
        position,
        direction
      }, () => {
        this.gameStart()
      })
    }
  }

  boxMove(type, position, direction) {
    if(type === 'left') {
      position[1]--

      return
    }

    if(type === 'right') {
      position[1]++

      return
    }

    if(type === 'top') {

      return
    }

    if(type === 'bottom') {
      position[0]++
      const boxes = this.state.boxes.slice()

      if(this.reachBottom(boxes, position)){
        position[0]--

        let positions = this.generateBoxPositions(boxes, position)
        
        this.resetSquares(positions)

        return
      }

      return
    }

    if(type === 'change') {
      direction++
    }
  }

  generatePosition([x, y]) {
    return [ x * 32 + 'px', y * 32 + 'px']
  }

  generateBoxPositions(boxes, position) {
    
    return boxes.map(arr => {
      let array = [] 
      array[0] = arr[0] + position[0]
      array[1] = arr[1] + position[1]
      
      return array
    })
  }

  renderBoxList() {
    let positions = this.generateBoxPositions(this.state.boxes, this.state.position)

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

  componentDidMount() {
    window.addEventListener('keydown', (evt) => {
      this.move(evt)
    })

    this.resetBlock()
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
            <button className='game-info_button' onClick={() => this.gameRestart()}>Restart</button><br/>
            <div>Bonus: {this.state.bonus}</div>
          </div>


        </div>
      </div>
    )
  }
}

export default Tetris

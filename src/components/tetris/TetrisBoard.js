import React, { Component } from 'react'
import TetrisSquare from './TetrisSquare'
import { array } from 'prop-types'

const propTypes = {
  boardSize: array,
  squares: array
}

class TetrisBoard extends Component {
  renderSquare(i, j) {
    return (
      <TetrisSquare 
        type={this.props.squares[i][j]}
      />
    )
  }
  renderRow(i) {
    const columnSize = this.props.boardSize[1]
    const boardRow = Array.from({length: columnSize}).map((item, j) => {
      return (
        <span key={'square'+i+j}> 
          {this.renderSquare(i, j)}
        </span>
      )
    })

    return (
      boardRow
    )
  }

  render() {
    const rowSize = this.props.boardSize[0]
    let board = new Array(rowSize)
      .fill(null)
      .map(() => new Array(rowSize))// add fill to use array method map,forEach etc.
    
    board.forEach((arr, i) => {
      arr.push(
        <div className="board-row" key={'square'+i}>
          {this.renderRow(i)}
        </div>
      )}
    )

    return (
      <div>
        {board}
      </div>
    )
  }
}
TetrisBoard.propTypes = propTypes

export default TetrisBoard

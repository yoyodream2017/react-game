import React from 'react'
import CommonSquare from './CommonSquare'
import Board from '../Board'
import { number, array } from 'prop-types'

const propTypes = {
  boardSize: number,
  squares: array
}

class SokobanBoard extends Board {
  renderSquare(i,j) {
    return (
      <CommonSquare
        type={this.props.squares[i][j]}
      />
    )
  }
}
SokobanBoard.propTypes = propTypes

export default SokobanBoard

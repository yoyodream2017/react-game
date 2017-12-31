import React, { Component } from 'react'
import { string } from 'prop-types'

const propTypes = {
  type: string
}

class TetrisSquare extends Component {
  fillType() {
    const type = this.props.type
    
    switch(type) {
    case '2':
      return 'box-bg'
    default:
      return ''
    }
  }

  render () {
    const classNames = new Array('tetris-square', this.fillType())

    return (
      <div className={classNames.join(' ')}></div>
    )
  }
}
TetrisSquare.propTypes = propTypes

export default TetrisSquare

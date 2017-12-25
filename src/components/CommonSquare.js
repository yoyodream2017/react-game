import React, { Component } from 'react'
import { string } from 'prop-types'

const propTypes = {
  type: string
}

class CommonSquare extends Component {
  groundType() {
    const type = this.props.type
    switch(type) {
    case '0':
      return 'ground-bg'
    case '1':
      return 'magma-bg'
    case '2':
      return 'star-bg'
    default:
      return ''
    }
  }
  
  render() {
    const classNames = new Array('common-square', this.groundType())

    return (
      <div className='sokoban-component'>
        <div className={classNames.join(' ')}></div>
      </div>
    )
  }
}
CommonSquare.propTypes = propTypes

export default CommonSquare

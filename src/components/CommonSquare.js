import React, { Component } from 'react'
import { bool } from 'prop-types'

const propTypes = {
  ground: bool
}

class CommonSquare extends Component {
  render () {
    const classNames = [this.props.ground ? 'ground-bg' : 'magma-bg']
    classNames.push('common-square')
    return (
      <div className='sokoban-component'>
        <div className={classNames.join(' ')}></div>
      </div>
    )
  }
}
CommonSquare.propTypes = propTypes

export default CommonSquare

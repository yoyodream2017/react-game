import React, { Component } from 'react'
import { number, func } from 'prop-types'


const propTypes = {
  number,
  onButtonClick: func
}

class TestCode extends Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.onButtonClick()}>Click me</button>
        <div>{this.props.number}</div>
      </div>
    )
  }
}

TestCode.propTypes = propTypes

export default TestCode

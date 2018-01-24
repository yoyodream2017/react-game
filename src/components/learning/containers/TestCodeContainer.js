// @flow

import React from 'react'
import { connect } from 'react-redux'
import TestCode from '../components/Testcode'
import { Ping } from '../../../modules/learning/duck'
import { number, func } from 'prop-types'

const propTypes = {
  number,
  show: func
}

class TestCodeContainer extends React.Component {
  render() {
    return(
      <div>
        <TestCode number={this.props.number} onButtonClick={() => this.props.show()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  number: state.toJS().learning.number
})

const mapDispatchToProps = ({
  show: Ping
})

TestCodeContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(TestCodeContainer)

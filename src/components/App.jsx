import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class App extends Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  render () {
    return <div className="App">{this.props.message}</div>
  }
}
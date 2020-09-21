import React, { Component } from 'react'

export class Enhancer extends Component {
  render() {
    return (
      <div>
        <img style={{ maxWidth: '100%' }} src={this.props.cropped} alt=""/>
        <button onClick={this.props.enhance}>Enhance</button>
        <img style={{ maxWidth: '100%' }} src={this.props.enhanced} alt=""/>
      </div>
    )
  }
}

export default Enhancer

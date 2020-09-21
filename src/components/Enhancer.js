import React, { Component } from 'react'

export class Enhancer extends Component {
  render() {
    return (
      <div>
        {this.props.cropped && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={this.props.cropped} />
        )}
        <button onClick={this.props.enhance}>Enhance</button>
        {this.props.enhanced && (
          <img alt="Fuck" style={{ maxWidth: '100%' }} src={this.props.enhanced} />
        )}
      </div>
    )
  }
}

export default Enhancer

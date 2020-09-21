import React, { Component } from 'react'

export class Enhancer extends Component {
  render() {
    return (
      <div>
        {this.props.cropped && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={this.props.cropped} />
        )}
      </div>
    )
  }
}

export default Enhancer

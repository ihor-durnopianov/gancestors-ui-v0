import React, { Component } from 'react'

export class Enhancer extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.cropped && (
            <img alt="Crop" style={{ maxWidth: '100%' }} src={this.props.cropped} />
          )}
        </div>
        <button onClick={this.props.enhance}>Enhance</button>
        <div>
          {this.props.enhanced && (
            <img alt="Fuck" style={{ maxWidth: '100%' }} src={this.props.enhanced} />
          )}
        </div>
      </div>
    )
  }
}

export default Enhancer

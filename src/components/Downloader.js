import React, { Component } from 'react'

export class Downloader extends Component {
  render() {
    return (
      <div>
        <img style={{ maxWidth: '100%' }} src={this.props.enhanced} alt=""/>
        <a download="enhanced-pic.png" href={this.props.enhanced}>
          <button type="button" className="btn btn-primary">Скачать</button>
        </a>
      </div>
    )
  }
}

export default Downloader

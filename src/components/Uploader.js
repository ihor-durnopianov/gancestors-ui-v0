import React, { Component } from 'react'

export class Uploader extends Component {
  state = {
    image: null
  }

  render() {
    return (
      <div>
        <img src={this.props.image}/>
        <input type="file"
          onInput={(e) => {
            this.props.setImage(_readFile(e.target.files[0]))
          }}
        />
      </div>
    )
  }
}

function _readFile(file) {
  return window.URL.createObjectURL(file)
}

export default Uploader

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'

import Stepper from './components/Stepper'

class App extends Component {
  state = {
    image: null,
    cropped: null
  }

  setImage = (image) => {
    this.setState({image: image})
  }

  setCropped = (image) => {
    this.setState({cropped: image})
  }

  render() {
    return (
      // <div className="App">
      <div>
        <Stepper
          image={this.state.image}
          setImage={this.setImage}
          setCropped={this.setCropped}
          cropped={this.state.cropped}
        />
      </div>
    )
  }
}

export default App

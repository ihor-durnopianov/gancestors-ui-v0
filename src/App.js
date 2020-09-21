import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'

import Stepper from './components/Stepper'

class App extends Component {
  state = {
    image: null,
    cropped: null,
    enhanced: null
  }

  setImage = (image) => {
    this.setState({image: image})
  }

  setCropped = (image) => {
    this.setState({cropped: image})
  }

  // Might be better to take image as input
  enhance = () => {
    let enhanced = this.state.cropped
    this.setState({enhanced: enhanced})
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
          enhance={this.enhance}
          enhanced={this.state.enhanced}
        />
      </div>
    )
  }
}

export default App

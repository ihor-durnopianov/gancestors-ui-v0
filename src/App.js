import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'

import Stepper from './components/Stepper'

class App extends Component {
  state = {
    image: null
  }

  setImage = (image) => {
    this.setState({image: image})
  }

  render() {
    return (
      // <div className="App">
      <div>
        <Stepper image={this.state.image} setImage={this.setImage}/>
      </div>
    )
  }
}

export default App

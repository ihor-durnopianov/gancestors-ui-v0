import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'
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
    this.setState({
      cropped: image,
      enhanced: null
    })
  }

  // Might be better to take image as input
  enhance = () => {
    axios.post("http://127.0.0.1:4158/enhance", {image: this.state.cropped})
      .then(response => {
        if (response.data.error !== undefined) {
          // TODO: raise errors as pop-ups (?)
          console.log(response.data.error)
        }
        this.setState({enhanced: response.data.image})
      })
      .catch(error => {
        // TODO: raise errors as pop-ups (?)
        console.log(error.message)
      })
  }

  resetState = () => {
    // TODO: refactor to use single initial state
    this.setState({
      image: null,
      cropped: null,
      enhanced: null
    })
  }

  render() {
    return (
      // <div className="App">
      <Container className="App">
        <Stepper
          image={this.state.image}
          setImage={this.setImage}
          setCropped={this.setCropped}
          cropped={this.state.cropped}
          enhance={this.enhance}
          enhanced={this.state.enhanced}
          resetState={this.resetState}
        />
      </Container>
    )
  }
}

export default App

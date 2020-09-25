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
    enhanced: null,
    requested: false,
    // // 4 testing
    // image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBkAJYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+f6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD3PSLr4FDRbAajAftwt4/tHy3f8ArNo3dOOuenFXPtX7Pv8Az7/+OXleAUUAfSWgaV8EPE+rxaVpNgJ7yUMyRk3aZCgk8sQOgpfEGkfBHwvq0ml6vp4t7xFVmQG6fgjI5UkV5p8Cv+Sr6b/1yn/9FtUnx5/5Kpef9e8P/oAoA7P7V+z7/wA+/wD45eVV1O6+BB0m8FjAfthgfyPlu/8AWbTt68dcda8KooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOt/4Vx4g/wCEI/4S7y7f+ydnmbvOG/G/Z9361yVfR/8Azah/26f+3NfOFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH0X8OP+Tb/ABL/ANe9/wD+ia+dK+i/hx/ybf4l/wCve/8A/RNfOlABRRRQAUUUUAFFFFABRRRQAUUU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fihonhDwBqug6ha6hLdXk80kb28aMgDxIgyS4PVT2ryWiigAr0jwD8Y9Z8GQJptzGNS0ccC3kbDxA9djc8f7JyPTFeb0UAe9S+Jfgf4kJuNS0WbTrhsltsEkfPc/uWIP4ikj1v4E6Cy3VlpU2ozryFaGaQE/7sxC/pXg1FAHqfjz416p4os20nSLf+ydJZdjqjZklXGNpI4Vf9kfmRXllFFABRRRQB6p8Lvi8fBVlJo2rWkl5pDuXQxEGSEn7wAPDKeuMjnPrXT3F/8AAPVWNzNayWcr9UjiuI8f8BTKj8K8EooA9e8W658Jbfwrf6d4V0eSTUZ1VYrt4nbyzuBJ3StuHAI4HevIaKKACvSPAPxj1nwZAmm3MY1LRxwLeRsPED12Nzx/snI9MV5vRQB71L4l+B/iQm41LRZtOuGyW2wSR89z+5Yg/iKSPW/gToLLdWWlTajOvIVoZpAT/uzEL+leDUUAep+PPjXqniizbSdIt/7J0ll2OqNmSVcY2kjhV/2R+ZFeWUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABW54L/AOR68Pf9hO2/9GrWHUlvcTWlzFc28jRTwuJI5EOCrA5BB9QaAPb/ANpb/kM6B/17y/8AoS14ZWlq/iDWNfkik1fUrq+eIFY2uJC5UHqBms2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=",
  }

  setImage = (image) => {
    this.setState({image: image})
  }

  setCropped = (image) => {
    this.setState({
      cropped: image,
      enhanced: null,
      requested: false,
      // // 4 testing
      // enhanced: image
    })
  }

  // Might be better to take image as input
  enhance = () => {
    this.setState({requested: true})
    axios.post("http://127.0.0.1:4158/enhance", {image: this.state.cropped})
      .then(response => {
        if (response.data.error !== undefined) {
          window.alert(`Сервер упал с "${response.data.error}", сорри`)
          this.setState({requested: false})
        }
        this.setState({enhanced: response.data.image})
      })
      .catch(error => {
        window.alert("Сервер оффлайн, сорри")
        this.setState({requested: false})
      })
  }

  resetState = () => {
    // TODO: refactor to use single initial state
    this.setState({
      image: null,
      cropped: null,
      enhanced: null,
      requested: false,
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
          requested={this.state.requested}
        />
      </Container>
    )
  }
}

export default App

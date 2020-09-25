import React from 'react'
import {Button} from '@material-ui/core'

export function Uploader(props) {
  return (
    <div>
      <div>
        {props.image && <img src={props.image} alt=""/>}
      </div>
      {/* <input type="file"
        onInput={(e) => {
          props.setImage(_readFile(e.target.files[0]))
        }}
      /> */}
      <Button
        variant="contained"
        component="label"
        color='primary'
        style={{
          display: props.image ? "none" : 'inline',
          borderRadius: '1.5em',
          top: '32.5vh',
          padding: '.85em',
          paddingLeft: '1.25em',
          paddingRight: '1.25em',
          fontSize: '.9em'
        }}
      >
        <i className="fas fa-arrow-up" style={{
          paddingRight: '.5em',
          fontSize: '1.125em'
        }}></i>
        Выберите фото
        <input
          type="file"
          style={{ display: "none" }}
          onInput={(e) => {
            props.setImage(_readFile(e.target.files[0]))
          }}
        />
      </Button>
    </div>
  )
}

function _readFile(file) {
  return window.URL.createObjectURL(file)
}

export default Uploader

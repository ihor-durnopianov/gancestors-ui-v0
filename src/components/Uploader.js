import React from 'react'
import {Button} from '@material-ui/core'

import useStyles from '../style'

export function Uploader(props) {
  const classes = useStyles()
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
          top: '35vh',
          padding: '.85em',
          paddingLeft: '1.25em',
          paddingRight: '1.25em',
          fontSize: '.9em'
        }}
      >
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

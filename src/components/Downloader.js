import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import useStyles from '../style'

export function Downloader(props) {
  const classes = useStyles()
  let _getHeight = () => {
    return document.getElementById('enhancer').clientHeight
  }
  let _getEnhancedHeight = () => {
    return document.getElementById('enhanced').clientHeight
  }
  return (
    <div style={{
      height: `${_getHeight()}px`,
      maxHeight: '75vh'
    }}>
      <div>
        <img style={{
          maxWidth: '100%',
          height: `${_getEnhancedHeight()}px`,
          objectFit: 'fill',
          // Ugly, but how to do better?  Moreover, why without marginTop?
          position: 'relative',
          top: '50%',
          padding: '2.5em'
          // marginTop: '-37.5%'
        }} src={props.enhanced} alt=""/>
      </div>
      <div style={{paddingTop: '1em'}}>
        <a download="enhanced-pic.png" href={props.enhanced}>
          <Button
              variant="contained"
              color="primary"
              className={classes.button}
              style={{
                borderRadius: '3.5em',
                position: 'relative',
                top: '35%',
                // padding: '0.5875em',
                // paddingLeft: '1em',
                // paddingRight: '1em',
                marginRight: '0',
              }}
            >
              <i class="fas fa-arrow-down" style={{
                // fontSize: '2em',
                color: '#FFFFFF',
                paddingRight: '.5em',
                fontSize: '1.125em',
              }}></i>
              Сохранить
            </Button>
          </a>
        {/* <a download="enhanced-pic.png" href={props.enhanced}>
          <button type="button" className="btn btn-primary">Скачать</button>
        </a> */}
      </div>
    </div>
  )
}

export default Downloader

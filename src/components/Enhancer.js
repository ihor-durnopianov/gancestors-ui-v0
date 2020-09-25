import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from '../style'

export function Enhancer(props) {
  const classes = useStyles()
  let _getHeight = () => {
    let selector = document.getElementById('selector')
    if (selector !== null)
      return selector.clientHeight
    return document.getElementById('enhancer').clientHeight
  }
  return (
    <div id="enhancer">
      <Grid container spacing={0} justify='space-around' style={{
        height: `${_getHeight()}px`,
        maxHeight: '75vh'
      }}>
        <Grid item xs={5} style={{
          // maxHeight: '100%'
        }}>
          {/* div added to make it respond to position the same way as
              the other one */}
          <div style={{
            marginTop: '12.5%',
            // maxHeight: '100%',
          }}>
            <img style={{
              maxWidth: '100%',
              minWidth: '75%',
              objectFit: 'fill',
              // Ugly, but how to do better?
              position: 'relative',
              top: '50%',
              padding: '1em',
            }} src={props.cropped} alt=""/>
          </div>
        </Grid>
        <Grid item xs={1} style={{
          width: '100px'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={props.enhance}
              className={classes.button}
              style={{
                minWidth: '0',
                width: '3.5em',
                height: '3.5em',
                borderRadius: '3.5em',
                position: 'relative',
                top: '35%'
              }}
            >
              <i class="fas fa-magic" style={{
                fontSize: '2em',
                color: '#FFFFFF'
              }}></i>
            </Button>
        </Grid>
        <Grid item xs={5}>
          {props.requested && props.enhanced === null ? (
            <div style={{
              maxWidth: '100%',
              width: '75%',
              objectFit: 'fill',
              // Ugly, but how to do better?
              position: 'relative',
              top: '36.125%',
            }}>
              <CircularProgress />
            </div>
          ) : (
            <div style={{
              marginTop: '12.5%'
            }}>
              <img id="enhanced" style={{
                maxWidth: '100%',
                minWidth: '75%',
                objectFit: 'fill',
                // Ugly, but how to do better?
                position: 'relative',
                top: '50%',
                padding: '1em',
              }} src={props.enhanced} alt=""/>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Enhancer

// (Mostly) copied from https://material-ui.com/components/steppers/
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Uploader from './Uploader'
import Selector from './Selector'
import Enhancer from './Enhancer'
import Downloader from './Downloader'

import useStyles from '../style'

function getSteps() {
  return [
    'Загрузите фото', 'Выберите нужное', 'Подтвердите обработку', 'Сохраните себе'
  ];
}

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  if (activeStep === 0 && props.image !== null)
    setActiveStep(1)
  // // 4 testing
  // if (activeStep === 1 && props.cropped !== null) {setActiveStep(2)}
  // // if (activeStep === 2 && props.enhanced !== null) {setActiveStep(3)}

  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    props.resetState()
  };

  let _getChild = () => {
    switch(activeStep) {
      case 0:
        return <Uploader image={props.image} setImage={props.setImage}/>
      case 1:
        return <Selector image={props.image} setCropped={props.setCropped}/>
      case 2:
        return (
          <Enhancer
            cropped={props.cropped}
            enhance={props.enhance}
            enhanced={props.enhanced}
          />
        )
      case 3:
        return <Downloader enhanced={props.enhanced}/>
      default:
        return "Should never happen"
    }
  }

  let _isDisabled = (stepNumber) => {
    switch (stepNumber) {
      case 0:
        return props.image === null
      case 1:
        return props.cropped === null
      case 2:
        return props.enhanced === null
      default:
        return false
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} style={{
        paddingBottom: '2.25em'
      }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {_getChild()}
      {/* TODO: use spacing instead */}
      <br/>
      <div style={{
        textAlign: 'right', display: activeStep === 0 ? 'none' : 'block'
      }}>
        {activeStep === steps.length - 1 ? (
          <div>
            {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Бэк
            </Button>
            <Button onClick={handleReset} className={classes.button}>
              Ресет
            </Button> */}
          </div>
        ) : (
          <div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}
                className={classes.button} style={{
                  display: activeStep === 1 ? 'none' : 'inline'
                }}
              >
                Бэк
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={_isDisabled(activeStep)}
                style={{
                  // borderRadius: '15em',
                  // padding: '0',
                  minWidth: '0',
                  width: '3.5em',
                  height: '3.5em',
                  borderRadius: '3.5em'
                  // color: '#FFFFFF'
                }}
              >
                <i class="fas fa-arrow-right" style={{
                  fontSize: '2em',
                  color: '#FFFFFF'
                  // color: _isDisabled(activeStep) ? '' : '#3f51b5'
                }}></i>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

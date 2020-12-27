import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import { autoPlay } from 'react-swipeable-views-utils';

const logo = require('../../images/ahorta-logo.png');

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'A NODE MCU with a sensor',
    description: 'We use a Node MCU Module with a Micropython firmware to send requests about the humidity state',
    imgPath:
      'https://alexandremagno.net/wp-content/uploads/2020/12/Soil-Moisture-Sensor-ESP8266-NodeMCU_Steckplatine.png',
  },
  {
    label: 'We read the plant humidity',
    description: 'With the sensor we read the humidity level and send the result to our server',
    imgPath:
      'https://i1.wp.com/alexandremagno.net/wp-content/uploads/2018/12/soil-moisture-sensor-e1467578282801-1.png?w=1104&ssl=1',
  },
  {
    label: 'It fits with your plant',
    description: 'This is a simple module that you can connect in your plant the way you want',
    imgPath:
      'https://i2.wp.com/alexandremagno.net/wp-content/uploads/2018/12/IMG_6074-1-e1543858334746.jpg?w=1400&ssl=1',
  },
  {
    label: 'We notify you by email',
    description: 'You can setup the reading interval to receive notifications about your plant state',
    imgPath:
      'https://i1.wp.com/alexandremagno.net/wp-content/uploads/2018/12/Screen-Shot-2018-12-03-at-6.23.36-PM.png?w=565&ssl=1',
  },
];

const styles = theme => ({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  stepsContainer: {
    marginLeft: 72,
    textAlign: 'left',
    marginTop: 20,
    height: 65
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2
  }
});

class SwipeDialog extends Component {

  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes } = this.props;
    const maxSteps = tutorialSteps.length;
    const { activeStep } = this.state;
    return (
      <BaseDialog {...this.props}>
        <div className={classes.container}>
          <div className={classes.bottomMargin}>
            <img width={100} src={logo} alt="" />
          </div>
          <div>
            <AutoPlaySwipeableViews
              axis='x'
              index={activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img width={400} className={classes.img} src={step.imgPath} alt={step.label} />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
              }
            />
          </div>
          <div className={classes.stepsContainer}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
              {tutorialSteps[activeStep].label}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {tutorialSteps[activeStep].description}
            </Typography>
          </div>
        </div>
      </BaseDialog>
    )
  }
}

export default withRouter(withStyles(styles)(SwipeDialog));

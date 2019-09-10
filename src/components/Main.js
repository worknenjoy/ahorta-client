import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';
import SectionHeader from './typo/SectionHeader';
import SubscribeFrom from 'react-mailchimp-subscribe'
import ImageCard from './cards/ImageCard'
import {
  red,
  green
} from '@material-ui/core/colors'

import Topbar from './Topbar';

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 250
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});

const formProps = {
  url: '//truppie.us17.list-manage.com/subscribe/post?u=bb76ecd5ef5cbbc5e60701321&amp;id=7582e094e3',
  messages: {
    inputPlaceholder: 'Leave your email',
    btnLabel: 'I want one for me',
    sending: 'subscribing',
    success: 'Thanks for your interest. We will contact you to provide more details',
    error: 'We couldnt register your email. Please check if the address is correct or try again later'
  },
  styles: {
    sending: {
      fontSize: 14,
      color: green['900']
    },
    success: {
      fontSize: 14,
      color: green['900']
    },
    error: {
      fontSize: 14,
      backgroundColor: green['200'],
      display: 'inline-block',
      opacity: 0.8,
      padding: 10,
      color: red['700']
    }
  }
}

class Main extends Component {

  state = {
    learnMoredialog: false,
    getStartedDialog: false
  };

  async componentDidMount() {
    await this.props.logged()
  }

  openDialog = (event) => {
    this.setState({learnMoredialog: true});
  }

  dialogClose = (event) => {
    this.setState({learnMoredialog: false});
  }

  openGetStartedDialog = (event) => {
    this.setState({getStartedDialog: true});
  }

  closeGetStartedDialog = (event) => {
    this.setState({getStartedDialog: false});
  }

  render() {
    const { classes, loggedUser, history } = this.props;
    const currentPath = this.props.location.pathname
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={loggedUser && loggedUser.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
              <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div>
                        <div className={classes.box}>
                          <Typography color='secondary' gutterBottom>
                            Welcome to Ahorta
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Ahorta is a simple IOT device that connect to your wifi and read the humidity values of your plant and notify you, so you can have a better way to know the needs of your plants and the best way to provide water, no more, no less
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            We still under tests and looking for our first users to get yours at home and to make part of the community
                          </Typography>
                        </div>
                        <div className={classes.alignRight}>
                          <Button onClick={() => history.push('/devices')} color='secondary' variant="outlined" className={classes.actionButtom}>
                            See our devices
                          </Button>
                          <Button onClick={() => history.push('/signin')} color='primary' variant="contained" className={classes.actionButtom}>
                            Sign with your account
                          </Button>
                          <Button onClick={() => history.push('/signup')} color='primary' variant="contained" className={classes.actionButtom}>
                            Create an account
                          </Button>
                        </div>
                      </div>
                    </Paper>
                </Grid>
              </Grid>
              <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid}>
                <Grid item xs={12} md={4}>
                  <ImageCard 
                    image={require('../images/samples/IMG_3061.jpg')} 
                    title='A prototype for your plant'
                    description='We are developing our first version of a new device that will help you to take care of your plant'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ImageCard 
                    image={require('../images/samples/IMG_3143.jpg')} 
                    title='Monitoring your home garden'
                    description='Explore and discover by anaylising the humidity of your plants'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ImageCard 
                    image={require('../images/samples/IMG_4264.jpg')} 
                    title='Always green'
                    description='A plant can be complex, so know yours and keep it always green in your home'
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SectionHeader title="I want to know more about" subtitle="Subscribe to stay updated for our first release" />
                <Paper className={classes.paper}>
                  <div style={{textAlign: 'center'}}>
                    <div className='subscribe-form'>
                      <SubscribeFrom { ...formProps} />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <SwipeDialog
            open={this.state.learnMoredialog}
            onClose={this.dialogClose} />
          <InstructionDialog
            open={this.state.getStartedDialog}
            onClose={this.closeGetStartedDialog}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));

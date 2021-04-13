import React,  { Component } from 'react';
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeDialog from './dialogs/SwipeDialog';
import SectionHeader from './typo/SectionHeader';
import SubscribeFrom from 'react-mailchimp-subscribe'
import {
  red,
  green
} from '@material-ui/core/colors'

import { host } from '../url'
import DeviceItem from './cards/DeviceItem';
import CustomizedSnackbars from './common/CustomizedSnackbars';

import InstructionDialog from './dialogs/InstructionDialog';
import Topbar from './Topbar';

const backgroundShape = require('../images/shape.svg');
const mainImage = require('../images/ahorta-experiments-01.jpeg')

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
    textAlign: 'left'
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
    marginBottom: 40
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
    getStartedDialog: false,
    data: []
  };

  async componentDidMount() {
    await this.props.logged()
    const devices = await axios.get(`${host}/devices`,
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    this.setState({data: devices.data})
    //const newUser = await this.props.createUser({email: 'alz@worknenjoy.com', password: 'demo'})
    //const user = await this.props.fetchUser(7)
    //const updateUser = await this.props.updateUser(7, {name: 'Alexandre Magno'})
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

  onAction = (id) => {
    this.props.history.push(`/dashboard/${id}`)
  }

  render() {
    const { data } = this.state
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
                    <Paper className={classes.paper} elevation color='primary'>
                      <div style={{ display: 'flex', alignItem: 'flex-start'}}>
                        <div className={classes.box}>
                          <Typography color='primary' variant='h4' gutterBottom>
                            Welcome to Ahorta
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            Ahorta is a prototype of an IOT device built with Arduino to automate your home gardening
                          </Typography>
                          <div>
                            <Button onClick={this.openDialog} color='primary' size='small' variant="outlined" className={classes.actionButtom}>
                              How it works?
                            </Button>
                            <Button onClick={() => history.push('/signup')} color='primary' size='small' variant="outlined" className={classes.actionButtom}>
                              Create an account
                            </Button>
                          </div>
                        </div>
                        <img width='400' src={mainImage} alt='sample image' />
                      </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <SectionHeader title="Last devices added to our platform" subtitle="This is our devices already created using Ahorta" />
                      {data.map(r =>  {
                          return r.deviceId && 
                            <div style={{marginTop: 20}}>
                              <DeviceItem minValue={r.minValue} maxValue={r.maxValue} user={r.User} at={r.Readings[0] && r.Readings[0].createdAt} lastReading={r.Readings[0] && r.Readings[0].value} threshold={r.threshold} ssid={r.ssid} deviceId={r.deviceId} name={r.name} onAction={() => this.onAction(r.id)} />
                            </div>
                        })}
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
        <CustomizedSnackbars
          message={this.props.notification.message}
          open={this.props.notification.open}
          variant={this.props.notification.variant}
          closeNotification={this.props.closeNotification} />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));

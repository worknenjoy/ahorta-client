import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';
import CustomizedSnackbars from './common/CustomizedSnackbars';

import SectionHeader from './typo/SectionHeader'
import ProfileMenu from './profile/ProfileMenu'
import Topbar from './Topbar';
import DeviceItem from './cards/DeviceItem';
import SearchButton from '../components/form/SearchButton'

const backgroundShape = require('../images/shape.svg')

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    width: 152
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

class Connect extends Component {

  state = {
    deviceId: null,
    deviceFound: null,
    deviceNotFound: false,
    userId: null,
    loading: false
  };

  async componentDidMount() {
    const user = await this.props.logged()
    this.setState({userId: user.data.user.id})
  }

  async onSearch(e) {
    e.preventDefault()
    this.setState({loading: true})
    const devices = await this.props.listDevices()
    const deviceFound = devices && devices.data.filter(d => !d.UserId && d.deviceId === this.state.deviceId)
    if(deviceFound && deviceFound.length) {
      this.setState({ deviceFound: deviceFound[0], deviceNotFound: false, loading: false })
    } else {
      this.setState({ deviceNotFound: true, devideFound: null, loading: false})
    }
  }

  openDialog = (event) => {
    this.setState({ learnMoredialog: true });
  }

  dialogClose = (event) => {
    this.setState({ learnMoredialog: false });
  }

  openGetStartedDialog = (event) => {
    this.setState({ getStartedDialog: true });
  }

  closeGetStartedDialog = (event) => {
    this.setState({ getStartedDialog: false });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state)
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.updateDevice(this.state.deviceFound.id, {
      UserId: this.state.userId
    }).then(response => {
      console.log(response)
      if (response.data.UserId) {
        this.props.openNotification('Your device was updated', 'success')
        this.props.history.push(`/profile`)
      } else {
        this.props.openNotification('there was an error to update your device', 'error')
      }
    }).catch(e => {
      this.props.openNotification('There was an error to update your information, please try again later', 'error')
    })
  }

  render() {
    const { classes, history, logged, loggedUser, logout } = this.props;
    const { deviceFound, deviceNotFound, loading } = this.state
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={loggedUser && loggedUser.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={4} alignItems="center" justify="flex-start" container className={classes.grid}>
              <Grid item xs={3}>
                <ProfileMenu onLogout={logout} logged={logged} history={history} user={loggedUser && loggedUser.data.user} />
              </Grid>
              <Grid item xs={9}>
                <SectionHeader title="Account" subtitle="Update your account information" />
                <div style={{ marginTop: 20 }}>
                  <Paper className={classes.paper}>
                    <form method='POST'
                      onSubmit={this.onSubmit}
                    >
                      <SearchButton onChange={(e) => this.handleChange(e) } onSearch={(e) => this.onSearch(e)} />
                      <div style={{paddingTop: 20, paddingBottom: 20}}>
                        { loading && <CircularProgress />}
                        { deviceFound && deviceFound.id && <DeviceItem  
                            at={deviceFound.Readings[0] && deviceFound.Readings[0].createdAt}
                            lastReading={deviceFound.Readings[0] && deviceFound.Readings[0].value}
                            deviceId={deviceFound.deviceId} name={deviceFound.name}
                            noDashboard
                          />}
                          { deviceNotFound && 'device not found'}
                      </div>
                      <div className={classes.alignRight}>
                        <Button disabled={!this.state.deviceFound} type='submit' color='primary' variant="contained">
                          Connect
                          </Button>
                      </div>
                    </form>
                  </Paper>
                </div>
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

export default withRouter(withStyles(styles)(Connect));

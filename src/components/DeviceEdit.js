import React, { Component } from 'react';
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';
import TextField from '@material-ui/core/TextField';
import CustomizedSnackbars from './common/CustomizedSnackbars';

import SectionHeader from './typo/SectionHeader'
import ProfileMenu from './profile/ProfileMenu'
import Topbar from './Topbar';
import { host } from '../url'

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

class DeviceEdit extends Component {

  state = {
    name: '',
    data: {}
  };

  async componentDidMount() {
    await this.props.logged()
    const deviceId = this.props.match.params.id
    const myDevice = await axios.get(`${host}/devices/${deviceId}`,
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    this.setState({ data: myDevice.data, name: myDevice.data.name })
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
  }

  onSubmit = event => {
    event.preventDefault()
    const deviceId = this.props.match.params.id
    axios.put(`${host}/devices/${deviceId}`, 
      {
        name: this.state.name
      },
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        } 
      }
    ).then(response => {
      console.log(response)
      this.props.openNotification('Your device information was updated successfully', 'success')
      this.props.history.push(`/profile`)
    }).catch( e => {
      this.props.openNotification('There was an error to update your information, please try again later', 'error')
    })
  }

  render() {
    const { classes, history, logged, loggedUser } = this.props;
    const { data } = this.state
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={loggedUser && loggedUser.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={4} alignItems="center" justify="flex-start" container className={classes.grid}>
              <Grid item xs={3}>
                <ProfileMenu onLogout={this.logout} logged={logged} history={history} user={loggedUser && loggedUser.data.user} />
              </Grid>
              <Grid item xs={9}>
                <SectionHeader title="Devices" subtitle="Ahorta devices created" />
                {data &&
                  <div style={{ marginTop: 20 }}>
                    <Paper className={classes.paper}>
                      <form method='POST' 
                        onSubmit={this.onSubmit}
                      >
                        <TextField
                          id="name"
                          name="name"
                          label="Name"
                          value={this.state.name}
                          className={classes.textField}
                          onChange={this.handleChange}
                          margin="normal"
                          variant="outlined"
                          autoFocus
                        />
                        <div className={classes.alignRight}>
                          <Button type='submit' color='primary' variant="contained">
                            Update
                          </Button>
                        </div>
                      </form>
                    </Paper>
                  </div>
                }
              </Grid>
              {!data && !data.length &&
                <Grid item xs={8}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <Typography color='secondary' gutterBottom>
                          Welcome to Ahorta
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          This is an example of a full-width box
                        </Typography>
                      </div>
                      <div className={classes.alignRight}>
                        <Button color='primary' variant="contained" className={classes.actionButtom}>
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              }
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
          closeNotification={this.props.closeNotification } />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(DeviceEdit));

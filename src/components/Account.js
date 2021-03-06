import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';
import TextField from '@material-ui/core/TextField';
import CustomizedSnackbars from './common/CustomizedSnackbars';

import SectionHeader from './typo/SectionHeader'
import ProfileMenu from './profile/ProfileMenu'
import Topbar from './Topbar';

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

class Account extends Component {

  state = {
    id: 0,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
  };

  async componentDidMount() {
    const user = await this.props.logged()
    this.setState({
      id: user.data.user.id,
      email: user.data.user.email,
      name: user.data.user.name,
      password: user.data.user.password,
      confirmPassword: user.data.user.confirmPassword,
      website: user.data.user.website
    })
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
    this.props.updateUser(this.state.id, {
      name: this.state.name,
      website: this.state.website
    }).then(response => {
      if(response.data[0]) {
        this.props.openNotification('Your account information was updated successfully', 'success')
      } else {
        this.props.openNotification('There was an error to update your information, please try again later', 'error')  
      }
    }).catch(e => {
      this.props.openNotification('There was an error to update your information, please try again later', 'error')
    })
  }

  render() {
    const { classes, history, logged, loggedUser, logout } = this.props;
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
                        <TextField
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          value={this.state.email}
                          className={classes.textField}
                          disabled
                          onChange={this.handleChange}
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                          className={classes.textField}
                          onChange={(event) => this.handleChange(event)}
                          margin="normal"
                          variant="outlined"
                          disabled
                        />
                        <TextField
                          id="confirm-password"
                          name="confirmPassword"
                          label="Confirm password"
                          type="password"
                          className={classes.textField}
                          onChange={(event) => this.handleChange(event)}
                          margin="normal"
                          variant="outlined"
                          disabled
                        />
                        <TextField
                          id="name"
                          name="name"
                          label="Your name"
                          className={classes.textField}
                          value={this.state.name}
                          onChange={(event) => this.handleChange(event)}
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          id="website"
                          name="website"
                          label="Website"
                          className={classes.textField}
                          value={this.state.website}
                          onChange={(event) => this.handleChange(event)}
                          margin="normal"
                          variant="outlined"
                        />
                        <div className={classes.alignRight}>
                          <Button type='submit' color='primary' variant="contained">
                            Update
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

export default withRouter(withStyles(styles)(Account));

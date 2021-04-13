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
import MailchimpSubscribe from "react-mailchimp-subscribe"

import CustomizedSnackbars from './common/CustomizedSnackbars';
import SectionHeader from './typo/SectionHeader';
import ProfileMenu from './profile/ProfileMenu'
import Topbar from './Topbar';
import DeviceItem from './cards/DeviceItem';
import { host } from '../url'

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
    width: 200
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

const url = '//truppie.us17.list-manage.com/subscribe/post?u=bb76ecd5ef5cbbc5e60701321&amp;id=7582e094e3'

// a basic form
const CustomForm = ({ status, message, onValidated, data }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <div
      style={{
        borderRadius: 2,
        padding: 10,
        display: "inline-block"
      }}
    >
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        style={{ fontSize: "2em", padding: 5 }}
        ref={node => (name = node)}
        type="hidden"
        value={data.name}
      />
      <br />
      <input
        style={{ fontSize: "2em", padding: 5 }}
        ref={node => (email = node)}
        type="hidden"
        value={data.email}
      />
      <Button color='primary' variant="contained" onClick={submit}>
          Join the waiting list
      </Button>
    </div>
  );
};

class Profile extends Component {

  state = {
    learnMoredialog: false,
    getStartedDialog: false,
    data: [],
    user: {}
  };

  async componentDidMount() {
    const logged = await this.props.logged()
    const user = await this.props.fetchUser(logged.data.user.id)
    const devices = await axios.get(`${host}/devices`,
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    this.setState({data: devices.data})
    const myDevices = devices.data.filter( d => d.UserId === user.data.id)
    this.setState({data: myDevices, user: user.data})
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

  logout = async () => {
    await this.props.logout()
    this.props.openNotification('You were signed to your account successfully', 'success')
  }

  onAction = (id) => {
    this.props.history.push(`/dashboard/${id}`)
  }

  onEdit = (id) => {
    this.props.history.push(`/dashboard/edit/${id}`)
  }

  render() {
    const { classes, history, logged, loggedUser  } = this.props;
    const { data, user } = this.state
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={loggedUser && loggedUser.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={4} alignItems="center" justify="flex-start" container className={classes.grid}>
              <Grid item xs={3}>
                <ProfileMenu history={history} onLogout={this.logout} logged={logged} user={loggedUser && loggedUser.data.user} />
              </Grid>
              { data && data.length ? ( 
              <Grid item xs={9}>
                <SectionHeader title="Devices" subtitle="Your Ahorta devices connected" />
                {data.map(r =>  {
                    return r.deviceId && 
                      <div style={{marginTop: 20}}>
                        <DeviceItem 
                          user={r.User} 
                          at={r.Readings[0] && r.Readings[0].createdAt}
                          lastReading={r.Readings[0] && r.Readings[0].value}
                          minValue={r.minValue}
                          maxValue={r.maxValue}
                          threshold={r.threshold} ssid={r.ssid}
                          deviceId={r.deviceId} name={r.name}
                          onAction={() => this.onAction(r.id)} 
                          onEdit={() => this.onEdit(r.id)} 
                        />
                      </div>
                  })}
              </Grid>
              ) : (
              <Grid item xs={9}>
                <form method='post'>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <Typography color='secondary' gutterBottom>
                          You don't have any registered device yet  
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          You don't have any device registered yet. We are building devices to test and you can join our waiting list to have one device send to you or build your own
                        </Typography>
                      </div>
                      <div className={classes.alignRight}>
                      <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                          <CustomForm
                            status={status}
                            message={message}
                            onValidated={formData => subscribe(formData)}
                            data={{email: user.email, name: user.name}}
                          />
                        )}
                      />
                      </div>
                    </div>
                  </Paper>
                </form>
              </Grid>
              )}
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

export default withRouter(withStyles(styles)(Profile));

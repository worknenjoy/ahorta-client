import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Back from './common/Back';
import CustomizedSnackbars from './common/CustomizedSnackbars'
import Auth from '../modules/Auth'


const backgroundShape = require('../images/shape.svg');

const logo = require('../images/ahorta-logo.png');
const publicImage = require('../images/public-image1.jpg')

const numeral = require('numeral');
numeral.defaultFormat('0');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  rootGrid: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
})

class Signin extends Component {

  state = {
    email: '',
    password: '',
    receivingAccount: '',
    termsChecked: false,
    loading: false,
    labelWidth: 0
  }

  async componentDidMount() {
    await this.props.logged()
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    if (this.state.activeStep === 2) {
      setTimeout(() => this.props.history.push('/dashboard'), 5000)
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  signUser = (event) => {
    event.preventDefault()
    return this.props.login({
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      if (result.error) return this.props.openNotification(result.error.message, 'error')
      this.props.openNotification('You logged successfully', 'success')
      const token = result.data.token
      if(token) {
        Auth.authenticateUser(result.data.token)
        this.props.history.push(`/`)
      } else {
        return this.props.openNotification('We couldnt log you in, please try again later', 'error')
      }
    }).catch(e => {
      console.log('error', e)
      return this.props.openNotification(e.message, 'error')
    })
  }

  render() {

    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Back />
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.logo}>
                  <img width={100} src={logo} alt="" />
                </div>
                <form method='POST'
                  onSubmit={(event) => this.signUser(event)}
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <div className={classes.stepContainer}>
                    {!loading && (
                      <div className={classes.smallContainer}>
                        <Paper className={classes.paper}>
                          <Grid spacing={24} alignItems="flex-start" justify="center" container className={classes.grid}>
                            <Grid xs={6}>
                              <img src={publicImage} width={500} alt="" />
                            </Grid>
                            <Grid xs={6}>
                              <div class={classes.rootGrid}>
                                <div style={{ marginBottom: 32 }}>
                                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }} gutterBottom>
                                    Login into your account
                                </Typography>
                                  <Typography variant="body1" gutterBottom>
                                    Please login with your credentials
                                </Typography>
                                </div>
                                <div>
                                  <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    className={classes.textField}

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
                                  />
                                </div>
                              </div>
                              <div className={classes.buttonBar}>
                            <Button
                              onClick={this.handleBack}
                              className={classes.backButton}
                              size='large'
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size='large'
                              type='submit'
                              style={this.state.email && this.state.password ? { background: classes.button, color: 'white' } : {}}
                              disabled={!this.state.email && !this.state.password}
                            >
                            Sign in
                            </Button>
                          </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      </div>
                    )}
                    {loading && (
                      <div className={classes.bigContainer}>
                        <Paper className={classes.paper}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: 380, textAlign: 'center' }}>
                              <div style={{ marginBottom: 32 }}>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }} gutterBottom>
                                  Collecting your data
                              </Typography>
                                <Typography variant="body1" gutterBottom>
                                  We are processing your request
                              </Typography>
                              </div>
                              <div>
                                <Fade
                                  in={loading}
                                  style={{
                                    transitionDelay: loading ? '800ms' : '0ms',
                                  }}
                                  unmountOnExit
                                >
                                  <CircularProgress style={{ marginBottom: 32, width: 100, height: 100 }} />
                                </Fade>
                              </div>
                            </div>
                          </div>
                        </Paper>
                      </div>
                    )}
                  </div>
                </form>
              </Grid>
            </Grid>
          </Grid>
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
export default withRouter(withStyles(styles)(Signin))

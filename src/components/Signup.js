import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Back from './common/Back';
import CustomizedSnackbars from './common/CustomizedSnackbars'


const backgroundShape = require('../images/shape.svg');

const logo = require('../images/ahorta-logo.png');

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
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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



class Signup extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    userType: 'default',
    termsChecked: false,
    loading: false,
    labelWidth: 0,
    errorMessage: false
  }

  componentDidMount() {
    //await this.props.logged()
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  registerUser = (event) => {
    event.preventDefault()
    if(this.state.password !== this.state.confirmPassword) return this.props.openNotification('Password and Password confirm is not matching', 'error')
    this.setState({loading: true})
    return this.props.register({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      website: this.state.website
    }).then(result => {
      this.setState({loading: false})
      if(result.error) return this.props.openNotification(result.error.message, 'error')
      this.props.openNotification('You were successfully registered, now you can signin with your credentials', 'success')
      this.props.history.push(`/signin`)
      console.log('register result', result)
    }).catch(e => {
      console.log('error', e)
      this.setState({loading: false})
      return this.props.openNotification(e.message, 'error')
    })

  }

  render() {

    const { classes, history } = this.props;
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
                  onSubmit={(event) => this.registerUser(event)} 
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                  >
                  <div className={classes.stepContainer}>
                    { !loading && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <div>
                          <div style={{marginBottom: 32}}>
                            <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                              Create a new account
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Please provide your information to create a new account for Ahortas
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
                              <TextField
                                id="confirm-password"
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                className={classes.textField}
                                
                                onChange={(event) => this.handleChange(event)}
                                margin="normal"
                                variant="outlined"
                              />
                              <TextField
                                id="name"
                                name="name"
                                label="Your name"
                                className={classes.textField}
                                
                                onChange={(event) => this.handleChange(event)}
                                margin="normal"
                                variant="outlined"
                              />
                              <TextField
                                id="website"
                                name="website"
                                label="Website"
                                className={classes.textField}
                                onChange={(event) => this.handleChange(event)}
                                margin="normal"
                                variant="outlined"
                              />
                              <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                  value={this.state.userType}
                                  onChange={(event) => this.handleChange(event)}
                                  input={
                                    <OutlinedInput
                                      labelWidth={this.state.labelWidth}
                                      name="userType"
                                    />
                                  }
                                >
                                  <MenuItem value={'default'}>
                                    <em>What kind of user are you?</em>
                                  </MenuItem>
                                  <MenuItem value={'first'}>A maker nerd geek programmer - I want to prototype new devices</MenuItem>
                                  <MenuItem value={'second'}>A curious consumer biologist - I want a easy way to track my plant</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </Paper>
                      </div>
                    )}
                    { loading && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          <div style={{width: 380, textAlign: 'center'}}>
                            <div style={{marginBottom: 32}}>
                              <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>
                                Your request is being processed
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Please wait while we're sending your information
                              </Typography>
                            </div>
                            <div>
                              <Fade
                                in={loading}
                                style={{
                                  transitionDelay: loading ? '1200ms' : '0ms',
                                }}
                                timeout={800}
                                unmountOnExit
                              >
                                <CircularProgress style={{marginBottom: 32, width: 100, height: 100}} />
                              </Fade>
                            </div>
                          </div>
                        </div>
                      </Paper>
                      </div>
                    )}
                    
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
                        style={this.state.userType.length ? {background: classes.button, color: 'white'} : {}}
                        disabled={this.state.loading}
                      >
                        Signup
                      </Button>
                    </div>
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
          closeNotification={this.props.closeNotification } />
      </React.Fragment>
    )
  }
}
export default withRouter(withStyles(styles)(Signup))

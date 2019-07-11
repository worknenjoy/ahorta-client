import React,  { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import Loading from './common/Loading';

import Topbar from './Topbar';
import SensorChart from './SensorChart'

const numeral = require('numeral');
numeral.defaultFormat('0');

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
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});

const monthRange = Months;

class Dashboard extends Component {

  state = {
    device: {},
    loading: false,
    amount: 1,
    period: 12,
    start: 10,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    data: []
  };

  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1))
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period)

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      }
    })

    this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data})
  }

  componentDidMount() {
    const dashboardId = this.props.match.params.id
    axios.get(`https://ahorta.herokuapp.com/devices/${dashboardId}`,
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log('response', response);
      this.setState({device: response.data})
      this.setState({amount: response.data.timer / 3600000})
    })
    .catch(error => {
      console.log(error);
    });
    this.updateValues();
  }

  handleChangeAmount = (event, value) => {
    this.setState({amount: value, loading: false});
    const dashboardId = this.props.match.params.id
    axios.put(`https://ahorta.herokuapp.com/devices/${dashboardId}`,
      {
        timer: value * 3600000
      },
      { 
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log('updated', response)
    })
    .catch(error => {
      console.log(error);
    });
    this.updateValues();
  }

  handleChangePeriod = (event, value) => {
    this.setState({period: value, loading: false});
    this.updateValues();
  }

  handleChangeStart = (event, value) => {
    this.setState({start: value, loading: false});
    this.updateValues();
  }

  render() {
    const { classes } = this.props;
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading, device } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="flex-start" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <small>name:</small>
                    <Typography variant="h4" gutterBottom>
                      { device && device.name } <Chip style={{marginLeft: 10}} variant='outlined' color='primary' label="Public" />
                    </Typography>
                    <Typography variant="body1">
                      Created { device && moment(device.createdAt).fromNow() }
                    </Typography>
                    <Typography variant="body1">
                      Device ID: <strong>{ device && device.deviceId }</strong>
                    </Typography>
                  </div>
                  <div>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      How it works?
                    </Button>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      Be notified
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={8} >
                <Paper className={classes.paper} style={{position: 'relative'}}>
                  <Loading loading={loading} />
                  <div className={loading ? classes.loadingState : ''}>
                    <Typography variant="subtitle1" gutterBottom>
                      Humidity along the time
                    </Typography>
                    <Typography variant="body1">
                      This is the measures we did
                    </Typography>
                    <div style={{marginTop: 14, marginBottom: 14}}>
                      <div className={classes.inlining}>
                        <Avatar className={classes.loanAvatar}></Avatar>
                        <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                          Type
                        </Typography>
                        <Typography className={classes.inlining} color='secondary' variant="h6" gutterBottom>
                          {numeral(monthlyPayment).format()} units
                        </Typography>
                      </div>
                      <div className={classes.inlining}>
                        <Avatar className={classes.interestAvatar}></Avatar>
                        <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                          Othe type
                        </Typography>
                        <Typography className={classes.inlining} color="secondary" variant="h6" gutterBottom>
                          {numeral(monthlyInterest).format()} units
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <SimpleLineChart data={data} />
                    </div>
                  </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{position: 'relative'}}>
                  <Loading loading={loading} />
                  <Typography variant="subtitle1" gutterBottom>
                    Humidity
                  </Typography>
                  <Typography variant="body1">
                    This is the humidity from the sensor
                  </Typography>
                  <div>
                    <SensorChart value={0} data={[
                      { name: 'Humidity', value: 20 },
                      { name: 'Group B', value: 80}
                    ]} />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      How often you like to be notified
                    </Typography>
                    <Typography variant="body1">
                      Use sliders to set the period for be notified.
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        from {numeral(amount).format()} to {numeral(amount).format()} hours
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={amount}
                        min={1}
                        max={24}
                        step={1}
                        onChange={this.handleChangeAmount}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          1 hour
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          24 hours
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Visualization period
                    </Typography>
                    <Typography variant="body1">
                      Show in the graph the last period in hours
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {period} hours
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={period}
                        min={1}
                        max={24}
                        step={1}
                        onChange={this.handleChangePeriod}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          1 hour
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          24 hours
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Threshold
                    </Typography>
                    <Typography variant="body1">
                      What's the target humidity for this plant?
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {start} %
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={start}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.handleChangeStart}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          0 %
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          100 %
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));

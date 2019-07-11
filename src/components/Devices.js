import React,  { Component } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DeviceItem from './cards/DeviceItem';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';
const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  }
})

class Devices extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    axios.get(`https://ahorta.herokuapp.com/devices`,
      {
        headers: {
          'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log('response', response);
      this.setState({data: response.data})
    })
    .catch(error => {
      console.log(error);
    });
  }

  onAction = (id) => {
    this.props.history.push(`/dashboard/${id}`)
  }

  render() {
    const { classes } = this.props
    const { data } = this.state
    const currentPath = this.props.location.pathname
    const percent =  (value) => Math.round(100 - ( value / 1024 * 100));

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>            
              <Grid item xs={12}>
                <SectionHeader title="Devices" subtitle="Ahorta devices created" />
                {data.map(r =>  {
                    return r.deviceId && 
                      <div style={{marginTop: 20}}>
                        <DeviceItem at={r.readings && r.readings[0].createdAt} lastReading={percent(r.Readings && r.Readings[0].value) || 0} threshold={r.threshold} ssid={r.ssid} deviceId={r.deviceId} name={r.name} onAction={() => this.onAction(r.id)} />
                      </div>
                    
                  })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Devices);
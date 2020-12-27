import React,  { Component } from 'react';
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DeviceItem from './cards/DeviceItem';
import SectionHeader from './typo/SectionHeader';
import Topbar from './Topbar';

import './mailchimp.css'
import { host } from '../url'

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
    paddingBottom: 600
  },
  grid: {
    width: 1000
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
})

class Devices extends Component {

  state = {
    data: []
  }

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
    console.log('device data', devices.data)
  }

  onAction = (id) => {
    this.props.history.push(`/dashboard/${id}`)
  }

  render() {
    const { classes, loggedUser } = this.props
    const { data } = this.state
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={loggedUser && loggedUser.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>            
              <Grid item xs={12}>
                <SectionHeader title="Devices" subtitle="Ahorta devices created" />
                {data.map(r =>  {
                    return r.deviceId && 
                      <div style={{marginTop: 20}}>
                        <DeviceItem user={r.User} at={r.Readings[0] && r.Readings[0].createdAt} lastReading={r.Readings[0] && r.Readings[0].value} threshold={r.threshold} ssid={r.ssid} deviceId={r.deviceId} name={r.name} onAction={() => this.onAction(r.id)} />
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
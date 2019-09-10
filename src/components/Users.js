import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';
import UserItem from './cards/UserItem'

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

class Users extends Component {

  async componentDidMount() {
    /*axios.get(`https://ahorta.herokuapp.com/devices`,
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
    });*/
    await this.props.listUsers()
    console.log(this.props)
    //const newUser = await this.props.createUser({email: 'alz@worknenjoy.com', password: 'demo'})
    //const user = await this.props.fetchUser(7)
    //const updateUser = await this.props.updateUser(7, {name: 'Alexandre Magno'})
  }

  onAction = (id) => {
    this.props.history.push(`/dashboard/${id}`)
  }

  render() {
    const { classes, login } = this.props
    const { users } = this.props
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} user={login && login.data.user} history={this.props.history} />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>            
              <Grid item xs={12}>
                <SectionHeader title="Users" subtitle="This is our Ahorta makers" />
                {users && users.data.length && users.data.map(u =>  {
                    return u.email && 
                      <div style={{marginTop: 20}}>
                        <UserItem user={u} />
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

export default withStyles(styles)(Users);
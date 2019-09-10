import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link as MaterialLink } from '@material-ui/core'
import Menu from './Menu';

const logo = require('../images/ahorta-logo.png');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      paddingRigth: 120,
      paddingLeft: 120
    }

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  }
})

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Topbar extends Component {

  state = {
    value: null,
    menuDrawer: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toProfile = () => {
    this.props.history.push({ pathname: '/profile' })
  }

  current = () => {
    if(this.props.currentPath === '/') {
      return 0
    } 
    if(this.props.currentPath === '/devices') {
      return 1
    } 
    if(this.props.currentPath === '/users') {
      return 2
    } 
    if(this.props.currentPath === '/signup') {
      return 3
    } 
    if(this.props.currentPath === '/signin') {
      return 4
    } 
  }

  render() {

    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            <Grid container spacing={2} alignItems="baseline">
              <Grid item xs={12} className={classes.flex}>
                  <div className={classes.inline}>
                    <Typography variant="h6" color="inherit" noWrap>
                      <Link to='/' className={classes.link}>
                        <img width={80} src={logo} alt="" className={classes.tagline} />
                      </Link>
                    </Typography>
                  </div>
                  { !this.props.noTabs && (
                    <React.Fragment>
                      <div className={classes.productLogo}>
                        <Typography>
                          Taking care of your plant
                        </Typography>
                      </div>
                      <div className={classes.iconContainer}>
                        <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                          <MenuIcon />
                        </IconButton>
                      </div>
                      <div className={classes.tabContainer}>
                        <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                          <AppBar title="Menu" />
                          <List>
                            {Menu.map((item, index) => (
                              <ListItem component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: this.props.location.search}} button key={item.label}>
                                <ListItemText primary={item.label} />
                              </ListItem>
                            ))}
                            <Divider />
                          </List>
                        </SwipeableDrawer>
                        <Tabs
                          value={this.current() || this.state.value}
                          indicatorColor="primary"
                          textColor="primary"
                          onChange={this.handleChange}
                        >
                          {Menu.map((item, index) => (
                            <Tab key={index} component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: this.props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
                          ))}
                        </Tabs>
                      </div>
                    </React.Fragment>
                  )}
              </Grid>
            </Grid>
            { this.props.user && 
            <div style={{width: '45%'}}>
              <List style={{width: '40%'}}>
                <ListItemLink onClick={this.toProfile}>
                  <ListItemAvatar>
                  <Avatar>
                      <AccountBoxIcon />
                  </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.user.name} secondary={this.props.user.email} />
                </ListItemLink>
              </List>
            </div>
            }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))

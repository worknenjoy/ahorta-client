import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import WifiIcon from '@material-ui/icons/Wifi';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DeviceHubIcon from '@material-ui/icons/Devices';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ProfileMenu(props) {
  const classes = useStyles();

  const toConnectDevice = (event) => {
    event.preventDefault()
    props.history.push('/connect')
  }
  
  const toDevice = (event) => {
    event.preventDefault()
    props.history.push('/profile')
  }

  const toAccount = (event) => {
    event.preventDefault()
    props.history.push('/account')
  }

  const logout = async () => {
    await props.onLogout()
    props.logged && await props.logged()
    props.history.push({ pathname: '/' })
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <AccountBoxIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user && props.user.name} secondary={props.user && props.user.email} />
        </ListItem>
        <Divider />
        <ListItemLink onClick={toConnectDevice} button selected={props.history.location.pathname === '/connect'}>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Connect device" />
        </ListItemLink>
        <ListItemLink onClick={toDevice} button selected={props.history.location.pathname === '/profile'}>
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
        </ListItemLink>
        <ListItemLink onClick={toAccount} button selected={props.history.location.pathname === '/account'}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemLink>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
            <ListItemLink onClick={() => logout()}>
            <ListItemText primary="Logout" />
            </ListItemLink>
        </List>
      </List>
    </div>
  );
}
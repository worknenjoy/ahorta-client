import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './components/session/private-route'
import Session from './components/session/session'
import Dashboard from './containers/dashboard'
import Main from './containers/main'
import Devices from './containers/devices'
import Users from './containers/users'
import Signup from './containers/signup'
import Signin from './containers/signin'
import Wizard from './components/Wizard'
import Profile from './containers/profile'
import DeviceEdit from './containers/device-edit'
import Account from './containers/account'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute path='/profile' component={ Profile } />
          <PrivateRoute path='/account' component={ Account } />
          <Route exact path='/token/:token' component={ Session } />
          <Route exact path='/devices' component={ Devices } />
          <Route exact path='/users' component={ Users } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/signin' component={ Signin } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/dashboard/:id' component={ Dashboard } />
          <PrivateRoute path='/dashboard/edit/:id' component={ DeviceEdit } />
          <Route exact path='/' component={ Main } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )

  /* 
  
  <Route exact path='/' component={ Main } />
  <Route exact path='/signup' component={ Signup } />
  <Route exact path='/wizard' component={ Wizard } />
  <Route exact path='/cards' component={ Cards } />

  */
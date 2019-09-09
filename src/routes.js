import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Main from './components/Main'
import Devices from './containers/devices'
import Users from './containers/users'
import Signup from './containers/signup'
import Signin from './containers/signin'
import Wizard from './components/Wizard'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/devices' component={ Devices } />
          <Route exact path='/users' component={ Users } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/signin' component={ Signin } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/dashboard/:id' component={ Dashboard } />
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
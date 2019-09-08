import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { lightGreen, green } from '@material-ui/core/colors'
import reducers from './reducers'
import { userActions } from './actions/user'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[700]
    },
    secondary: {
      main: lightGreen[900]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
)

export const store = createStore(
  reducers,
  enhancer
)

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Routes />
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

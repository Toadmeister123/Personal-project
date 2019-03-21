import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './ducks/store'
import {HashRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
// import {  green, red } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

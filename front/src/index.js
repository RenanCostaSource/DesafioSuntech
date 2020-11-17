import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import store from './store';
import Home from './components/Home';

let theme = createMuiTheme({
  palette: {
    primary: { main: '#00598E' },
    secondary: { main: '#74C04E' }
  }
});
theme = responsiveFontSizes(theme);


ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <Home />
      </ MuiThemeProvider>
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);


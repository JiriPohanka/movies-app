import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme'

render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

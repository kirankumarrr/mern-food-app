import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './store';
import { HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Button } from '@material-ui/core';
// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <HashRouter>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button
              onClick={onClickDismiss(key)}
              startIcon={<HighlightOffIcon />}
            ></Button>
          )}
        >
          <App />
        </SnackbarProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

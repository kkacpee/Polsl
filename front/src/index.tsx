import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import Store, { persistor } from './Store';
import {BrowserRouter} from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core';
import Theme from './Styles/ThemeProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingScreen from './Screens/LoadingScreen';
import history from './Helpers/HistoryHelper';
import { Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={Store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeProvider theme={Theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


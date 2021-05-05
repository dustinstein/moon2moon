import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
// import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import reportWebVitals from './reportWebVitals';

//import { ConfirmProvider } from 'components/confirm';
//import App from './App.js';
import Market from './components/Market';
import rootReducer from './reducers';
import './index.css';

//import { verifyAuth } from './actions';
const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            light: '#6fbf73',
            main: '#1F1',
            dark: '#357a38',
            contrastText: '#fff'
          },
          background: {
            paper: prefersDarkMode ? '#000' : '#fff'
          }
        },
        overrides: {
          MuiListItemText: {
            primary: {
              color: '#1F1'
            }
          },
          MuiButton: {
            text: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: 0,
            }
          }
        }
      }),
    [prefersDarkMode],
  );

  function configureStore(initialState) {
      const store = createStore(
          rootReducer,
          initialState,
          compose (
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
          )
      );

      //store.dispatch(verifyAuth())

      return store;
  }

  const store = configureStore();

  return (
    <Provider store={store}>
          <SnackbarProvider maxSnack={4}>
              {/*<ConfirmProvider>*/}
                  <ThemeProvider  theme={theme}>
                      <Market />
                  </ThemeProvider>
              {/*</ConfirmProvider>*/}
          </SnackbarProvider>
      </Provider>
    )
}
ReactDOM.render(
    <App />
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

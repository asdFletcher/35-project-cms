import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/auth/login.js';
import LoginContext from './components/auth/context.js';

import util from 'util';

import styles from "./base.scss";

import CMS from './components/cms/cms.js';

import createStore from './store/';
const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoginContext>
          <Login />
          <CMS />
        </LoginContext>
      </BrowserRouter>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

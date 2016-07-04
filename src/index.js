import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

// test data
const initialState = require('../test/fixture.js');

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        {/*
        <IndexRoute component={Stream} />
        <Route path="stream" component={Stream} />
        <Route path="collections" component={Collections} />
        <Route path="channels" component={Channels} />
        */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
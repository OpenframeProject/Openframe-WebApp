import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import history from "./services/history";
import configureStore from './stores';

import App from './containers/App';

import PubSub from './services/pubsub';

import favicon from './images/favicon.ico'
import image from './images/touch-icon-iphone.png'
import imageA from './images/touch-icon-ipad.png'
import imageB from './images/touch-icon-iphone-retina.png'
import imageC from './images/touch-icon-ipad-retina.png'

const fixBody = require('./actions/ui/fixBody.js');
const unfixBody = require('./actions/ui/unfixBody.js');

// test data
const initialState = require('../test/fixture.js');

const store = configureStore(initialState);

// this should be a middleware, but for now PubSub gets initialized with the store
// so that we can call dispatch() direcly from the pubsub service.
PubSub.init(store);

// TODO: These don't really belong here, but we do want these actions dispatched
// when the artwork is presented in a modal. Should figure out a better place to handle
// this.
function doFixBody() {
  console.log('doFixBody', arguments);
  store.dispatch(fixBody());
}

function doUnfixBody() {
  console.log('doUnfixBody', arguments);
  store.dispatch(unfixBody());
}

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
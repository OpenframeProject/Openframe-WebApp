import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll';
import configureStore from './stores';
import App from './containers/App';
import BrowseSectionComponent from './components/sections/BrowseSectionComponent';
import StreamContainer from './containers/StreamContainer';
import CollectionsContainer from './containers/CollectionsContainer';
import ChannelsContainer from './containers/ChannelsContainer';
import ProfileContainer from './containers/ProfileContainer';
import LikesContainer from './containers/LikesContainer';
import AddedContainer from './containers/AddedContainer';
import FeatureFlagsContainer from './containers/FeatureFlagsContainer';

import ArtworkDetailContainer from './containers/ArtworkDetailContainer';
import CollectionDetailContainer from './containers/CollectionDetailContainer';

const fixBody = require('./actions/ui/fixBody.js');
const unfixBody = require('./actions/ui/unfixBody.js');

import PubSub from './services/pubsub';

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
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRedirect to="/stream" />

        <Route path="/ff-conf" component={FeatureFlagsContainer} />

        <Route component={BrowseSectionComponent}>
          <IndexRoute component={StreamContainer} />
          <Route path="/stream" component={StreamContainer} />
          <Route path="/collections" component={CollectionsContainer} />
          <Route path="/channels" component={ChannelsContainer} />

          <Route path="artwork/:artworkId" component={ArtworkDetailContainer} onEnter={doFixBody} onLeave={doUnfixBody} />
          <Route path="collections/:collectionId" component={CollectionDetailContainer} />
        </Route>

        // User routes
        <Route path="/:username" component={ProfileContainer}>
          <IndexRoute component={AddedContainer} />
          <Route path="/:username/likes" component={LikesContainer} />
          <Route path="/:username/added" component={AddedContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import BrowseSectionComponent from './components/sections/BrowseSectionComponent';
import YouSectionComponent from './components/sections/YouSectionComponent';
import StreamContainer from './containers/StreamContainer';
import CollectionsContainer from './containers/CollectionsContainer';
import ChannelsContainer from './containers/ChannelsContainer';
import ProfileContainer from './containers/ProfileContainer';
import LikesContainer from './containers/LikesContainer';
import AddedContainer from './containers/AddedContainer';


import ArtworkDetailContainer from './containers/ArtworkDetailContainer';
import CollectionDetailContainer from './containers/CollectionDetailContainer';

import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router'

// test data
const initialState = require('../test/fixture.js');

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/stream" />

        <Route component={BrowseSectionComponent}>
          <IndexRoute component={StreamContainer} />
          <Route path="/stream" component={StreamContainer} />
          <Route path="/collections" component={CollectionsContainer} />
          <Route path="/channels" component={ChannelsContainer} />

          <Route path="artwork/:artworkId" component={ArtworkDetailContainer} />
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
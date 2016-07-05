/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import TopbarComponent from '../components/topbar/TopbarComponent';
import SidebarComponent from '../components/sidebar/SidebarComponent';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSelectedFrame } from '../reducers/frames';

import { Link } from 'react-router'

require('normalize.css/normalize.css');
require('styles/App.css');

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  componentDidMount() {
    const {actions, user, auth} = this.props;
    if (!auth.accessToken) {
      // no access token present, initiate login
      actions.loginRequest(user.user);
    } else {
      // access token present, fetch user
      actions.fetchUserRequest();
      actions.fetchFramesRequest();  // actions.fetchCollectionRequest();
    }
  }
  render() {
    let {actions, frames, user, ui, selectedFrame} = this.props;
    let currentUser = user.current || '...';

    return (
      <div className="index">

        <TopbarComponent
          user={currentUser}
          selectedFrame={selectedFrame}
          openSidebar={actions.openSidebar} />

        <div className="container container-centered-artwork">
          <div className="row row-navigation hidden-xs">
            <ul className="tabs">
              <li><Link to="/stream">Stream</Link></li>
              <li><Link to="/channels">Channels</Link></li>
              <li><Link to="/collections">Collections</Link></li>
            </ul>
          </div>

          <div className="row row-collection row-tile">
            {/*
              next we replace `<Child>` with `this.props.children`
              the router will figure out the children for us
            */}
            {this.props.children}
          </div>
        </div>

        <nav className="navbar navbar-default navbar-fixed-bottom visible-xs">
          <div className="container">
            <ul className="tabs-bottom">
              <li className="stream-btn"><a href="/stream">Stream</a></li>
              <li className="collection-btn bottom-active"><a href="<%= user.username %> ">Collection</a></li>
            </ul>
          </div>
        </nav>

        <div className="sidebar-wrap">
          <SidebarComponent
            user={currentUser}
            frames={frames.items}
            selectedFrame={selectedFrame}
            isOpen={ui.sidebarOpen}
            closeSidebar={actions.closeSidebar}
            selectFrame={actions.selectFrame} />
        </div>

      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  artwork: PropTypes.object.isRequired,
  frames: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired,
  collections: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    artwork: state.artwork,
    frames: state.frames,
    selectedFrame: getSelectedFrame(state.frames.items, state.frames.selectedFrameId),
    user: state.user,
    auth: state.auth,
    ui: state.ui,
    channels: state.channels,
    collections: state.collections
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    addArtwork: require('../actions/artwork/addArtwork.js'),
    removeArtwork: require('../actions/artwork/removeArtwork.js'),
    editArtwork: require('../actions/artwork/editArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtwork.js'),
    previewArtwork: require('../actions/artwork/previewArtwork.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtwork.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    fetchArtworkRequest: require('../actions/artwork/fetchArtworkRequest.js'),
    fetchArtworkSuccess: require('../actions/artwork/fetchArtworkSuccess.js'),
    fetchArtworkFailure: require('../actions/artwork/fetchArtworkFailure.js'),
    fetchFramesRequest: require('../actions/frame/fetchFramesRequest.js'),
    fetchFramesSuccess: require('../actions/frame/fetchFramesSuccess.js'),
    fetchFramesFailure: require('../actions/frame/fetchFramesFailure.js'),
    loginRequest: require('../actions/auth/loginRequest.js'),
    loginSuccess: require('../actions/auth/loginSuccess.js'),
    loginFailure: require('../actions/auth/loginFailure.js'),
    logoutRequest: require('../actions/auth/logoutRequest.js'),
    logoutSuccess: require('../actions/auth/logoutSuccess.js'),
    logoutFailure: require('../actions/auth/logoutFailure.js'),
    selectFrame: require('../actions/frame/selectFrame.js'),
    fetchUserRequest: require('../actions/user/fetchUserRequest.js'),
    fetchUserSuccess: require('../actions/user/fetchUserSuccess.js'),
    fetchUserFailure: require('../actions/user/fetchUserFailure.js'),
    fetchConfigRequest: require('../actions/config/fetchConfigRequest.js'),
    fetchConfigSuccess: require('../actions/config/fetchConfigSuccess.js'),
    fetchConfigFailure: require('../actions/config/fetchConfigFailure.js'),
    openSidebar: require('../actions/ui/openSidebar.js'),
    closeSidebar: require('../actions/ui/closeSidebar.js'),
    fetchCollectionsRequest: require('../actions/collections/fetchCollectionsRequest.js'),
    fetchCollectionsSuccess: require('../actions/collections/fetchCollectionsSuccess.js'),
    fetchCollectionsFailure: require('../actions/collections/fetchCollectionsFailure.js'),
    fetchChannelsRequest: require('../actions/channels/fetchChannelsRequest.js'),
    fetchChannelsSuccess: require('../actions/channels/fetchChannelsSuccess.js'),
    fetchChannelsFailure: require('../actions/channels/fetchChannelsFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

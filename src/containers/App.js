/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { withRouter } from "react-router";
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import Modal from 'react-modal';
// import { Notifs } from 'redux-notifications';

require('normalize.css/normalize.css');
require('styles/bootstrap-overrides.scss');
require('styles/App.scss');

import SidebarContainer from './sidebar/SidebarContainer';
import ModalManagerContainer from './ModalManagerContainer';

import TopbarComponent from '../components/topbar/TopbarComponent';

import MobileSubMenuComponent from '../components/common/MobileSubMenuComponent';
import NoticeBannerComponent from '../components/common/NoticeBannerComponent';

import BrowseSectionComponent from '../components/sections/BrowseSectionComponent';
import ProfileContainer from './ProfileContainer';
import LoginContainer from './LoginContainer';
import FeatureFlagsContainer from './FeatureFlagsContainer';
import VerifiedEmailContainer from './VerifiedEmailContainer';
import ResetPasswordContainer from './ResetPasswordContainer';
import ArtworkDetailModal from '../components/artwork/ArtworkDetailModal';

import { getSelectedFrame } from '../reducers/frame';
import { getCurrentUser } from '../reducers/user/index';

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  componentDidMount() {
    const {actions, auth} = this.props;
    Modal.setAppElement('body');
    actions.fetchConfigRequest();
    if (auth.accessToken) {
      actions.fetchCurrentUserRequest();
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('componentWillReceiveProps', nextProps);
    // if we changed routes...
    if ((
      prevProps.location.key !== this.props.location.key &&
      this.props.location.state &&
      this.props.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }

    if (this.props.ui.fixBody) {
      document.body.style.maxWidth = document.body.clientWidth + 'px';
      document.body.style.height   = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.maxWidth = 'none';
      document.body.style.height   = '100%';
      document.body.style.overflow = 'auto';
    }
  }

  getChildContext() {
    return {
      location: this.props.location
    }
  }

  _handleWaypointEnter() {
    this.refs.topbar._hideShadow();
  }

  _handleWaypointLeave() {
    this.refs.topbar._showShadow();
  }


  render() {
    let {actions, frames, user, currentUser, ui, route, location, artwork, featureFlags} = this.props;

    let selectedFrameId = frames.selectedFrameId;
    let selectedFrame = getSelectedFrame(frames.byId, selectedFrameId, artwork.byId);

    // This piece of state is set when one of the
    // gallery links is clicked. The `background` state
    // is the location that we were at when one of
    // the gallery links was clicked. If it's there,
    // use it as the location for the <Switch> so
    // we show the gallery in the background, behind
    // the modal.
    let background = location.state && location.state.background;

    return (
      <div>
        <TopbarComponent
          ref="topbar"
          user={currentUser}
          isFetching={user.isFetching}
          isPushing={frames.isPushing}
          route={route}
          location={location}
          selectedFrame={selectedFrame}
          updateVisibleModal={actions.updateVisibleModal}
          updateSidebarState={actions.updateSidebarState} />

        { // Manages top bar shadow
        }
        <Waypoint
          onEnter={::this._handleWaypointEnter}
          onLeave={::this._handleWaypointLeave}
          scrollableAncestor={window}
        />

        {
          //<Notification notice={ ui.notice } updateNotification={actions.updateNotification}/>
        }
        {/* <Notifs /> */}

        {
          ui.notice && <NoticeBannerComponent notice={ ui.notice } updateNoticeBanner={ actions.updateNoticeBanner } />
        }

        <div className='app-content-wrap'>
          <Switch location={background || location}>
            <Route path="/login" component={LoginContainer} />
            <Route path="/ff-conf" component={FeatureFlagsContainer} />
            <Route path="/verified" component={VerifiedEmailContainer} />
            <Route path="/reset-password/:accessToken" component={ResetPasswordContainer} />

            <Route path="/stream" component={BrowseSectionComponent} />

            {/* <Route path="/artwork/:artworkId" render={({match}) => <ArtworkDetailContainer params={match.params} />} /> */}

            {/* // User routes */}
            <Route path="/:username" render={({ match }) => <ProfileContainer params={match.params} />} />

            <Redirect from="/" to="/stream" />
          </Switch>

          {background && <Route path="/artwork/:artworkId" render={
            ({match, location}) => <ArtworkDetailModal params={match.params} returnTo={location.state.returnTo} />
          } />}

        </div>

        <SidebarContainer location={location} />

        <MobileSubMenuComponent
          user={currentUser}
          location={location}
          featureFlags={featureFlags} />

        <ModalManagerContainer />
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
  collections: PropTypes.object.isRequired
};

App.childContextTypes = {
  location: PropTypes.object
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    artwork: state.artwork,
    frames: state.frames,
    user: state.user,
    currentUser: getCurrentUser(state.user),
    auth: state.auth,
    ui: state.ui,
    featureFlags: state.featureFlags,
    collections: state.collections
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    loginRequest: require('../actions/auth/loginRequest.js').default,
    loginSuccess: require('../actions/auth/loginSuccess.js').default,
    loginFailure: require('../actions/auth/loginFailure.js').default,
    logoutRequest: require('../actions/auth/logoutRequest.js').default,
    logoutSuccess: require('../actions/auth/logoutSuccess.js').default,
    logoutFailure: require('../actions/auth/logoutFailure.js').default,

    selectFrame: require('../actions/frame/selectFrame.js').default,

    fetchCurrentUserRequest: require('../actions/user/fetchCurrentUserRequest.js').default,
    fetchConfigRequest: require('../actions/config/fetchConfigRequest.js').default,

    updateVisibleModal: require('../actions/ui/updateVisibleModal.js').default,
    updateSidebarState: require('../actions/ui/updateSidebarState.js').default,
    updateNoticeBanner: require('../actions/ui/updateNoticeBanner.js').default,

    hideConfirmDialog: require('../actions/common/hideConfirmDialog.js').default,
    openStatefulModal: require('../actions/ui/openStatefulModal.js').default,
    closeStatefulModal: require('../actions/ui/closeStatefulModal.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

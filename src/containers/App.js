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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import SidebarContainer from './sidebar/SidebarContainer';
import ModalManagerContainer from './ModalManagerContainer';

import TopbarComponent from '../components/topbar/TopbarComponent';
import NoticeBannerComponent from '../components/common/NoticeBannerComponent';

import MobileSubMenuComponent from '../components/common/MobileSubMenuComponent';
import StatefulModalComponent from '../components/common/StatefulModalComponent';

import { getSelectedFrame } from '../reducers/frame';
import { getCurrentUser } from '../reducers/user/index';

require('normalize.css/normalize.css');
require('styles/bootstrap-overrides.scss');
require('styles/App.scss');

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  componentWillMount() {
    const {actions, auth} = this.props;
    actions.fetchConfigRequest();
    if (auth.accessToken) {
      actions.fetchCurrentUserRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps);
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }

    if (nextProps.ui.fixBody) {
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

    let isStatefulModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

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

        <NoticeBannerComponent notice={ ui.notice } updateNoticeBanner={actions.updateNoticeBanner}/>

        <div className='app-content-wrap'>
          {isStatefulModal ?
            this.previousChildren :
            this.props.children
          }

          {isStatefulModal && (
            <StatefulModalComponent
              initialOpenState={true}
              returnTo={location.state.returnTo}
              openStatefulModal={actions.openStatefulModal}
              closeStatefulModal={actions.closeStatefulModal}
              extraClasses="artwork-detail-modal"
              showHeader={false}>
              {this.props.children}
            </StatefulModalComponent>
          )}
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
    loginRequest: require('../actions/auth/loginRequest.js'),
    loginSuccess: require('../actions/auth/loginSuccess.js'),
    loginFailure: require('../actions/auth/loginFailure.js'),
    logoutRequest: require('../actions/auth/logoutRequest.js'),
    logoutSuccess: require('../actions/auth/logoutSuccess.js'),
    logoutFailure: require('../actions/auth/logoutFailure.js'),

    selectFrame: require('../actions/frame/selectFrame.js'),

    fetchCurrentUserRequest: require('../actions/user/fetchCurrentUserRequest.js'),
    fetchConfigRequest: require('../actions/config/fetchConfigRequest.js'),

    updateVisibleModal: require('../actions/ui/updateVisibleModal.js'),
    updateSidebarState: require('../actions/ui/updateSidebarState.js'),
    updateNoticeBanner: require('../actions/ui/updateNoticeBanner.js'),

    hideConfirmDialog: require('../actions/common/hideConfirmDialog.js'),
    openStatefulModal: require('../actions/ui/openStatefulModal.js'),
    closeStatefulModal: require('../actions/ui/closeStatefulModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

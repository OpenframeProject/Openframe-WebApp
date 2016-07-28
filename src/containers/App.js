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
import TopbarComponent from '../components/topbar/TopbarComponent';
import SidebarComponent from '../components/sidebar/SidebarComponent';
import LoginModalComponent from '../components/user/LoginModalComponent';
import MobileSubMenuComponent from '../components/common/MobileSubMenuComponent';
import CreateAccountModalComponent from '../components/user/CreateAccountModalComponent';

import { getSelectedFrame } from '../reducers/frames';
import { getCurrentUser } from '../reducers/users/index';

require('normalize.css/normalize.css');
require('styles/bootstrap-overrides.scss');
require('styles/App.scss');


/* Populated by react-webpack-redux:reducer */
class App extends Component {
  componentWillMount() {
    const {actions, auth} = this.props;
    if (auth.accessToken) {
      actions.fetchCurrentUserRequest();
    }
  }

  handleSubmitLogin(fields) {
    let { actions } = this.props;
    actions.loginRequest(fields);
  }

  handleSubmitCreateAccount(fields) {
    let { actions } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.createAccountFailure('Passwords do not match');
      return;
    }
    actions.createAccountRequest(fields);
  }

  render() {
    let {actions, frames, user, currentUser, ui, selectedFrame, route, location} = this.props;

    return (
      <div>
        <TopbarComponent
          user={currentUser}
          isFetching={user.isFetching}
          route={route}
          location={location}
          selectedFrame={selectedFrame}
          openSidebar={actions.openSidebar}
          openCreateAccountModal={actions.openCreateAccountModal}
          openLoginModal={actions.openLoginModal} />

        <div className='app-content-wrap'>
          {this.props.children}
        </div>

        <div className='sidebar-wrap'>
          <SidebarComponent
            user={currentUser}
            frames={frames.items}
            selectedFrame={selectedFrame}
            isOpen={ui.sidebarOpen}
            closeSidebar={actions.closeSidebar}
            selectFrame={actions.selectFrame}
            logoutRequest={actions.logoutRequest} />
        </div>

        <LoginModalComponent
          isOpen={ui.loginModalOpen}
          closeLoginModal={actions.closeLoginModal}
          onSubmit={::this.handleSubmitLogin} />

        <CreateAccountModalComponent
          isOpen={ui.createAccountModalOpen}
          closeCreateAccountModal={actions.closeCreateAccountModal}
          onSubmit={::this.handleSubmitCreateAccount}
          createError={ui.createError} />


        <MobileSubMenuComponent
          user={currentUser} />
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
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    artwork: state.artwork,
    frames: state.frames,
    selectedFrame: getSelectedFrame(state.frames.items, state.frames.selectedFrameId),
    user: state.user,
    currentUser: getCurrentUser(state.user),
    auth: state.auth,
    ui: state.ui,
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
    fetchCurrentUserRequest: require('../actions/user/fetchCurrentUserRequest.js'),
    fetchConfigRequest: require('../actions/config/fetchConfigRequest.js'),
    fetchConfigSuccess: require('../actions/config/fetchConfigSuccess.js'),
    fetchConfigFailure: require('../actions/config/fetchConfigFailure.js'),
    openSidebar: require('../actions/ui/openSidebar.js'),
    closeSidebar: require('../actions/ui/closeSidebar.js'),
    openLoginModal: require('../actions/ui/openLoginModal.js'),
    closeLoginModal: require('../actions/ui/closeLoginModal.js'),
    openCreateAccountModal: require('../actions/ui/openCreateAccountModal.js'),
    closeCreateAccountModal: require('../actions/ui/closeCreateAccountModal.js'),
    createAccountRequest: require('../actions/user/createAccountRequest.js'),
    createAccountFailure: require('../actions/user/createAccountFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

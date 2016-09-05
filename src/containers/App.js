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
import NoticeBannerComponent from '../components/common/NoticeBannerComponent';
import MobileSubMenuComponent from '../components/common/MobileSubMenuComponent';
import ConfirmDialogComponent from '../components/common/ConfirmDialogComponent';
import StatefulModalComponent from '../components/common/StatefulModalComponent';
import CreateAccountModalComponent from '../components/user/CreateAccountModalComponent';
import EditProfileModalComponent from '../components/user/EditProfileModalComponent';

import { getSelectedFrame, getFramesList } from '../reducers/frame';
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

  handleSubmitEditProfile(fields) {
    let { actions } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.updateUserFailure('Passwords do not match');
      return;
    }
    actions.updateUserRequest(fields);
  }

  render() {
    let {actions, frames, user, currentUser, ui, route, location, artwork} = this.props;

    let selectedFrameId = frames.selectedFrameId || frames.ids[0];
    let selectedFrame = getSelectedFrame(frames.byId, selectedFrameId, artwork.byId);

    let isStatefulModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div>
        <TopbarComponent
          user={currentUser}
          isFetching={user.isFetching}
          isPushing={frames.isPushing}
          route={route}
          location={location}
          selectedFrame={selectedFrame}
          openSidebar={actions.openSidebar}
          openCreateAccountModal={actions.openCreateAccountModal}
          openLoginModal={actions.openLoginModal} />

        { ui.notice
          ? <NoticeBannerComponent notice={ ui.notice } />
          : null
        }



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



        <div className='sidebar-wrap'>
          <SidebarComponent
            user={currentUser}
            frames={getFramesList(frames.ids, frames.byId)}
            selectedFrame={selectedFrame}
            isOpen={ui.sidebarOpen}
            closeSidebar={actions.closeSidebar}
            selectFrame={actions.selectFrame}
            openEditProfileModal={actions.openEditProfileModal}
            logoutRequest={actions.logoutRequest} />
        </div>

        <LoginModalComponent
          isOpen={ui.loginModalOpen}
          closeLoginModal={actions.closeLoginModal}
          openCreateAccountModal={actions.openCreateAccountModal}
          onSubmit={::this.handleSubmitLogin} />

        <CreateAccountModalComponent
          isOpen={ui.createAccountModalOpen}
          closeCreateAccountModal={actions.closeCreateAccountModal}
          openLoginModal={actions.openLoginModal}
          onSubmit={::this.handleSubmitCreateAccount}
          createError={ui.createError} />

        <EditProfileModalComponent
          isOpen={ui.editProfileModalOpen}
          closeEditProfileModal={actions.closeEditProfileModal}
          onSubmit={::this.handleSubmitEditProfile}
          updateUserError={ui.updateUserError} />

        <MobileSubMenuComponent
          user={currentUser}
          location={location} />

        <ConfirmDialogComponent
          isOpen={ui.confirmDialogOpen}
          body="Are you sure you want to do that?"
          title="Hmmm..."
          acceptText="Do it."
          cancelText="Stop!"
          acceptAction={{ type: 'TEST_ACTION' }}
          hideConfirmDialog={actions.hideConfirmDialog}
           />
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
    loginRequest: require('../actions/auth/loginRequest.js'),
    loginSuccess: require('../actions/auth/loginSuccess.js'),
    loginFailure: require('../actions/auth/loginFailure.js'),
    logoutRequest: require('../actions/auth/logoutRequest.js'),
    logoutSuccess: require('../actions/auth/logoutSuccess.js'),
    logoutFailure: require('../actions/auth/logoutFailure.js'),
    selectFrame: require('../actions/frame/selectFrame.js'),
    fetchCurrentUserRequest: require('../actions/user/fetchCurrentUserRequest.js'),
    fetchConfigRequest: require('../actions/config/fetchConfigRequest.js'),
    openSidebar: require('../actions/ui/openSidebar.js'),
    closeSidebar: require('../actions/ui/closeSidebar.js'),
    openLoginModal: require('../actions/ui/openLoginModal.js'),
    closeLoginModal: require('../actions/ui/closeLoginModal.js'),
    openCreateAccountModal: require('../actions/ui/openCreateAccountModal.js'),
    closeCreateAccountModal: require('../actions/ui/closeCreateAccountModal.js'),
    createAccountRequest: require('../actions/user/createAccountRequest.js'),
    createAccountFailure: require('../actions/user/createAccountFailure.js'),
    updateUserRequest: require('../actions/user/updateUserRequest'),
    updateUserFailure: require('../actions/user/updateUserFailure'),
    openEditProfileModal: require('../actions/ui/openEditProfileModal.js'),
    closeEditProfileModal: require('../actions/ui/closeEditProfileModal.js'),
    hideConfirmDialog: require('../actions/common/hideConfirmDialog.js'),
    openStatefulModal: require('../actions/ui/openStatefulModal.js'),
    closeStatefulModal: require('../actions/ui/closeStatefulModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

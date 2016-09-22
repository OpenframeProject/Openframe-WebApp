import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginModalComponent from '../components/user/LoginModalComponent';
import CreateAccountModalComponent from '../components/user/CreateAccountModalComponent';
import EditProfileModalComponent from '../components/user/EditProfileModalComponent';
import RequestPasswordResetModalComponent from '../components/user/RequestPasswordResetModalComponent';
import FrameSettingsModalComponent from '../components/frame/FrameSettingsModalComponent';
import CreateAccountNoticeComponent from '../components/common/CreateAccountNoticeComponent';
import AddArtworkModalComponent from '../components/artwork/AddArtworkModalComponent';

import ResetPasswordModalContainer from './ResetPasswordModalContainer';

class ModalManagerContainer extends Component {
  _handleSubmitLogin(fields) {
    let { actions } = this.props;
    actions.loginRequest(fields);
  }

  _handleSubmitCreateAccount(fields) {
    let { actions } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.createAccountFailure('Passwords do not match');
      return;
    }
    actions.createAccountRequest(fields);
  }

  _handleSubmitEditProfile(fields) {
    let { actions } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.updateUserFailure('Passwords do not match');
      return;
    }
    actions.updateUserRequest(fields);
  }

  _handleSubmitFrameSettings(fields) {
    let { actions, settingsFrameId } = this.props;
    if (!fields.name) {
      actions.updateFrameFailure('Frame name is required.');
      return;
    }
    actions.updateFrameRequest(settingsFrameId, fields);
    if (fields.managers) {
      actions.updateFrameManagersRequest(settingsFrameId, fields.managers.map(manager => manager.label))
    }
  }

  _handleRequestPasswordReset(fields) {
    let { actions } = this.props;
    if (!fields.email) {
      actions.passwordResetFailure('Please enter your email address.');
      return;
    }
    actions.passwordResetRequest(fields.email);
  }

  _handleSubmitAddArtwork(fields) {
    console.log('_handleSubmitAddArtwork', fields);
  }

  _renderFrameSettings() {
    const {actions, modalError} = this.props;
    return  <FrameSettingsModalComponent
          isOpen={true}
          updateVisibleModal={actions.updateVisibleModal}
          modalError={modalError}
          deleteFrameRequest={actions.deleteFrameRequest}
          removeFromFrameRequest={actions.removeFromFrameRequest}
          onSubmit={::this._handleSubmitFrameSettings} />;
  }

  _renderAddArtwork() {
    const {actions, modalError} = this.props;
    return  <AddArtworkModalComponent
          isOpen={true}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this._handleSubmitAddArtwork}
          modalError={modalError} />;
  }


  render() {
    const {actions, visibleModal, modalError} = this.props;
    return (
      <div className="modal-manager">
        <CreateAccountNoticeComponent
          isOpen={visibleModal === 'create-account-notice'}
          updateVisibleModal={actions.updateVisibleModal} />

        <LoginModalComponent
          isOpen={visibleModal === 'login'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this._handleSubmitLogin}
          modalError={modalError} />

        <CreateAccountModalComponent
          isOpen={visibleModal === 'create-account'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this._handleSubmitCreateAccount}
          modalError={modalError} />

        <EditProfileModalComponent
          isOpen={visibleModal === 'edit-profile'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this._handleSubmitEditProfile}
          modalError={modalError} />

        <AddArtworkModalComponent
          isOpen={visibleModal === 'add-artwork'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this._handleSubmitAddArtwork}
          modalError={modalError} />

        { visibleModal === 'frame-settings' && ::this._renderFrameSettings() }

        { visibleModal === 'add-artwork' && ::this._renderAddArtwork() }

        <RequestPasswordResetModalComponent
          isOpen={visibleModal === 'request-password-reset'}
          updateVisibleModal={actions.updateVisibleModal}
          modalError={modalError}
          onSubmit={::this._handleRequestPasswordReset} />

        <ResetPasswordModalContainer
          isOpen={visibleModal === 'reset-password'}
          updateVisibleModal={actions.updateVisibleModal} />
      </div>
    );
  }
}

ModalManagerContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    ui: state.ui,
    visibleModal: state.ui.visibleModal,
    modalError: state.ui.modalError,
    settingsFrameId: state.frames.settingsFrameId
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js'),
    deleteFrameRequest: require('../actions/frame/deleteFrameRequest.js'),
    removeFromFrameRequest: require('../actions/user/removeFromFrameRequest.js'),
    loginRequest: require('../actions/auth/loginRequest.js'),
    createAccountRequest: require('../actions/user/createAccountRequest.js'),
    createAccountFailure: require('../actions/user/createAccountFailure.js'),
    updateUserRequest: require('../actions/user/updateUserRequest'),
    updateUserFailure: require('../actions/user/updateUserFailure'),
    updateFrameRequest: require('../actions/frame/updateFrameRequest.js'),
    deleteFrameRequest: require('../actions/frame/deleteFrameRequest.js'),
    deleteFrameFailure: require('../actions/frame/deleteFrameFailure.js'),
    removeFromFrameRequest: require('../actions/user/removeFromFrameRequest.js'),
    removeFromFrameFailure: require('../actions/user/removeFromFrameFailure.js'),
    updateFrameManagersRequest: require('../actions/frame/updateFrameManagersRequest.js'),
    updateFrameFailure: require('../actions/frame/updateFrameFailure.js'),
    passwordResetRequest: require('../actions/auth/passwordResetRequest.js'),
    passwordResetFailure: require('../actions/auth/passwordResetFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalManagerContainer);

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginModalComponent from '../components/user/LoginModalComponent';
import CreateAccountModalComponent from '../components/user/CreateAccountModalComponent';
import EditProfileModalComponent from '../components/user/EditProfileModalComponent';
import FrameSettingsModalComponent from '../components/frame/FrameSettingsModalComponent';
import CreateAccountNoticeComponent from '../components/common/CreateAccountNoticeComponent';

class ModalManagerContainer extends Component {
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

  handleSubmitFrameSettings(fields) {
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

  render() {
    const {actions, visibleModal, modalError} = this.props;
    return (
      <div className="modal-manager">
        <LoginModalComponent
          isOpen={visibleModal === 'login'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this.handleSubmitLogin}
          modalError={modalError} />

        <CreateAccountModalComponent
          isOpen={visibleModal === 'create-account'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this.handleSubmitCreateAccount}
          modalError={modalError} />

        <EditProfileModalComponent
          isOpen={visibleModal === 'edit-profile'}
          updateVisibleModal={actions.updateVisibleModal}
          onSubmit={::this.handleSubmitEditProfile}
          modalError={modalError} />

        <FrameSettingsModalComponent
          isOpen={visibleModal === 'frame-settings'}
          updateVisibleModal={actions.updateVisibleModal}
          modalError={modalError}
          deleteFrameRequest={actions.deleteFrameRequest}
          removeFromFrameRequest={actions.removeFromFrameRequest}
          onSubmit={::this.handleSubmitFrameSettings} />

        <CreateAccountNoticeComponent
          isOpen={visibleModal === 'create-account-notice'}
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
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalManagerContainer);

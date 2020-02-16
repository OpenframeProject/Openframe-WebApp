import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import UpdatePasswordFormComponent from '../components/user/UpdatePasswordFormComponent';

class ResetPasswordModalContainer extends Component {
  _close() {
    if (this.props.onRequestClose) this.props.onRequestClose();
    this.props.actions.updateVisibleModal();
  }

  _onSubmit(fields) {
    let { actions, accessToken, userId } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.updateUserFailure('Passwords do not match');
      return;
    }
    delete fields.passwordConfirm;
    actions.updateUserRequest(fields, userId, accessToken);
    this.props.actions.updateVisibleModal();
  }

  render() {
    const { isOpen, modalError } = this.props;

    let errorClasses = 'row row-errors ';
    errorClasses += modalError ? 'show' : 'hide';

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={100}
        >

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this._close} type=
            "button">&times;</button>
            <h3 className="modal-title">Update Password</h3>
          </div>
          <div className="modal-body">
            <div className={errorClasses}>
              <div className="col-md-12">
                <div className="alert alert-danger" role="alert">
                  {modalError}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <UpdatePasswordFormComponent
                  onSubmit={::this._onSubmit}
                  submitText="Update Password"
                  ref="form" />
              </div>
            </div>
          </div>
        </div>

      </Modal>
    );
  }
}

ResetPasswordModalContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const props = {
    isOpen: ownProps.isOpen,
    forceLogin: ownProps.forceLogin || false,
    modalError: state.ui.modalError
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateUserRequest: require('../actions/user/updateUserRequest').default,
    updateUserFailure: require('../actions/user/updateUserFailure').default,
    updateVisibleModal: require('../actions/ui/updateVisibleModal').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModalContainer);

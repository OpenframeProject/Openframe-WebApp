'use strict';

import React from 'react';
import Modal from 'react-modal';

import EditProfileFormComponent from './EditProfileFormComponent';

require('styles/user/CreateAccountModal.scss');

class CreateAccountModalComponent extends React.Component {
  _close() {
    this.props.updateVisibleModal(null);
  }

  _goToLogin() {
    this.props.updateVisibleModal('login');
  }

  render() {
    const { isOpen, modalError, onSubmit } = this.props;

    let errorClasses = 'row row-errors ';
    errorClasses += modalError ? 'show' : 'hide';

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this._close} type=
            "button">&times;</button>
            <h3 className="modal-title">Create Account</h3>
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

                <EditProfileFormComponent
                  onSubmit={onSubmit}
                  submitText="Create Account"
                  ref="form" />

                <div className="switch-text">
                  <p>Already have an account? <span className="anchor" onClick={::this._goToLogin} >Log in here</span></p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </Modal>
    );
  }
}

CreateAccountModalComponent.displayName = 'UserCreateAccountModalComponent';

// Uncomment properties you need
// CreateAccountModalComponent.propTypes = {};
// CreateAccountModalComponent.defaultProps = {};

export default CreateAccountModalComponent;

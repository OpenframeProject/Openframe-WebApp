'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {reduxForm, Field} from 'redux-form';

import CustomInputComponent from '../form/CustomInputComponent';

require('styles/user/LoginModal.scss');

class RequestPasswordResetModalComponent extends React.Component {
  afterOpenModal() {
    this.refs.email.getRenderedComponent().focus();
  }

  _close() {
    this.props.updateVisibleModal(null);
  }

  render() {
    const { handleSubmit, updateVisibleModal, modalError, isOpen} = this.props;
    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={::this.afterOpenModal}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={::this._close} type=
              "button">&times;</button>
              <h3 className="modal-title">Request password reset</h3>
            </div>
            <div className="modal-body">
              <div className={errorClasses}>
                <div className="alert alert-danger" role="alert">
                  {modalError}
                </div>
              </div>

              <Field withRef ref="email" name="email" component={CustomInputComponent} type="email" placeholder="email" label="Email Address" />

            </div>
            <div className="modal-footer">
              <div className="form-group">
                <button type="submit" className="btn btn-default btn-fw">Send Reset Link</button>
              </div>
              <div className="switch-text">
                  <p>
                    <span className="anchor" onClick={() => updateVisibleModal('login')}>Login</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="anchor" onClick={() => updateVisibleModal('create-account')}>Create an account</span>
                  </p>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

RequestPasswordResetModalComponent = reduxForm({
  form: 'requestPasswordReset'
})(RequestPasswordResetModalComponent);

RequestPasswordResetModalComponent.displayName = 'CommonRequestPasswordResetModalComponent';

// Uncomment properties you need
RequestPasswordResetModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// RequestPasswordResetModalComponent.defaultProps = {};

export default RequestPasswordResetModalComponent;

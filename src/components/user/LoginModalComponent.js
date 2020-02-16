'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form'

import CustomInputComponent from '../form/CustomInputComponent';

require('styles/user/LoginModal.scss');

class LoginModalComponent extends React.Component {
  afterOpenModal() {
    // this.refs.username.getRenderedComponent().focus();
  }

  _close() {
    this.props.updateVisibleModal(null);
  }

  _gotoCreate() {
    this.props.updateVisibleModal('create-account');
  }

  _gotoPasswordReset() {
    this.props.updateVisibleModal('request-password-reset');
  }

  render() {
    const { handleSubmit, updateVisibleModal, modalError, isOpen } = this.props;
    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        // onAfterOpen={::this.afterOpenModal}
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
              <h3 className="modal-title">Log In</h3>
            </div>
            <div className="modal-body">
              <div className={errorClasses}>
                <div className="alert alert-danger" role="alert">
                  {modalError}
                </div>
              </div>

              <Field autoFocus ref="username" name="username" component={CustomInputComponent} type="text" placeholder="username" label="Username" />

              <Field name="password" component={CustomInputComponent} type="password" placeholder="password" label="Password" />

            </div>
            <div className="modal-footer">
              <div className="form-group">
                  <button type="submit" className="btn btn-default btn-fw">Log In</button>
              </div>
              <div className="switch-text">
                  <p>
                    <span className="anchor" onClick={() => updateVisibleModal('create-account')}>Create an account</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="anchor" onClick={() => updateVisibleModal('request-password-reset')}>Reset password</span>
                  </p>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

LoginModalComponent = reduxForm({
  form: 'login'
})(LoginModalComponent);

LoginModalComponent.displayName = 'CommonLoginModalComponent';

// Uncomment properties you need
LoginModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// LoginModalComponent.defaultProps = {};

export default LoginModalComponent;

'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';

require('styles/user/LoginModal.scss');

class LoginModalComponent extends React.Component {
  componentDidMount() {
  }

  afterOpenModal() {
    this.refs.username.focus();
  }

  closeModal() {
    this.props.closeLoginModal();
  }

  _gotoCreate() {
    this.props.closeLoginModal();
    this.props.openCreateAccountModal();
  }

  _gotoPasswordReset() {
    this.props.closeLoginModal();
    this.props.openInitiatePasswordResetModal();
  }

  render() {
    const {fields: {username, password}, handleSubmit, loginError, isOpen} = this.props;
    let errorClasses = 'row row-errors ';
    errorClasses += loginError ? 'show' : 'hide';
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={::this.afterOpenModal}
        onRequestClose={::this.closeModal}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={::this.closeModal} type=
              "button">&times;</button>
              <h3 className="modal-title">Log In</h3>
            </div>
            <div className="modal-body">
              <div className={errorClasses}>
                <div className="col-md-12">
                  <div className="alert alert-danger" role="alert">
                    {loginError}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="Username">Username</label>
                        <input type="text" ref={username.name} className="form-control" placeholder="username" autoFocus={true} autoCapitalize="off" {...username}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" autoCapitalize="off" placeholder="password" {...password}/>
                    </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="form-group">
                  <button type="submit" className="btn btn-default btn-fw">Log In</button>
              </div>
              <div className="switch-text">
                  <p>Don't have an account? <span className="anchor" onClick={::this._gotoCreate}>Create one here</span></p>
              </div>
              <div className="switch-text">
                  <p><span className="anchor" onClick={::this._gotoPasswordReset}>Reset Password</span></p>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

LoginModalComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(LoginModalComponent);

LoginModalComponent.displayName = 'CommonLoginModalComponent';

// Uncomment properties you need
LoginModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// LoginModalComponent.defaultProps = {};

export default LoginModalComponent;

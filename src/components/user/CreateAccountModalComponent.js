'use strict';

import React from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';

require('styles/user/CreateAccountModal.scss');

class CreateAccountModalComponent extends React.Component {
  afterOpenModal() {
    this.refs.full_name.focus();
  }

  closeModal() {
    this.props.closeCreateAccountModal();
  }

  onSubmit(fields) {
    console.log('fields', fields);
    if (fields.password !== fields.confirmPassword) {
      return false;
    }
    this.handleSubmit(fields);
  }

  render() {
    const {
      fields: {
        full_name,
        username,
        email,
        password,
        passwordConfirm,
        website,
        twitter
      }, isOpen, handleSubmit, createError} = this.props;

    let errorClasses = 'row row-errors ';
    errorClasses += createError ? 'show' : 'hide';

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

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this.closeModal} type=
            "button">&times;</button>
            <h3 className="modal-title">Create Account</h3>
          </div>
          <div className="modal-body">
            <div className={errorClasses}>
              <div className="col-md-12">
                <div className="alert alert-danger" role="alert">
                  {createError}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="Name">Full Name</label>
                        <input type="text" ref={full_name.name} className="form-control" placeholder="First Last" autoCapitalize="on" {...full_name}/>
                    </div>
                    <div className="form-group">
                        <label for="Username">Username</label>
                        <input type="text" className="form-control" placeholder="username" autoCapitalize="off" {...username}/>
                    </div>
                    <div className="form-group">
                        <label for="Email">Email</label>
                        <input type="email" className="form-control" placeholder="email" autoCapitalize="off" {...email}/>
                    </div>
                    <div className="form-group">
                        <label for="Password">Password</label>
                        <input type="password" className="form-control" autoCapitalize="off" placeholder="password" {...password}/>
                    </div>
                    <div className="form-group">
                        <label for="AdminPassConfirm">Confirm Password</label>
                        <input type="password" className="form-control" autoCapitalize="off" placeholder="confirm password" {...passwordConfirm}/>
                    </div>
                    <div className="form-group">
                        <label for="Website">Website (optional)</label>
                        <input type="text" className="form-control" placeholder="http://..." autoCapitalize="off" {...website}/>
                    </div>
                    <div className="form-group">
                        <label for="Twitter">Twitter (optional)</label>
                        <input type="text" className="form-control" placeholder="handle" autoCapitalize="off" {...twitter}/>
                    </div>
                    <div className="form-group">
                        <button id="LoginButton" href="#" className="btn btn-default">Create account</button>
                    </div>
                    <div className="switch-text">
                        <p>Already have an account? <a href="/login">Log in here</a></p>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </Modal>
    );
  }
}

CreateAccountModalComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                           // a unique name for this form
  fields: [
    'full_name',
    'username',
    'email',
    'password',
    'passwordConfirm',
    'website',
    'twitter'
  ] // all the fields in your form
})(CreateAccountModalComponent);

CreateAccountModalComponent.displayName = 'UserCreateAccountModalComponent';

// Uncomment properties you need
// CreateAccountModalComponent.propTypes = {};
// CreateAccountModalComponent.defaultProps = {};

export default CreateAccountModalComponent;

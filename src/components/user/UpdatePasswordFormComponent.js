'use strict';

import React from 'react';
import {reduxForm} from 'redux-form';

// require('styles/user/UpdatePasswordForm.scss');

class UpdatePasswordFormComponent extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      this.refs.password.focus();
    }.bind(this), 0);
  }

  onSubmit(fields) {
    if (fields.password !== fields.confirmPassword) {
      return false;
    }
    delete fields.confirmPassword;
    this.handleSubmit(fields);
  }

  render() {
    const {
      fields: {
        password,
        passwordConfirm
      }, handleSubmit, submitText } = this.props;

    let _submitText = submitText || 'Submit';

    return (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input ref={password.name} type="password" className="form-control" autoCapitalize="off" placeholder="password" {...password} />
          </div>
          <div className="form-group">
              <label htmlFor="AdminPassConfirm">Confirm Password</label>
              <input type="password" className="form-control" autoCapitalize="off" placeholder="confirm password" {...passwordConfirm} />
          </div>
          <div className="form-group">
              <button href="#" className="btn btn-default btn-fw">{ _submitText }</button>
          </div>
      </form>
    );
  }
}

UpdatePasswordFormComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'passwordReset',                           // a unique name for this form
    fields: [
      'password',
      'passwordConfirm'
    ] // all the fields in your form
  },
  state => ({ // mapStateToProps
    initialValues: {
      password: '',
      passwordConfirm: ''
    }  // will pull state into form's initialValues
  }))(UpdatePasswordFormComponent);



UpdatePasswordFormComponent.displayName = 'UpdatePasswordFormComponent';

// Uncomment properties you need
// UpdatePasswordFormComponent.propTypes = {};
// UpdatePasswordFormComponent.defaultProps = {};

export default UpdatePasswordFormComponent;

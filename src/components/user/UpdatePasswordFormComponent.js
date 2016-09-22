'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import CustomInputComponent from '../form/CustomInputComponent';
// require('styles/user/UpdatePasswordForm.scss');

class UpdatePasswordFormComponent extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      this.refs.password.focus();
    }.bind(this), 0);
  }

  render() {
    const { handleSubmit, submitText } = this.props;

    let _submitText = submitText || 'Submit';

    return (
      <form onSubmit={handleSubmit}>
          <Field name="password" component={CustomInputComponent} type="password" placeholder="password" label="Password" />

          <Field name="passwordConfirm" component={CustomInputComponent} type="password" placeholder="password" label="Confirm Password" />

          <div className="form-group">
              <button href="#" className="btn btn-default btn-fw">{ _submitText }</button>
          </div>
      </form>
    );
  }
}

UpdatePasswordFormComponent = reduxForm({
  form: 'passwordReset'
})(UpdatePasswordFormComponent);

// UpdatePasswordFormComponent = connect(
//   state => {}
// )(UpdatePasswordFormComponent);

UpdatePasswordFormComponent.displayName = 'UpdatePasswordFormComponent';

// Uncomment properties you need
// UpdatePasswordFormComponent.propTypes = {};
// UpdatePasswordFormComponent.defaultProps = {};

export default UpdatePasswordFormComponent;

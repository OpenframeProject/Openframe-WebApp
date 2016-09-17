'use strict';

import React from 'react';
import {reduxForm} from 'redux-form';

import { getCurrentUser } from '../../reducers/user/index';

require('styles/user/EditProfileForm.scss');

class EditProfileFormComponent extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      this.refs.full_name.focus();
    }.bind(this), 0);
  }

  doCloseActions() {
    if (this.props.closeActions && this.props.closeActions.length) {
      this.props.closeActions.each(action => {
        action();
      });
    }
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
        full_name,
        username,
        email,
        password,
        passwordConfirm,
        website,
        twitter
      }, handleSubmit, submitText } = this.props;

    let _submitText = submitText || 'Submit';

    return (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="Name">Full Name</label>
              <input type="text" ref={full_name.name} className="form-control" placeholder="First Last" autoCapitalize="on" {...full_name} />
          </div>
          <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input type="text" className="form-control" placeholder="username" autoCapitalize="off" {...username}/>
          </div>
          <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="email" className="form-control" placeholder="email" autoCapitalize="off" {...email}/>
          </div>
          <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="password" className="form-control" autoCapitalize="off" placeholder="password" {...password}/>
          </div>
          <div className="form-group">
              <label htmlFor="AdminPassConfirm">Confirm Password</label>
              <input type="password" className="form-control" autoCapitalize="off" placeholder="confirm password" {...passwordConfirm}/>
          </div>
          <div className="form-group">
              <label htmlFor="Website">Website (optional)</label>
              <input type="text" className="form-control" placeholder="http://..." autoCapitalize="off" {...website}/>
          </div>
          <div className="form-group">
              <label htmlFor="Twitter">Twitter (optional)</label>
              <input type="text" className="form-control" placeholder="handle" autoCapitalize="off" {...twitter}/>
          </div>
          <div className="form-group">
              <button href="#" className="btn btn-default btn-fw">{ _submitText }</button>
          </div>
      </form>
    );
  }
}

EditProfileFormComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'profile',                           // a unique name for this form
    fields: [
      'full_name',
      'username',
      'email',
      'password',
      'passwordConfirm',
      'website',
      'twitter'
    ] // all the fields in your form
  },
  state => ({ // mapStateToProps
    initialValues: {
      ...getCurrentUser(state.user),
      passwordConfirm: ''
    }  // will pull state into form's initialValues
  }))(EditProfileFormComponent);



EditProfileFormComponent.displayName = 'EditProfileFormComponent';

// Uncomment properties you need
// EditProfileFormComponent.propTypes = {};
// EditProfileFormComponent.defaultProps = {};

export default EditProfileFormComponent;

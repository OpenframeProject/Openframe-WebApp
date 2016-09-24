import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StandardModalComponent from '../../components/common/StandardModalComponent';
import EditProfileFormComponent from '../../components/user/EditProfileFormComponent';

class EditProfileModalContainer extends Component {
  _handleSubmitEditProfile(fields) {
    let { actions } = this.props;
    if (fields.password && fields.password !== fields.passwordConfirm) {
      actions.updateUserFailure('Passwords do not match');
      return;
    }
    actions.updateUserRequest(fields);
  }

  _doSubmit() {
    let body = this.refs.modal.getBodyComponent();
    let form = body && body.getWrappedInstance();
    if (form && form.submit) form.submit();
  }

  _doDelete() {
    console.log('delete me!', this.refs.modal.getBodyComponent());

  }

  _getUserActions() {
    return [
      {
        text: 'Save Changes',
        className: 'btn-default',
        onClick: ::this._doSubmit
      },
      {
        text: 'Delete Account',
        className: 'btn-destructive',
        onClick: ::this._doDelete,
        confirmConfig: {
          title: 'Srsly tho?',
          body: 'Are you sure you want to delete your account? This cannot be undone.',
          acceptText: 'Yep',
          cancelText: 'Heck no!'
        }
      }
    ];
  }

  render() {
    let body = <EditProfileFormComponent
      updateVisibleModal={this.props.actions.updateVisibleModal}
      onSubmit={::this._handleSubmitEditProfile} />;

    return <StandardModalComponent
      isOpen={this.props.isOpen}
      title="Edit Profile"
      body={body}
      userActions={::this._getUserActions()}
      ref="modal" />;
  }
}

EditProfileModalContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const props = {
    ...ownProps
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateUserRequest: require('../../actions/user/updateUserRequest'),
    updateUserFailure: require('../../actions/user/updateUserFailure'),
    updateVisibleModal: require('../../actions/ui/updateVisibleModal')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModalContainer);

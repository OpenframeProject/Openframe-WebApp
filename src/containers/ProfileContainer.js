import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getProfileUser, getProfileNotFound } from '../reducers/users/index';

class ProfileContainer extends Component {
  componentWillMount() {
    const {actions, params} = this.props;
    let username = params.username;
    actions.fetchUserRequest(username);
  }

  componentDidUpdate() {
    const { profileNotFound } = this.props;
    if (profileNotFound) {
      // TODO: push to 404 page
      browserHistory.push('/');
      return;
    }
  }

  render() {
    return (
      <div className="profile-container">
        {this.props.children}
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    user: getProfileUser(state.user),
    profileNotFound: getProfileNotFound(state.user)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserRequest: require('../actions/user/fetchUserRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

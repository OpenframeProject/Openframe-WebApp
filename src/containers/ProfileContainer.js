import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotFoundComponent from '../components/common/NotFoundComponent';
import { getProfileNotFound } from '../reducers/users/index';

class ProfileContainer extends Component {
  fetchUser() {
    const {actions, params} = this.props;
    let username = params.username;
    actions.fetchUserRequest(username);
  }

  componentWillMount() {
    this.fetchUser();
  }

  componentWillUpdate() {
    this.fetchUser();
  }

  render() {
    const { profileNotFound } = this.props;
    return (
      <div className="profile-container">
        { profileNotFound
          ? <NotFoundComponent></NotFoundComponent>
          : this.props.children
        }
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
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

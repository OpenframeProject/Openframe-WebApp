import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotFoundComponent from '../components/common/NotFoundComponent';
import { getProfileNotFound } from '../reducers/user/index';

class ProfileContainer extends Component {
  fetchUser(username) {
    const {actions} = this.props;
    actions.fetchUserRequest(username);
  }

  componentWillMount() {
    const {params} = this.props;
    this.fetchUser(params.username);
  }

  // componentWillUpdate() {
  //   this.fetchUser();
  // }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    const {params} = this.props;
    let username = params.username;

    if (nextProps.params.username !== username) {
      this.fetchUser(nextProps.params.username);
    }
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

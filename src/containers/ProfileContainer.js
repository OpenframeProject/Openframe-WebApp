import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotFoundComponent from '../components/common/NotFoundComponent';
import LikesContainer from './LikesContainer';
import AddedContainer from './AddedContainer';
import { getProfileNotFound } from '../reducers/user/index';

class ProfileContainer extends Component {
  fetchUser(username) {
    const {actions} = this.props;
    actions.fetchUserRequest(username);
  }

  componentDidMount() {
    const {params} = this.props;
    console.log("ProfileContainer", this.props);
    this.fetchUser(params.username);
  }

  // componentWillUpdate() {
  //   this.fetchUser();
  // }

  componentDidUpdate(prevProps) {
    console.log("ProfileContainer", this.props, prevProps);
    const { params } = this.props;
    let username = params.username;

    if (prevProps.params.username !== username) {
      this.fetchUser(username);
    }
  }

  render() {
    const { profileNotFound, params: { username } } = this.props;
    return (
      <div className="profile-container">
        <Switch>
            {profileNotFound && <Route path={`/${username}`} component={NotFoundComponent} />}
            <Route path={`/${username}/likes`} component={LikesContainer} />
            <Route path={`/${username}/added`} component={AddedContainer} />
            <Route path={`/${username}`} component={AddedContainer} />
            {/* <Redirect from={`/${username}`} to={`/${username}/added`} /> */}
        </Switch>
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
    fetchUserRequest: require('../actions/user/fetchUserRequest.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUser } from '../reducers/user/index';

class StreamContainer extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.updateVisibleModal('login');
  }

  componentWillUpdate(newProps) {
    console.log('newProps', newProps);
    if (newProps.currentUser) {
      console.log('currentUser is there');
      window.opener.postMessage('success', '*');
      window.close();
    }
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}

StreamContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    currentUser: getCurrentUser(state.user)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

import { browserHistory } from 'react-router';
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

require('styles/common/VerifiedEmailContainer.scss');

class VerifiedEmailContainer extends Component {
  _gotoLogin() {
    const {actions} = this.props;
    actions.openLoginModal();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      browserHistory.push('/');
    }
  }
  render() {
    return (
      <div className="container">
        <div className="verified-email-container">
          <h3>Thanks, your email has been verified!</h3>
          <button className="btn btn-default" onClick={::this._gotoLogin}>Login now</button>
        </div>
      </div>
    );
  }
}

VerifiedEmailContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    currentUser: state.user.current
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    openLoginModal: require('../actions/ui/openLoginModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedEmailContainer);

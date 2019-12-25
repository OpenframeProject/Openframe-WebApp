import React, {
  Component
} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

require('styles/common/VerifiedEmailContainer.scss');

class VerifiedEmailContainer extends Component {
  constructor(props) {
    super(props);
    this.history = useHistory()
  }

  _gotoLogin() {
    const {actions} = this.props;
    actions.updateVisibleModal('login');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.history.push('/');
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
    )
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
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedEmailContainer);

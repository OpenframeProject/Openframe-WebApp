import React, {
  Component
} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResetPasswordModalContainer from './ResetPasswordModalContainer';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import { users } from '../sources/api';


require('styles/common/ResetPasswordContainer.scss');

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenIsValid: false,
      isLoading: true
    }
    this.history = useHistory()
  }

  componentWillMount() {
    const { actions, params } = this.props;
    let self = this;
    if (params.accessToken) {
      users.fetchById('current', {}, params.accessToken)
        .then(user => {
          self._setValid(user.id);
        })
        .catch(error => {
          self._setInvalid();
        })
    } else {
      this._setInvalid();
    }
  }

  _setValid(userId) {
    this.setState({
      tokenIsValid: true,
      isLoading: false,
      userId: userId
    });
  }

  _setInvalid() {
    this.setState({
      tokenIsValid: false,
      isLoading: false
    });
  }

  _onRequestClose() {
    this.history.push('/');
  }

  render() {
    const { params } = this.props;
    return (
      <div className="container reset-password-container">
        { this.state.isLoading
          ? <LoadingIndicatorComponent />
          : null
        }
        { !this.state.isLoading && this.state.tokenIsValid
          ? <ResetPasswordModalContainer
              onRequestClose={::this._onRequestClose}
              isOpen={true}
              userId={this.state.userId}
              accessToken={params.accessToken} />
          : null
        }
        { !this.state.isLoading && !this.state.tokenIsValid
          ? <div>
              <h3>Invalid password reset link</h3>
              <p>Sorry, something doesn't seem right.</p>
            </div>
          : null
        }
      </div>
    );
  }
}

ResetPasswordContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);

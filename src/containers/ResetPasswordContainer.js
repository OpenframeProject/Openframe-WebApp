import { browserHistory } from 'react-router';
import React, {
  Component,
  PropTypes
} from 'react';
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
  }

  componentWillMount() {
    console.log('componentWillMount');

    const { actions, params } = this.props;
    let self = this;
    if (params.accessToken) {
      console.log('fetching user...');
      users.fetchById('current', {}, params.accessToken)
        .then(user => {
          console.log('user', user);
          self._setValid();
        })
        .catch(error => {
          console.log('error', error);
          self._setInvalid();
        })
    } else {
      this._setInvalid();
    }
  }

  _setValid() {
    console.log('_setValid');
    this.setState({
      tokenIsValid: true,
      isLoading: false
    });
  }

  _setInvalid() {
    console.log('_setInvalid');
    this.setState({
      tokenIsValid: false,
      isLoading: false
    });
  }

  _onRequestClose() {
    browserHistory.push('/');
  }

  render() {
    const { actions, passwordResetToken, params } = this.props;
    return (
      <div className="container reset-password-container">
        { this.state.isLoading
          ? <LoadingIndicatorComponent />
          : null
        }
        { !this.state.isLoading && this.state.tokenIsValid
          ? <ResetPasswordModalContainer onRequestClose={::this._onRequestClose} isOpen={true} accessToken={params.accessToken} />
          : null
        }
        { !this.state.isLoading && !this.state.tokenIsValid
          ? <div>
              <h3>Invalid password reset link</h3>
              <p>Sorry, but something doesn't seem right.</p>
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

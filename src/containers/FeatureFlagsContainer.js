import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

require('styles/common/FeatureFlagsContainer.scss');

class FeatureFlagsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.featureFlags;
  }

  onChange(e) {
    let { actions } = this.props;
    this.setState({
      [e.target.name]: e.target.checked
    });
    actions.setFeatureFlag(e.target.name, e.target.checked);

  }

  render() {
    const featureFlags = this.state;
    return (
      <div className="feature-flags">
        <div className="container">
          <h3>Feature Flags</h3>
          <ul className="feature-flags__list">
          {
            Object.keys(featureFlags).map(key => {
              let value = featureFlags[key];
              return <li key={key} className="feature-flags__list-item"><input name={key} type="checkbox" checked={value} onChange={::this.onChange} /> { key }</li>;
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}

FeatureFlagsContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    featureFlags: state.featureFlags
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    setFeatureFlag: require('../actions/common/setFeatureFlag.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlagsContainer);

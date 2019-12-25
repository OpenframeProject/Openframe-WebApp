'use strict';

import React from 'react';
// import Spinner from 'react-spin';
import config from 'config';

require('styles/common/LoadingIndicator.scss');

class LoadingIndicatorComponent extends React.Component {
  constructor() {
    super();
    // Configuration for loading spinner
    this.spinnerConfig = config.spinnerConfig;
  }

  componentWillMount() {
    const { options } = this.props;
    if (options) {
      Object.assign(this.spinnerConfig, options);
    }
  }

  render() {
    return (
      <div className="loading-indicator">
        <div className="loading-indicator__indicator">
          {/* <Spinner config={this.spinnerConfig} /> */}
          ...
        </div>
      </div>
    );
  }
}

LoadingIndicatorComponent.displayName = 'CommonLoadingIndicatorComponent';

// Uncomment properties you need
// LoadingIndicatorComponent.propTypes = {};
// LoadingIndicatorComponent.defaultProps = {};

export default LoadingIndicatorComponent;

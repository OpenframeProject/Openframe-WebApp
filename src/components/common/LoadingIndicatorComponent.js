'use strict';

import React from 'react';

require('styles/common/LoadingIndicator.scss');

class LoadingIndicatorComponent extends React.Component {
  render() {
    return (
      <div className="loading-indicator">
        <div className="loading-indicator__indicator">
          Loading...
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

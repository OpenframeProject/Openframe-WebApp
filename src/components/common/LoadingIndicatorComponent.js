'use strict';

import React from 'react';
import Spinner from 'react-spin';

require('styles/common/LoadingIndicator.scss');

class LoadingIndicatorComponent extends React.Component {
  constructor() {
    super();
    // Configuration for loading spinner
    this.spinnerConfig = {
        lines: 11 // The number of lines to draw
      , length: 0 // The length of each line
      , width: 8 // The line thickness
      , radius: 60 // The radius of the inner circle
      , scale: 0.25 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#000' // #rgb or #rrggbb or array of colors
      , opacity: 0.25 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 1 // Rounds per second
      , trail: 91 // Afterglow percentage
      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the spinner
      , top: '50%' // Top position relative to parent
      , left: '50%' // Left position relative to parent
      , shadow: false // Whether to render a shadow
      , hwaccel: false // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
    };

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
          <Spinner config={this.spinnerConfig} />
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

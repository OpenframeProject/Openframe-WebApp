'use strict';

import React from 'react';

require('styles//topbar/SelectedFrame.scss');
import FrameItemComponent from '../frame/FrameItemComponent';

class SelectedFrameComponent extends React.Component {
  render() {
    let { selectedFrame, isPushing } = this.props;

    return (
      <div className="selected-frame">
        <FrameItemComponent frame={selectedFrame} isPushing={isPushing} isSelected={true} />
      </div>
    );
  }
}

SelectedFrameComponent.displayName = 'SelectedFrameComponent';

// Uncomment properties you need
SelectedFrameComponent.propTypes = {};
SelectedFrameComponent.defaultProps = {};

export default SelectedFrameComponent;

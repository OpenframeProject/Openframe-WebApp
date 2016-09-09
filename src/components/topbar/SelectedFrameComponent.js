'use strict';

import React from 'react';

require('styles//topbar/SelectedFrame.scss');
import FrameItemContainer from '../../containers/frame/FrameItemContainer';

class SelectedFrameComponent extends React.Component {
  render() {
    let { selectedFrame, pathname } = this.props;

    return (
      <div className="selected-frame">
        <FrameItemContainer
          frame={selectedFrame}
          showSettingsButton={true}
          pathname={pathname} />
      </div>
    );
  }
}

SelectedFrameComponent.displayName = 'SelectedFrameComponent';

// Uncomment properties you need
SelectedFrameComponent.propTypes = {};
SelectedFrameComponent.defaultProps = {};

export default SelectedFrameComponent;

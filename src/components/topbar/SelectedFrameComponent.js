'use strict';

import React from 'react';

require('styles//topbar/SelectedFrame.scss');

class SelectedFrameComponent extends React.Component {
  render() {
    let {connected, name, current_artwork_ref} = this.props.selectedFrame;

    let connectedClass = 'selected-frame-indicator';
    connectedClass += connected ? ' selected-frame-indicator--connected' : '';

    let curArt;
    if (current_artwork_ref) {
        curArt = <span>{ current_artwork_ref.author_name } - { current_artwork_ref.title }</span>;
    } else {
        curArt = <span>No Artwork Displayed</span>
    }


    return (
      <div className="selected-frame pull-right">
        <div className="selected-frame__name">
            <span className={ connectedClass }>&bull;</span>
            { name }
        </div>
        <div className="selected-frame__status displaying hidden-xs">
            { curArt }
        </div>
      </div>
    );
  }
}

SelectedFrameComponent.displayName = 'SelectedFrameComponent';

// Uncomment properties you need
// SelectedFrameComponent.propTypes = {};
SelectedFrameComponent.defaultProps = {};

export default SelectedFrameComponent;

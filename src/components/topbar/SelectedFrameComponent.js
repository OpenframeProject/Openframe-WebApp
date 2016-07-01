'use strict';

import React from 'react';

require('styles//topbar/SelectedFrame.scss');

class SelectedFrameComponent extends React.Component {
  render() {
    let {connected, name, _current_artwork} = this.props.selectedFrame;
    let connectedClass = 'selected-frame__indicator';
    connectedClass += connected ? ' selected-frame__indicator--connected' : '';

    let curArt;
    if (_current_artwork) {
        curArt = <span>{ _current_artwork.author_name } - { _current_artwork.title }</span>;
    } else {
        curArt = <span>No Artwork Displayed</span>
    }


    return (
      <div className="selected-frame">
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

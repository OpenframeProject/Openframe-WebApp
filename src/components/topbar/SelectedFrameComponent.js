'use strict';

import React from 'react';

import { Link } from 'react-router';
import Spinner from 'react-spin';

require('styles//topbar/SelectedFrame.scss');
let settingsImg = require('../../images/settings_white.svg');

class SelectedFrameComponent extends React.Component {
  openSettings() {
    console.log('openSettings', this.props.selectedFrame);
  }

  render() {
    let {connected, name, current_artwork_ref } = this.props.selectedFrame;
    let { isPushing } = this.props;

    let connectedClass = 'selected-frame-indicator';
    connectedClass += connected ? ' selected-frame-indicator--connected' : '';

    let spinnerConfig = {
        lines: 11 // The number of lines to draw
      , length: 0 // The length of each line
      , width: 8 // The line thickness
      , radius: 28 // The radius of the inner circle
      , scale: 0.25 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#fff' // #rgb or #rrggbb or array of colors
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

    let thumbStyles = {};
    if (current_artwork_ref && !isPushing) {
      thumbStyles.backgroundImage = 'url(' + current_artwork_ref.thumb_url + ')'
    } else {
      thumbStyles.backgroundImage = 'none';
    }

    return (
      <div className="selected-frame pull-right">
        <span className={ connectedClass }>&bull;</span>
        { current_artwork_ref
            ? <Link to={{
                pathname: '/artwork/'+current_artwork_ref.id,
                state: { modal: true, returnTo: this.props.location.pathname }
              }}>
                <div className="selected-frame__thumb" style={thumbStyles}>
                  { isPushing
                    ? <Spinner config={spinnerConfig} />
                    : null
                  }
                </div>
              </Link>
            : null
        }

        <div className="selected-frame__info">
          <div className="selected-frame__name">
              { name }
              <img className="selected-frame__settings" src={settingsImg} onClick={::this.openSettings} />
          </div>
          <div className="selected-frame__status displaying">
              { current_artwork_ref
                  ? <span>{ current_artwork_ref.author_name } - { current_artwork_ref.title }</span>
                  : <span>No Artwork Displayed</span>
              }
          </div>
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

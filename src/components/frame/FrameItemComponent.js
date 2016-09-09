'use strict';

import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import Spinner from 'react-spin';

require('styles//frame/FrameItem.scss');
let settingsImg = require('../../images/settings_white.svg');

class FrameItemComponent extends React.Component {
  constructor() {
    super();
    // Configuration for loading spinner
    this.spinnerConfig = {
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

  }

  openSettings() {
    console.log('openSettings', this.props.frame);
    const {frame, actions} = this.props;
    actions.openFrameSettingsModal(frame.id);
  }

  render() {
    let { isPushing, isSelected, currentArtwork, showSettingsButton, pathname } = this.props;

    let { connected, name } = this.props.frame; // props.frame, NOT PROPS!!

    let connectedClass = 'connected-indicator';
    connectedClass += connected ? ' connected-indicator--connected' : '';

    let thumbStyles = {};
    if (currentArtwork && !isPushing) {
      thumbStyles.backgroundImage = 'url(' + currentArtwork.thumb_url + ')'
    } else {
      // TODO: default bg image
      thumbStyles.backgroundImage = 'none';
    }

    return (
      <div className="frame-item">
        <span className={ connectedClass }>&bull;</span>
        { currentArtwork
            ? <Link to={{
                pathname: '/artwork/'+currentArtwork.id,
                state: { modal: true, returnTo: pathname }
              }}>
                <div className="frame-item__thumb" style={thumbStyles}>
                  { isPushing && isSelected
                    ? <Spinner config={this.spinnerConfig} />
                    : null
                  }
                </div>
              </Link>
            : <div className="frame-item__thumb frame-item__thumb--empty">
                { isPushing && isSelected
                  ? <Spinner config={this.spinnerConfig} />
                  : null
                }
              </div>
        }

        <div className="frame-item__info">
          <div className="frame-item__name">
              { name }
              { showSettingsButton
                ? <img className="frame-item__settings" src={settingsImg} onClick={::this.openSettings} />
                : null
              }
          </div>
          <div className="frame-item__status displaying">
              { currentArtwork
                  ? <span>{ currentArtwork.author_name } - { currentArtwork.title }</span>
                  : <span>No Artwork Displayed</span>
              }
          </div>
        </div>
      </div>
    );
  }
}

FrameItemComponent.displayName = 'FrameItemComponent';

// Uncomment properties you need
FrameItemComponent.propTypes = {
  frame: PropTypes.object.isRequired,
  isPushing: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  showSettingsButton: PropTypes.bool.isRequired,
  currentArtwork: PropTypes.object,
  pathname: PropTypes.string
};

FrameItemComponent.defaultProps = {
  isPushing: false,
  isSelected: false,
  showSettingsButton: false,
  currentArtwork: null
};

export default FrameItemComponent;

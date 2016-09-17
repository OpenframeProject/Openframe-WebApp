'use strict';

import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import Spinner from 'react-spin';
import config from 'config';

require('styles//frame/FrameItem.scss');
let settingsImg = require('../../images/settings_white.svg');

class FrameItemComponent extends React.Component {
  constructor() {
    super();

    this.spinnerConfig = Object.assign({}, config.spinnerConfig, {
      color: '#fff',
      radius: 28 // The radius of the inner circle
    });
  }

  openSettings() {
    const {frame, actions} = this.props;
    actions.editFrameSettings(frame.id);
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

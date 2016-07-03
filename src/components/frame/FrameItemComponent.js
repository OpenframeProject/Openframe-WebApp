'use strict';

import React from 'react';

require('styles/frame/FrameItem.scss');

let checkmarkIcon = require('../../images/frame-checkmark.svg');
let settingsIcon = require('../../images/settings.svg');

class FrameItemComponent extends React.Component {
  render() {
  	let {isCurrent, isConnected, isOwner, frame} = this.props;
    let className = 'sidebar__row sidebar__row--frame';
    className += isCurrent ? ' sidebar_row--frame-active' : '';

    let isConnectedClass = 'current-frame-indicator';
    isConnectedClass += isConnected ? ' current-frame-indicator--connected' : ' current-frame-indicator--disconnected';

    return (
      <li className={className}>
        { isCurrent
        	? <img className="mark-frame-active" src={checkmarkIcon} />
        	: ''
        }

        <span className={isConnectedClass}>&bull;</span>

        <div className="frame-name">{ frame.name }</div>

        { isOwner
        	? <a className="btn-frame-settings" href="#" data-toggle="modal" data-target="#FrameSettingsModal" data-frameid="{{- id }}">
	            <img className="icon-settings" src={settingsIcon} />
	        </a>
	        : ''
        }

        <div className="frame-status displaying">
        	{ frame._current_artwork ? frame._current_artwork.author_name + ' - ' + frame._current_artwork.title : 'No Artwork Displayed'}
        </div>
    </li>
    );
  }
}

FrameItemComponent.displayName = 'FrameFrameItemComponent';

// Uncomment properties you need
FrameItemComponent.propTypes = {};
FrameItemComponent.defaultProps = {};

export default FrameItemComponent;

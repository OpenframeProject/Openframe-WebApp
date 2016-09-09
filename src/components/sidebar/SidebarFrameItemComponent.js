'use strict';

import React, { PropTypes } from 'react';

require('styles/sidebar/SidebarFrameItem.scss');

import FrameItemContainer from '../../containers/frame/FrameItemContainer'

let checkmarkIcon = require('../../images/frame-checkmark.svg');
let settingsIcon = require('../../images/settings_white.svg');

class SidebarFrameItemComponent extends React.Component {

  handleClick() {
    let {selectFrame, frame} = this.props;
    selectFrame(frame.id);
  }

  openFrameSettings(e) {
    e.preventDefault();
    const {frame, openFrameSettingsModal} = this.props;
    openFrameSettingsModal(frame.id);
  }

  render() {
    let {isSelected, isOwner, frame} = this.props;

    let className = 'sidebar-frame-item sidebar__row sidebar__row--frame';
    className += isSelected ? ' sidebar_row--frame-active' : '';

    return (
      <li className={className} onClick={this.handleClick.bind(this)}>
        { isSelected
          ? <img className="mark-frame-active" src={checkmarkIcon} />
          : ''
        }

        <FrameItemContainer
          frame={frame} />

        { isOwner
          ? <span className="sidebar-frame-item__settings" href="#" onClick={::this.openFrameSettings}>
              <img className="icon-settings" src={settingsIcon} />
            </span>
          : ''
        }
      </li>
    );
  }
}

SidebarFrameItemComponent.displayName = 'SidebarSidebarFrameItemComponent';

// Uncomment properties you need
SidebarFrameItemComponent.propTypes = {
  frame: PropTypes.object.isRequired,
  selectFrame: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};
SidebarFrameItemComponent.defaultProps = {
  isSelected: false
};

export default SidebarFrameItemComponent;

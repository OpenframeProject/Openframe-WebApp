'use strict';

import React, { PropTypes } from 'react';

require('styles/sidebar/SidebarFrameItem.scss');

import FrameItemContainer from '../../containers/frame/FrameItemContainer'

let checkmarkIcon = require('../../images/checkmark_white.svg');
let settingsIcon = require('../../images/settings_white.svg');
let infoIcon = require('../../images/threedots.svg');

class SidebarFrameItemComponent extends React.Component {

  _selectFrame() {
    let {selectFrame, frame} = this.props;
    selectFrame(frame.id);
  }

  render() {
    let {isSelected, editFrameSettings, isOwner, frame} = this.props;

    let className = 'sidebar-frame-item sidebar__row sidebar__row--frame';
    className += isSelected ? ' sidebar_row--frame-active' : '';

    return (
      <li className={className} onClick={::this._selectFrame}>

        <FrameItemContainer
          frame={frame} />

        <div className="sidebar-frame-item__actions">
          { isSelected
            ? <span className="sidebar-frame-item__selected">
                <img className="mark-frame-active" src={checkmarkIcon} />
              </span>
            : ''
          }
          { isOwner
            ? <span className="sidebar-frame-item__settings" onClick={editFrameSettings}>
                <img className="icon-settings" src={settingsIcon} />
              </span>
            : <span className="sidebar-frame-item__settings" onClick={editFrameSettings}>
                <img className="icon-settings" src={settingsIcon} />
              </span>
          }
        </div>
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

'use strict';

import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

import SidebarFrameItemComponent from './SidebarFrameItemComponent'

require('styles//sidebar/Sidebar.scss');

let closeIcon = require('../../images/icon_cross_mobile.svg');

class SidebarComponent extends Component {

	// when clicking outside the sidebar, close it.
	handleClickOutside() {
		if (this.props.isOpen) {
   		this.props.closeSidebar();
		}
  }

  render() {
  	let className = 'sidebar';
  	let {isOpen, closeSidebar, frames, selectedFrame, user, selectFrame, logoutRequest, openEditProfileModal, openFrameSettingsModal, location } = this.props;

  	if (isOpen) {
  		className += ' sidebar--open';
  	}

    return (
      <div className={className}>
		    <div className="sidebar-header">
		    	<div className="sidebar__row--title">Frames</div>
	        <img className="btn-menu-close cross" src={closeIcon} onClick={closeSidebar}/>
		    </div>



		    <ul className="sidebar__frames-list" id="MenuFrameList">

		    	{frames.map(frame =>
		    		<SidebarFrameItemComponent
		    			key={frame.id}
		    			frame={frame}
		    			isSelected={frame.id === selectedFrame}
		    			isOwner={frame.ownerId === user.id}
              openFrameSettingsModal={openFrameSettingsModal}
              selectFrame={selectFrame}
              pathname={location.pathname} />
		    	)}
		    </ul>

		    <div className="sidebar__row sidebar__row--logout">
		        <span className="anchor" onClick={openEditProfileModal}>Edit profile</span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <span className="anchor" onClick={logoutRequest}>Log out</span>
		    </div>
		  </div>
    );
  }
}

SidebarComponent.displayName = 'SidebarComponent';

// Uncomment properties you need
SidebarComponent.propTypes = {
	frames: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	closeSidebar: PropTypes.func.isRequired
};
SidebarComponent.defaultProps = {
	frames: [],
	isOpen: false
};

export default onClickOutside(SidebarComponent);

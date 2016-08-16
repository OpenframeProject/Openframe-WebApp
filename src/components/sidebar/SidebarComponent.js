'use strict';

import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

import FrameItemComponent from '../frame/FrameItemComponent'

require('styles//Sidebar.scss');

let closeIcon = require('../../images/cross.svg');

class SidebarComponent extends Component {

	// when clicking outside the sidebar, close it.
	handleClickOutside() {
		if (this.props.isOpen) {
   		this.props.closeSidebar();
		}
  }

  render() {
  	let className = 'sidebar';
  	let {isOpen, closeSidebar, frames, selectedFrame, user, selectFrame, logoutRequest, openEditProfileModal} = this.props;

  	if (isOpen) {
  		className += ' sidebar--open';
  	}

    return (
      <div className={className}>
		    <div className="sidebar-header">
		        <img className="btn-menu-close cross" src={closeIcon} onClick={closeSidebar}/>
		    </div>

		    <div className="sidebar__row sidebar__row--title">Frames</div>

		    <ul className="sidebar__frames-list" id="MenuFrameList">

		    	{frames.map(frame =>
		    		<FrameItemComponent
		    			key={frame.id}
		    			frame={frame}
		    			isCurrent={frame.id === selectedFrame}
		    			isOwner={frame.owner && (frame.owner.id === user.id)}
              selectFrame={selectFrame} />
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

'use strict';

import React from 'react';
import SelectedFrameComponent from './SelectedFrameComponent'
import { NavLink } from 'react-router-dom'

require('styles//topbar/Topbar.scss')

import logo from '../../images/of-logo.svg'

class TopbarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      shadow: false
    };
  }

  _showShadow() {
    this.setState({
      shadow: true
    });
  }

  _hideShadow() {
    this.setState({
      shadow: false
    });
  }

  _gotoInfoLanding() {
  }

  render() {
    let { updateSidebarState, updateVisibleModal, selectedFrame, user, isFetching, location } = this.props;
    let username = user ? `${user.username}` : null;

    let browseActiveRoutes = ['/stream', '/channels', '/collections', '/artwork'];

    let active = browseActiveRoutes.indexOf(location.pathname) !== -1 ? 'active' : '';

    // debugger

    let classes = 'topbar' + (this.state.shadow ? ' topbar--shadow' : '');

    return (

      <nav className={classes}>
        <div className="top-shadow"></div>
        <NavLink className="topbar__tab topbar__tab--logo" exact to="/">
          <img alt="Openframe" src={logo} />
        </NavLink>

        {
          user
            ? (
              <span className="hidden-xs">
                <NavLink className="topbar__tab topbar__tab--menu" activeClassName={active} to="/stream">Browse</NavLink>
                <NavLink className="topbar__tab topbar__tab--menu" activeClassName="active" to={`/${username}`}>You</NavLink>
              </span>
            )
            : null
        }

        {
          user
            ? (
              <div className="topbar__tab topbar__tab--transparent pull-right" onClick={() => updateSidebarState(true)}>
                <div className="sidebar-btn" ></div>
              </div>
            )
            : null
        }

        {
          !user && !isFetching
            ? (
              <span className="topbar__tab topbar__tab--link pull-right" onClick={() => updateVisibleModal('login')} >Log in</span>
            )
            : null
        }

        {
          !user && !isFetching
            ? (
              <span className="topbar__tab topbar__tab--link pull-right" onClick={() => updateVisibleModal('create-account')} >Create an account</span>
            )
            : null
        }

        {
          !user && !isFetching
            ? (
              <a className="topbar__tab topbar__tab--link pull-right" onClick={::this._gotoInfoLanding} href="/">About Openframe</a>
    )
            : null
  }

          {
  selectedFrame && user
    ? (
      <div className="topbar__tab topbar__tab--transparent topbar__tab--selected-frame">
        <SelectedFrameComponent
          selectedFrame={selectedFrame}
          location={location} />
      </div>
    )
    : null
}

      </nav >
    );
  }
}

TopbarComponent.displayName = 'TopbarComponent';

// Uncomment properties you need
// TopbarComponent.propTypes = {};
// TopbarComponent.defaultProps = {
//     user
// };

export default TopbarComponent;

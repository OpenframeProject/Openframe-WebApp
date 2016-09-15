'use strict';

import React from 'react';
import SelectedFrameComponent from './SelectedFrameComponent';
import { Link } from 'react-router';

require('styles//topbar/Topbar.scss');

let logo = require('../../images/of-logo.svg');

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
    console.log('TODO: go to landing');
  }

  render() {
    let {openSidebar, openLoginModal, openCreateAccountModal, selectedFrame, user, isFetching, location} = this.props;
    let username = user ? `/${user.username}` : null;

    let browseActiveRoutes = ['/stream', '/channels', '/collections', '/artwork'];

    let active = browseActiveRoutes.indexOf(location.pathname) !== -1 ? 'active' : '';

    let classes = 'topbar' + (this.state.shadow ? ' topbar--shadow' : '');

    return (

      <nav className={classes}>
          <div className="top-shadow"></div>
          <Link className="topbar__tab topbar__tab--logo" to="/">
            <img alt="Openframe" src={logo} />
          </Link>

          {
            user
            ? (
                <span className="hidden-xs">
                  <Link className="topbar__tab topbar__tab--menu" activeClassName={active} to="/">Browse</Link>
                  <Link className="topbar__tab topbar__tab--menu" activeClassName="active" to={username}>You</Link>
                </span>
              )
            : null
          }

          {
            user
            ? (
                <div className="topbar__tab topbar__tab--transparent pull-right" onClick={openSidebar}>
                  <div className="sidebar-btn" ></div>
                </div>
              )
            : null
          }

          {
            !user && !isFetching
            ? (
                  <span className="topbar__tab topbar__tab--link pull-right" onClick={openLoginModal} >Log in</span>
              )
            : null
          }

          {
            !user && !isFetching
            ? (
                  <span className="topbar__tab topbar__tab--link pull-right" onClick={openCreateAccountModal} >Create an account</span>
              )
            : null
          }

          {
            !user && !isFetching
            ? (
                  <span className="topbar__tab topbar__tab--link pull-right" onClick={::this._gotoInfoLanding} >About Openframe</span>
              )
            : null
          }

          {
            selectedFrame && user
            ? (
                <div className="topbar__tab topbar__tab--transparent topbar__tab--selected-frame">
                  <SelectedFrameComponent
                    selectedFrame={selectedFrame}
                    pathname={location.pathname} />
                </div>
              )
            : null
          }

      </nav>
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

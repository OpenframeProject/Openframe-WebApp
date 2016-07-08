'use strict';

import React from 'react';

import { Link } from 'react-router'

require('styles/common/MobileSubMenu.scss');

class MobileSubMenuComponent extends React.Component {
  render() {
    return (
      <div className="mobile-sub-menu">
        <nav className="navbar navbar-default navbar-fixed-bottom visible-xs">
          <div className="container">
            <ul className="tabs-bottom">
              <li className="stream-btn"><a href="/stream">Stream</a></li>
              <li className="collection-btn bottom-active"><a href="<%= user.username %> ">Collection</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

MobileSubMenuComponent.displayName = 'CommonMobileSubMenuComponent';

// Uncomment properties you need
// MobileSubMenuComponent.propTypes = {};
// MobileSubMenuComponent.defaultProps = {};

export default MobileSubMenuComponent;

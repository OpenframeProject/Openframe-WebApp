'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom'

require('styles/common/BrowseSubMenu.scss');

class BrowseSubMenuComponent extends React.Component {
  render() {
    let { featureFlags } = this.props;
    return (
      <div className="browse-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="browse-sub-menu__wrap">
            <ul className="tabs">
              <li><NavLink to="/stream" activeClassName="active">Stream</NavLink></li>
              { featureFlags.channels
                ? <li><NavLink to="/channels" activeClassName="active">Channels</NavLink></li>
                : null
              }
              { featureFlags.collections
                ? <li><NavLink to="/collections" activeClassName="active">Collections</NavLink></li>
                : null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

BrowseSubMenuComponent.displayName = 'CommonBrowseSubMenuComponent';

// Uncomment properties you need
// BrowseSubMenuComponent.propTypes = {};
// BrowseSubMenuComponent.defaultProps = {};

export default BrowseSubMenuComponent;

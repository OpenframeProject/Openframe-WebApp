'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles/common/BrowseSubMenu.scss');

class BrowseSubMenuComponent extends React.Component {
  render() {
    let { featureFlags } = this.props;
    return (
      <div className="browse-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="browse-sub-menu__wrap">
            <ul className="tabs">
              <li><Link to="/stream" activeClassName="active">Stream</Link></li>
              { featureFlags.channels
                ? <li><Link to="/channels" activeClassName="active">Channels</Link></li>
                : null
              }
              { featureFlags.collections
                ? <li><Link to="/collections" activeClassName="active">Collections</Link></li>
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

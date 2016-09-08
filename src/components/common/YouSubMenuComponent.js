'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles/common/YouSubMenu.scss');

class YouSubMenuComponent extends React.Component {
  render() {
    let { user, currentUser, location } = this.props;
    let username = user ? user.username : '';
    let [likes, added] = [`/${username}/likes`,`/${username}/added`];

    let activeRoutes = [`/${username}`, `/${username}/added`];
    let active = activeRoutes.indexOf(location.pathname) !== -1 ? 'active' : '';

    return (
      <div className="you-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="you-sub-menu__wrap">
            <ul className="tabs">
              { user && currentUser && user.id === currentUser.id
                ? <li><Link to={likes} activeClassName="active" className="you-sub-menu__link" >Likes</Link></li>
                : null
              }
              <li><Link to={added} className={active} >Artworks</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

YouSubMenuComponent.displayName = 'CommonYouSubMenuComponent';

// Uncomment properties you need
// YouSubMenuComponent.propTypes = {};
// YouSubMenuComponent.defaultProps = {};

export default YouSubMenuComponent;

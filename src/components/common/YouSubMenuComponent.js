'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles/common/YouSubMenu.scss');

class YouSubMenuComponent extends React.Component {
  render() {
    let { user } = this.props;
    let username = user ? user.username : '';
    let [likes, added] = [`/${username}/likes`,`/${username}/added`];
    console.log(likes, added);
    return (
      <div className="you-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="you-sub-menu__wrap">
            <ul className="tabs">
              <li><Link to={likes} activeClassName="active">Likes</Link></li>
              <li><Link to={added} activeClassName="active">Added</Link></li>
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

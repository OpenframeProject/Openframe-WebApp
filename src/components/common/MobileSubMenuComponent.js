'use strict';

import React, { PropTypes } from 'react';

import { Link } from 'react-router'

require('styles/common/MobileSubMenu.scss');

let streamImg = require('../../images/icon_stream.svg');
let channelsImg = require('../../images/icon_channels.svg');
let collectionsImg = require('../../images/icon_collection.svg');
let likesImg = require('../../images/icon_likes.svg');
let youImg = require('../../images/icon_you.svg');

class MobileSubMenuComponent extends React.Component {
  render() {
    let { user, location, featureFlags } = this.props;
    let username = user ? user.username : '';
    let [likes, added] = [`/${username}/likes`,`/${username}/added`];

    let activeRoutes = [`/${username}`, `/${username}/added`];
    let active = activeRoutes.indexOf(location.pathname) !== -1 ? 'footerbar__tab footerbar__tab--active' : 'footerbar__tab';
    // TODO: Temporary, until we release channels / collections
    if (!user) {
      return null;
    }
    return (
      <nav className="footerbar">
        <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/stream">
          <div className="footerbar__tab-icon-wrap">
            <img className="footerbar__tab-icon" src={streamImg} />
          </div>
          <div className="footerbar__tab-text">
            Stream
          </div>
        </Link>
        { featureFlags.channels
          ? <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/channels">
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={channelsImg} />
              </div>
              <div className="footerbar__tab-text">
                Channels
              </div>
            </Link>
          : null
        }
        { featureFlags.collections
          ? <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/collections">
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={collectionsImg} />
              </div>
              <div className="footerbar__tab-text">
                Collect.
              </div>
            </Link>
          : null
        }
        { user
          ? (
            <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to={likes}>
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={likesImg} />
              </div>
              <div className="footerbar__tab-text">
                Likes
              </div>
            </Link>
            )
          : null
        }
        { user
          ? (
            <Link className={active} to={added}>
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={youImg} />
              </div>
              <div className="footerbar__tab-text">
                You
              </div>
            </Link>
            )
          : null
        }


      </nav>
    );
  }
}

MobileSubMenuComponent.displayName = 'CommonMobileSubMenuComponent';

// Uncomment properties you need
MobileSubMenuComponent.propTypes = {
  user: PropTypes.object
};
// MobileSubMenuComponent.defaultProps = {};

export default MobileSubMenuComponent;

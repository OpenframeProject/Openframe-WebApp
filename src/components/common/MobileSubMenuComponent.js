'use strict';

import React from 'react';
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

require('styles/common/MobileSubMenu.scss');

import streamImg from '../../images/icon_stream.svg'
import channelsImg from '../../images/icon_channels.svg'
import collectionsImg from '../../images/icon_collection.svg'
import likesImg from '../../images/icon_likes.svg'
import youImg from '../../images/icon_you.svg'

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
        <NavLink className="footerbar__tab" activeClassName="footerbar__tab--active" to="/stream">
          <div className="footerbar__tab-icon-wrap">
            <img className="footerbar__tab-icon" src={streamImg} />
          </div>
          <div className="footerbar__tab-text">
            Stream
          </div>
        </NavLink>
        { featureFlags.channels
          ? <NavLink className="footerbar__tab" activeClassName="footerbar__tab--active" to="/channels">
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={channelsImg} />
              </div>
              <div className="footerbar__tab-text">
                Channels
              </div>
            </NavLink>
          : null
        }
        { featureFlags.collections
          ? <NavLink className="footerbar__tab" activeClassName="footerbar__tab--active" to="/collections">
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={collectionsImg} />
              </div>
              <div className="footerbar__tab-text">
                Collect.
              </div>
            </NavLink>
          : null
        }
        { user
          ? (
            <NavLink className="footerbar__tab" activeClassName="footerbar__tab--active" to={likes}>
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={likesImg} />
              </div>
              <div className="footerbar__tab-text">
                Likes
              </div>
            </NavLink>
            )
          : null
        }
        { user
          ? (
            <NavLink className={active} to={added}>
              <div className="footerbar__tab-icon-wrap">
                <img className="footerbar__tab-icon" src={youImg} />
              </div>
              <div className="footerbar__tab-text">
                You
              </div>
            </NavLink>
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

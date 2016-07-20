'use strict';

import React, { PropTypes } from 'react';

import { Link } from 'react-router'

require('styles/common/MobileSubMenu.scss');

class MobileSubMenuComponent extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <nav className="footerbar">
        <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/stream">
          <img className="footerbar__tab-icon" src="" />
          <div className="footerbar__tab-text">
            Stream
          </div>
        </Link>
        <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/channels">
          <img className="footerbar__tab-icon" src="" />
          <div className="footerbar__tab-text">
            Channels
          </div>
        </Link>
        <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/collections">
          <img className="footerbar__tab-icon" src="" />
          <div className="footerbar__tab-text">
            Collect.
          </div>
        </Link>
        { user && user.current
          ? (
            <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/you/likes">
              <img className="footerbar__tab-icon" src="" />
              <div className="footerbar__tab-text">
                Likes
              </div>
            </Link>
            )
          : null
        }
        { user && user.current
          ? (
            <Link className="footerbar__tab" activeClassName="footerbar__tab--active" to="/you">
              <img className="footerbar__tab-icon" src="" />
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
  user: PropTypes.object.isRequired
};
// MobileSubMenuComponent.defaultProps = {};

export default MobileSubMenuComponent;

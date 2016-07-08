'use strict';

import React from 'react';
import SelectedFrameComponent from './SelectedFrameComponent';

require('styles//topbar/Topbar.scss');

let logo = require('../../images/of-logo.svg');

class TopbarComponent extends React.Component {
  render() {
    let {openSidebar, openLoginModal, selectedFrame, user} = this.props;
    console.log('openSidebar', openSidebar);
    console.log('openLoginModal', openLoginModal);
    return (
      <div className="topbar">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">

            <div className="navbar-header">
              <a className="navbar-brand hidden-xs" href="/">
                <img className="of-logo" alt="Openframe" src={logo} />
              </a>

              { user
                ? <h2 className="topbar__username hidden-xs">{ user.username }</h2>
                : ''
              }

            </div>

            {selectedFrame
              ? <SelectedFrameComponent selectedFrame={selectedFrame} />
              : ''
            }

            <div className="navbar-btn-item navbar-btn-item--menu navbar-right">
            { user
              ? (<div className="btn-menu" onClick={openSidebar}></div>)
              : (
                  <div>
                    <a className="navbar-menu-link" href="#create-an-account">Create an account</a>
                    <a className="navbar-menu-link" href="#login" onClick={openLoginModal} >Log in</a>
                  </div>
                )
            }
            </div>

          </div>
        </nav>
      </div>
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

'use strict';

import React from 'react';
import SelectedFrameComponent from './SelectedFrameComponent';

require('styles//topbar/Topbar.scss');

let logo = require('../../images/of-logo.svg');

class TopbarComponent extends React.Component {
  render() {
    let username = this.props.user.username || '...';
    let {openSidebar} = this.props;
    return (
      <div className="topbar">
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">

                <div className="navbar-header">
                    <a className="navbar-brand hidden-xs" href="/">
                        <img className="of-logo" alt="Openframe" src={logo} />
                    </a>
                    <h2 className="topbar__username hidden-xs">/&nbsp;{ username }</h2>
                </div>


                <SelectedFrameComponent selectedFrame={this.props.selectedFrame} />


                <div className="navbar-btn-item navbar-btn-item--menu navbar-right">
                    <div className="btn-menu" onClick={openSidebar}></div>
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

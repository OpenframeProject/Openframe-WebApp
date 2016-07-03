require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import TopbarComponent from '../components/topbar/TopbarComponent';
import SidebarComponent from '../components/sidebar/SidebarComponent';

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

  componentDidMount() {

  }

  render() {
    let {actions, frames, user, ui} = this.props;
    let selectedFrame = null;
    if (frames.items && frames.items.length && frames.selectedFrame) {
      selectedFrame = frames.items.find(f => f.id === frames.selectedFrame);
    }

    let currentUser = user.current || '...';

    return (
      <div className="index">
          <TopbarComponent
              user={currentUser}
              selectedFrame={selectedFrame}
              openSidebar={actions.openSidebar} />
          <div className="container container-centered-artwork">

              <div className="row row-navigation hidden-xs">
              <ul className="tabs">
                      <li><a href="/stream">Stream</a></li>
                <li className="active"><a href="">Collection</a></li>
            </ul>
          </div>
          <div className="row row-collection row-tile">

                  <button className="btn tile-item add-button" data-toggle="modal" data-target="#AddArtworkModal">
                      Add artwork
                  </button>
          </div>
          </div>

          <nav className="navbar navbar-default navbar-fixed-bottom visible-xs">
              <div className="container">
                  <ul className="tabs-bottom">
                      <li className="stream-btn"><a href="/stream">Stream</a></li>
                      <li className="collection-btn bottom-active"><a href="<%= user.username %> ">Collection</a></li>
                  </ul>
              </div>
          </nav>

          <div className="sidebar-wrap">
            <SidebarComponent
              user={currentUser}
              frames={frames.items}
              selectedFrame={selectedFrame}
              isOpen={ui.sidebarOpen}
              closeSidebar={actions.closeSidebar} />
          </div>

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

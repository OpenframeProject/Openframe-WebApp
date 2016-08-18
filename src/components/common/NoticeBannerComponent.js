'use strict';

import React from 'react';

require('styles/common/NoticeBanner.scss');

class NoticeBannerComponent extends React.Component {
  render() {
    const { notice } = this.props;

    return (
      <div className="notice-banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-12" dangerouslySetInnerHTML={{__html: notice}}></div>
          </div>
        </div>
      </div>
    );
  }
}

NoticeBannerComponent.displayName = 'CommonNoticeBannerComponent';

// Uncomment properties you need
// NoticeBannerComponent.propTypes = {};
// NoticeBannerComponent.defaultProps = {};

export default NoticeBannerComponent;

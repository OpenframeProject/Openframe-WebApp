'use strict';

import React from 'react';

require('styles/common/NoticeBanner.scss');

class NoticeBannerComponent extends React.Component {
  _close() {
    this.props.updateNoticeBanner(null);
  }

  render() {
    const { notice } = this.props;

    return (
      <div className="notice-banner">
        <div className="container">
          <div className="alert alert-info">
            <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
            <span dangerouslySetInnerHTML={{__html: notice}}></span>
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

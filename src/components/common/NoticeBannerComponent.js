'use strict';

import React from 'react';

require('styles/common/NoticeBanner.scss');

class NoticeBannerComponent extends React.Component {
  _close() {
    this.props.updateNoticeBanner(null);
  }

  render() {
    const { notice } = this.props;
    let noticeType = notice.type || 'info';
    let noticeClass = 'notice-banner--' + noticeType;
    return (
      <div className={'notice-banner ' + noticeClass}>
        { notice.dismissible
          &&
          <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
        }
        <span dangerouslySetInnerHTML={{__html: notice.message }}></span>
      </div>
    );
  }
}

NoticeBannerComponent.displayName = 'NoticeBannerComponent';

// Uncomment properties you need
// NoticeBannerComponent.propTypes = {};
// NoticeBannerComponent.defaultProps = {};

export default NoticeBannerComponent;

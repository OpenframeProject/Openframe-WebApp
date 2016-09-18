'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('styles/common/NoticeBanner.scss');

class NoticeBannerComponent extends React.Component {
  _close() {
    this.props.updateNoticeBanner(null);
  }

  _renderNotice() {
    console.log('rendering Notice');

    const { notice } = this.props;
    return (
      notice
      ? <div className="notice-banner">
          <div className="container">
            <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
            <span dangerouslySetInnerHTML={{__html: notice}}></span>
          </div>
        </div>
      : null
    );
  }

  render() {
    const { notice } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName="notice-banner"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}>

        {::this._renderNotice()}

      </ReactCSSTransitionGroup>
    );
  }
}

NoticeBannerComponent.displayName = 'CommonNoticeBannerComponent';

// Uncomment properties you need
// NoticeBannerComponent.propTypes = {};
// NoticeBannerComponent.defaultProps = {};

export default NoticeBannerComponent;

'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('styles/common/NoticeBanner.scss');

class NoticeBannerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: null,
      isOpen: false
    }
  }

  _close() {
    this.props.updateNoticeBanner(null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notice) {
      this.setState({
        notice: nextProps.notice,
        isOpen: true
      });
    } else {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="notice-banner"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>

        {
          this.state.isOpen
          ? <div className="notice-banner">
              <div className="container">
                <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
                <span dangerouslySetInnerHTML={{__html: this.state.notice }}></span>
              </div>
            </div>
          : null
        }

      </ReactCSSTransitionGroup>
    );
  }
}

NoticeBannerComponent.displayName = 'CommonNoticeBannerComponent';

// Uncomment properties you need
// NoticeBannerComponent.propTypes = {};
// NoticeBannerComponent.defaultProps = {};

export default NoticeBannerComponent;

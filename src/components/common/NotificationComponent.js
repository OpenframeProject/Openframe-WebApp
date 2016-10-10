'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('styles/common/Notification.scss');

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: null,
      isOpen: false
    }
  }

  _close() {
    this.props.updateNotification(null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notice) {
      this.setState({
        notice: nextProps.notice,
        isOpen: true
      });
      if (nextProps.notice.dismissible) {
        setTimeout(() => {
          this._close();
        }, 5000, this);
      }
    } else {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    let notice = this.state.notice;

    if (!notice) return null;

    let noticeType = notice.type || 'info';
    let noticeClass = 'notification--' + noticeType;
    return (
      <ReactCSSTransitionGroup
        transitionName="notification-container"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {
          this.state.isOpen
          &&
          <div className='notification-container' key='notification'>
            <div className={'notification ' + noticeClass}>
              { notice.dismissible
                &&
                <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
              }
              <span dangerouslySetInnerHTML={{__html: notice.text }}></span>
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}

NotificationComponent.displayName = 'CommonNotificationComponent';

// Uncomment properties you need
// NotificationComponent.propTypes = {};
// NotificationComponent.defaultProps = {};

export default NotificationComponent;

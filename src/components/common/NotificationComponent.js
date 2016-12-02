/**
 * UNUSED - Now using redux-notifications module
 */

'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('styles/common/Notification.scss');

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }

  _close() {
    this.props.updateNotification(null);
  }

  _addItem(notification) {
    var notifications = this.state.notifications;
    notifications.push(notification);
    this.setState({
      notifications: notifications
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notice) {
      this.setState({
        notifications: this.state.notifications.push(nextProps.notice)
      });
      if (nextProps.notice.dismissible) {
        setTimeout(() => {
          this._close();
        }, 50000, this);
      }
    } else {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    let notice = this.state.notice;

    if (!notice) {
      notice = {};
    }

    let noticeType = notice.type || 'info';
    let noticeClass = 'notification--' + noticeType;

    return (
      <ReactCSSTransitionGroup
        transitionName="notification-container"
        transitionEnterTimeout={10000}
        transitionLeaveTimeout={10000}>
        {
          this.state.isOpen
          ?
          <div className='notification-container' key={notice.text}>
            <div className={'notification ' + noticeClass}>
              { notice.dismissible
                &&
                <button type="button" className="close" aria-label="Close" onClick={::this._close}><span aria-hidden="true">&times;</span></button>
              }
              <span dangerouslySetInnerHTML={{__html: notice.text }}></span>
            </div>
          </div>
          : null
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

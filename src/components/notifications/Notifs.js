import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import Notif from './Notif';


const Notifs = (props) => {
  const {
    notifications,
    className,
    componentClassName,
    CustomComponent,
    transitionEnterTimeout,
    transitionLeaveTimeout,
  } = props;

  // This checks to see if object is immutable and properly access it
  // const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

  const renderedNotifications = notifications.map((notification) => {
    if (CustomComponent) {
      return (
        <CustomComponent
          {...props}
          componentClassName={componentClassName}
          key={notification.id}
          id={notification.id}
          message={notification.message}
          kind={notification.kind}
        />
      );
    }
    return (
      <Notif
        {...props}
        componentClassName={componentClassName}
        key={notification.id}
        id={notification.id}
        message={notification.message}
        kind={notification.kind}
      />
    );
  });
  const classes = [
    `${componentClassName}__container`,
    className,
  ].join(' ').split();

  return (
    <div className={classes} >
      <ReactCSSTransitionGroup
        transitionName={`${componentClassName}-transition`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {renderedNotifications}
      </ReactCSSTransitionGroup>
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
  notifications: [],
};

Notifs.propTypes = {
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  componentClassName: PropTypes.string,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    notifications: state.notifs
  };
}

export default connect(mapStateToProps)(Notifs);
// export default Notifs;


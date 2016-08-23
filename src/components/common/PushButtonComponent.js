'use strict';

import React, { PropTypes } from 'react';

require('styles/common/PushButton.scss');

let pushBtn = require('../../images/push.svg');

class PushButtonComponent extends React.Component {

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {

    let classes = 'push-button';
    classes += this.props.show ? ' push-button--hover' : '';

    return (
      <div className={classes} onClick={::this.handleClick} >
        <img className="push-button__img" src={pushBtn}  />
      </div>
    );
  }
}

PushButtonComponent.displayName = 'CommonPushButtonComponent';

// Uncomment properties you need
PushButtonComponent.propTypes = {
  show: PropTypes.bool
};
// PushButtonComponent.defaultProps = {};

export default PushButtonComponent;

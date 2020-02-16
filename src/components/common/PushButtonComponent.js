'use strict';

import React from 'react';
import PropTypes from 'prop-types'

require('styles/common/PushButton.scss');

import pushBtn from '../../images/icon_push.svg'

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

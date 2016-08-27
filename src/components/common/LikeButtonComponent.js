'use strict';

import React, { PropTypes } from 'react';

require('styles/common/LikeButton.scss');

let likeBtn = require('../../images/icon_heart.svg');

class LikeButtonComponent extends React.Component {

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {

    let classes = 'like-button';
    classes += this.props.show ? ' like-button--hover' : '';

    return (
      <div className={classes} onClick={::this.handleClick} >
        <img className="like-button__img" src={likeBtn}  />
      </div>
    );
  }
}

LikeButtonComponent.displayName = 'LikeButtonComponent';

// Uncomment properties you need
LikeButtonComponent.propTypes = {
  show: PropTypes.bool
};
// LikeButtonComponent.defaultProps = {};

export default LikeButtonComponent;

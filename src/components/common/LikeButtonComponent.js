'use strict';

import React, { PropTypes } from 'react';

require('styles/common/LikeButton.scss');

let likeBtn = require('../../images/icon_heart.svg');
let unlikeBtn = require('../../images/icon_heart_filled.svg');

class LikeButtonComponent extends React.Component {

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {

    let classes = 'like-button';
    classes += this.props.show ? ' like-button--hover' : '';

    return (
      <div className={classes} onClick={::this.handleClick} >
        <img className="like-button__img" src={this.props.isLiked ? unlikeBtn : likeBtn}  />
      </div>
    );
  }
}

LikeButtonComponent.displayName = 'LikeButtonComponent';

// Uncomment properties you need
LikeButtonComponent.propTypes = {
  show: PropTypes.bool,
  isLiked: PropTypes.bool
};
LikeButtonComponent.defaultProps = {
  isLiked: false
};

export default LikeButtonComponent;

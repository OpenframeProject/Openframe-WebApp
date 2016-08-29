'use strict';

import React, { PropTypes } from 'react';

require('styles/common/LikeButton.scss');

let likeBtn = require('../../images/icon_heart.svg');
let unlikeBtn = require('../../images/icon_heart_filled.svg');

class LikeButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.initialLikedState
    };
  }

  handleClick(e) {
    this.setState({
      isLiked: !this.state.isLiked
    });
    this.props.handleClick(e);
  }

  render() {

    let classes = 'like-button';
    classes += this.props.show ? ' like-button--hover' : '';

    return (
      <div className={classes} onClick={::this.handleClick} >
        <img className="like-button__img" src={this.state.isLiked ? unlikeBtn : likeBtn}  />
      </div>
    );
  }
}

LikeButtonComponent.displayName = 'LikeButtonComponent';

// Uncomment properties you need
LikeButtonComponent.propTypes = {
  show: PropTypes.bool,
  initialLikedState: PropTypes.bool
};
LikeButtonComponent.defaultProps = {
  initialLikedState: false
};

export default LikeButtonComponent;

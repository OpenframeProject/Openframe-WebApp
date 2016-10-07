'use strict';

import React, { PropTypes } from 'react';

require('styles/common/EditButton.scss');

let editBtn = require('../../images/icon_edit.svg');
let editBtnWhite = require('../../images/icon_edit_white.svg');

class EditButtonComponent extends React.Component {

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {

    let img = this.props.invert ? editBtnWhite : editBtn;

    return (
      <div className='edit-button' onClick={::this.handleClick} >
        <img className="edit-button__img" src={img}  />
      </div>
    );
  }
}

EditButtonComponent.displayName = 'CommonEditButtonComponent';

// Uncomment properties you need
EditButtonComponent.propTypes = {
  show: PropTypes.bool
};
// EditButtonComponent.defaultProps = {};

export default EditButtonComponent;

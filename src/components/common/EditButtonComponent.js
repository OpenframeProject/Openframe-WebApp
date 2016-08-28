'use strict';

import React, { PropTypes } from 'react';

require('styles/common/EditButton.scss');

let editBtn = require('../../images/icon_edit.svg');

class EditButtonComponent extends React.Component {

  handleClick(e) {
    this.props.handleClick(e);
  }

  render() {

    let classes = 'edit-button';
    classes += this.props.show ? ' edit-button--hover' : '';

    return (
      <div className={classes} onClick={::this.handleClick} >
        <img className="edit-button__img" src={editBtn}  />
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

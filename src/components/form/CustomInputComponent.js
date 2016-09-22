'use strict';

import React from 'react';

require('styles/form/CustomInput.scss');

class CustomInputComponent extends React.Component {
  focus() {
    this.refs.input.focus();
  }

  render() {
    const props = this.props;
    return (
      <div className="form-group">
        <label>{props.label}</label>
        <input {...props.input} placeholder={props.placeholder} type={props.type} disabled={props.disabled} ref="input" className="form-control"/>
        {props.touched && props.error && <span>{props.error}</span>}
      </div>
    );
  }
}

CustomInputComponent.displayName = 'FormCustomInputComponent';

// Uncomment properties you need
// CustomInputComponent.propTypes = {};
// CustomInputComponent.defaultProps = {};

export default CustomInputComponent;

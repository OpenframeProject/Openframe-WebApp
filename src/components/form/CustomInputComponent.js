'use strict';

import React from 'react';

require('styles/form/CustomInput.scss');

class CustomInputComponent extends React.Component {
  focus() {
    this.refs.input.focus();
  }

  _onChange(e) {
    const props = this.props;
    if (props.onChange) {
      props.onChange(e);
    }
    props.input.onChange(e);
  }

  _renderRaw() {
    const props = this.props;
    return <input {...props.input} onChange={::this._onChange} placeholder={props.placeholder} type={props.type} disabled={props.disabled} ref="input" className="form-control"/>;
  }

  _renderChromed() {
    const props = this.props;
    return (
      <div className="form-group">
        <label>{props.label}</label>
        <input {...props.input} {...props} ref="input" className="form-control"/>
        {props.touched && props.error && <span>{props.error}</span>}
        {props.help && <p className="fine-copy">{props.help}</p>}
      </div>
    );
  }

  render() {
    const props = this.props;
    return props.raw ? this._renderRaw() : this._renderChromed();
  }
}

CustomInputComponent.displayName = 'FormCustomInputComponent';

// Uncomment properties you need
// CustomInputComponent.propTypes = {};
// CustomInputComponent.defaultProps = {};

export default CustomInputComponent;

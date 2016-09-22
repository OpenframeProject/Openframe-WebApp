'use strict';

import React from 'react';
import Select from 'react-select';

// import 'react-select/dist/react-select.css';
// import 'react-select/scss/components.scss';

require('styles/form/CustomSelect.scss');

class CustomSelectComponent extends React.Component {
  onChange(event) {
      if (this.props.input.onChange) {
          this.props.input.onChange(event.value); // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      }
  }
  render() {
    const props = this.props; // onBlur and value was on this.props.fields.myField in MyForm
    return (
      <div className="form-group">
        <label>{props.label}</label>
        <Select.Async
          multi={true}
          clearable={false}
          {...props}
          {...props.input}
          onBlur={() => { props.input.onBlur(props.input.value) }}
           />
      </div>
    );                // options are part of other props
  }
}

CustomSelectComponent.displayName = 'FormCustomSelectComponent';

// Uncomment properties you need
// CustomSelectComponent.propTypes = {};
// CustomSelectComponent.defaultProps = {};

export default CustomSelectComponent;

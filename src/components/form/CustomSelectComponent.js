'use strict';

import React from 'react';
import Select from 'react-select';

// import 'react-select/dist/react-select.css';
// import 'react-select/scss/components.scss';

require('styles/form/CustomSelect.scss');

class CustomSelectComponent extends React.Component {
  render() {
    const {value, onBlur, ...props} = this.props; // onBlur and value was on this.props.fields.myField in MyForm
    console.log('CustomSelectComponent', value);
    return <Select.Async
      multi={true}
      value={value || ''}          // because react-select doesn't like the initial value of undefined
      onBlur={() => onBlur(value)} // just pass the current value (updated on change) on blur
      // onChange={(val, items) => onChange(items)}
      {...props} />;                // options are part of other props
  }
}

CustomSelectComponent.displayName = 'FormCustomSelectComponent';

// Uncomment properties you need
// CustomSelectComponent.propTypes = {};
// CustomSelectComponent.defaultProps = {};

export default CustomSelectComponent;

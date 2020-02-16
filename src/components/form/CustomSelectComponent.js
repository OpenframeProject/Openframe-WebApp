import React from 'react';
import Select from 'react-select';
import Async from 'react-select/async';
import Creatable from 'react-select/creatable';

// import 'react-select/dist/react-select.css';
// import 'react-select/scss/components.scss';

// require('styles/form/CustomSelect.scss');

class CustomSelectComponent extends React.Component {

  _renderCreatable() {
    const props = this.props; // onBlur and value was on this.props.fields.myField in MyForm
    return (
      <Creatable
        {...props}
        {...props.input}
        onBlur={() => { props.input.onBlur(props.input.value) }}
      />
    );
  }

  _renderSelectAsync() {
    const props = this.props; // onBlur and value was on this.props.fields.myField in MyForm
    return (
      <Async
        {...props}
        {...props.input}
        onBlur={() => { props.input.onBlur(props.input.value) }}
         />
    );
  }

  render() {
    const props = this.props; // onBlur and value was on this.props.fields.myField in MyForm
    return (
      <div className="form-group">
        <label>{props.label}</label>
        {(() => {
          switch (props.type) {
            case 'selectAsync':   return this._renderSelectAsync();
            case 'creatable': return this._renderCreatable();
            default:   return this._renderSelectAsync();
          }
        })()}
        {props.help && <p className="fine-copy">{props.help}</p>}
      </div>
    );                // options are part of other props
  }
}

CustomSelectComponent.displayName = 'FormCustomSelectComponent';

// Uncomment properties you need
// CustomSelectComponent.propTypes = {};
// CustomSelectComponent.defaultProps = {};

export default CustomSelectComponent;

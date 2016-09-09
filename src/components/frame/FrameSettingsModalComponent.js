'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';
import { debounce } from 'lodash';

// import Select from 'react-select';
// import 'react-select/dist/react-select.css';

import CustomSelectComponent from '../form/CustomSelectComponent';
import { getById } from '../../reducers/index';
import { getUserList } from '../../reducers/user/index';

import { users } from '../../sources/api';

require('styles//frame/FrameSettingsModal.scss');

class FrameSettingsModalComponent extends React.Component {
  constructor() {
    super();
    this.fetchOptions = debounce((input, callback) => {
      users.searchByUsername(input)
        .then(response => {
          let result = {
            options: response.map(user => {
              let option = {
                value: user.id,
                label: user.username
              };
              return option;
            })
          };
          callback(null, result);
        });
    }, 250);
  }
  afterOpenModal() {
    this.refs.name.focus();
  }

  closeModal() {
    this.props.close();
  }

  deleteFrame() {
    // TODO: Launch confirm modal for delete...
    console.log('Delete me!');
  }



  // fetchOptions(input) {
  //   return users.searchByUsername(input)
  //     .then(response => {
  //       return {
  //         options: response.map(user => {
  //           let option = {
  //             value: user.id,
  //             label: user.username
  //           };
  //           return option;
  //         })
  //       };
  //     });
  // }

  render() {
    let {fields: {name, managers, extensions}, handleSubmit, error, isOpen} = this.props;
    // console.log('extensions', extensions.value);
    // extensions.value = Object.keys(extensions.value).map(key => key).join(', ');
    // console.log(extensionNames);

    let errorClasses = 'row row-errors ';
    errorClasses += error ? 'show' : 'hide';

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={::this.afterOpenModal}
        onRequestClose={::this.closeModal}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >
        <div className="modal-content">
            <div className="modal-header">
                <button className="close" onClick={::this.closeModal} type=
                  "button">&times;</button>
                <h3 className="modal-title">Frame settings</h3>
            </div>
            <div className="modal-body container container-centered-form">
                <div className={errorClasses}>
                  <div className="col-md-12">
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="name">Frame name</label>
                                <input ref={name.name} type="text" className="form-control" name="name" id="Framename" placeholder="name" autoFocus={true} autoCapitalize="off" {...name} />
                            </div>
                            <div className="form-group">
                                <label className="with-fine-copy" for="Managers">Frame managers</label>
                                <p className="fine-copy">Managers will be able to push artwork to this frame</p>
                                {
                                  //<input type="text" className="form-control" name="managers" id="Managers" placeholder="add usernames separated by comma" autoCapitalize="off" {...managers}/>
                                }
                                <CustomSelectComponent
                                    {...managers}
                                    loadOptions={::this.fetchOptions}
                                />
                            </div>
                            <div className="form-group">
                                <label for="Extensions">Extensions installed in this frame</label>
                                <input type="text" className="form-control" name="extensions" id="Extensions" placeholder="no extensions" autoCapitalize="off" readOnly {...extensions}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-default">Save Changes</button>
                            </div>
                            <div className="switch-text">
                                <p><a href="#" className="red" onClick={::this.deleteFrame}>Click here</a> to delete this frame</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </Modal>
    );
  }
}

FrameSettingsModalComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'frameSettings',                           // a unique name for this form
    fields: ['name', 'managers', 'extensions'] // all the fields in your form
  },
  state => {
    let frame = getById(state.frames.byId, state.frames.settingsFrameId);
    let managerUsers = getUserList(state.user.byId, frame ? frame.managers : []);
    let managers = managerUsers.map(user => ({
      label: user.username,
      value: user.id
    }));
    let extensions = frame ? Object.keys(frame.extensions).map(key => key).join(', ') : null;
    // console.log('managers', managers);
    return { // mapStateToProps
      initialValues: {
        ...frame,
        managers,
        extensions
      }  // will pull state into form's initialValues
    }
  })(FrameSettingsModalComponent);

FrameSettingsModalComponent.displayName = 'FrameSettingsModalComponent';

// Uncomment properties you need
FrameSettingsModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// FrameSettingsModalComponent.defaultProps = {};

export default FrameSettingsModalComponent;

'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';
import { debounce } from 'lodash';

// import Select from 'react-select';
// import 'react-select/dist/react-select.css';

import CustomSelectComponent from '../form/CustomSelectComponent';
import ConfirmDialogComponent from '../common/ConfirmDialogComponent';
import { getById } from '../../reducers/index';
import { getUserList } from '../../reducers/user/index';

import { users } from '../../sources/api';

require('styles//frame/FrameSettingsModal.scss');

class FrameSettingsModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      isOpen: props.isOpen
    };
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

  // Allow opening from parent component
  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  afterOpenModal() {
    this.refs.name.focus();
  }

  closeModal() {
    this.props.resetForm();
    this.props.close();
    this.setState({
      isOpen: false,
      confirmDelete: false
    });
  }

  _handleDeleteClicked(e) {
    e.preventDefault();
    this.setState({
      confirmDelete: true,
      isOpen: false
    });
  }

  _doDelete() {
    let { deleteFrameRequest, frame } = this.props;
    deleteFrameRequest(frame.id);
    this.closeModal();
  }

  _cancelDelete() {
    this.setState({
      confirmDelete: false,
      isOpen: true
    });
  }

  _renderConfirmDelete() {
    return (
      <ConfirmDialogComponent
          isOpen={this.state.confirmDelete}
          body="Deleting a frame cannot be undone."
          title={"Are you sure?"}
          acceptText={"Delete Frame"}
          cancelText={"Cancel"}
          acceptHandler={::this._doDelete}
          cancelHandler={::this._cancelDelete}
           />
    );
  }

  render() {
    let {fields: {name, managers}, frame, handleSubmit, errorMessage, isOpen} = this.props;

    let extensions = frame ? Object.keys(frame.extensions).map(key => key) : null;

    let errorClasses = 'row row-errors ';
    errorClasses += errorMessage ? 'show' : 'hide';

    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          shouldCloseOnOverlayClick={true}
          onAfterOpen={::this.afterOpenModal}
          onRequestClose={::this.closeModal}
          className="of-modal modal-dialog"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={500}
          >
          <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <button className="close" onClick={::this.closeModal} type=
                      "button">&times;</button>
                    <h3 className="modal-title">Frame settings</h3>
                </div>
                <div className="modal-body container container-centered-form">
                    <div className={errorClasses}>
                      <div className="col-md-12">
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="name">Frame name</label>
                                    <input ref={name.name} type="text" className="form-control" name="name" id="Framename" placeholder="name" autoFocus={true} autoCapitalize="off" {...name} />
                                </div>
                                <div className="form-group">
                                    <label className="with-fFne-copy" htmlFor="Managers">Additional curators</label>
                                    <CustomSelectComponent
                                        {...managers}
                                        loadOptions={::this.fetchOptions}
                                    />
                                    <p className="fine-copy">Curators can push artwork to this frame, but not update its settings.</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Extensions">Extensions installed in this frame</label>
                                    {
                                      //<input type="text" className="form-control" name="extensions" id="Extensions" placeholder="no extensions" autoCapitalize="off" readOnly {...extensions}/>
                                    }
                                    <ul className="frame-settings-modal__extensions">
                                    {
                                      extensions && extensions.map(name => <li key={name} className="frame-settings-modal__extension">{name}</li>)
                                    }
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-default btn-fw">Save Changes</button>
                  <button className="btn btn-destructive btn-fw" onClick={::this._handleDeleteClicked}>Delete Frame</button>
                </div>
              </form>
          </div>
        </Modal>
        { ::this._renderConfirmDelete() }
      </div>
    );
  }
}

FrameSettingsModalComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'frameSettings',                           // a unique name for this form
    fields: ['name', 'managers'] // all the fields in your form
  },
  state => {
    let frame = getById(state.frames.byId, state.frames.settingsFrameId);
    let managerUsers = getUserList(state.user.byId, frame ? frame.managers : []);
    let managers = managerUsers.map(user => ({
      label: user.username,
      value: user.id
    }));
    // let extensions = frame ? Object.keys(frame.extensions).map(key => key).join(', ') : null;
    return { // mapStateToProps
      frame: frame,
      errorMessage: state.ui.frameSettingsError,
      initialValues: {
        ...frame,
        managers
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

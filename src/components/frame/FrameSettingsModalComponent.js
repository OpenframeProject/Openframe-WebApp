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

    console.log('props ----->', props);

    this.state = {
      confirmAction: false,
      body: props.isOwner
        ? 'Deleting a frame cannot be undone.'
        : 'Leaving this frame will remove it from your Frames list, and you will no longer be able to push artwork to it.',
      title: 'Are you sure?',
      acceptText: props.isOwner ? 'Delete Frame' : 'Leave Frame',
      cancelText: 'Cancel',
      acceptHandler: props.isOwner ? ::this._doDelete : ::this._doLeave,
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

  // Allow opening from parent, reset context-specific confirm dialog
  componentWillReceiveProps(nextProps) {
    this.setState({
      confirmAction: false,
      body: nextProps.isOwner
        ? 'Deleting a frame cannot be undone.'
        : 'Leaving this frame will remove it from your Frames list, and you will no longer be able to push artwork to it.',
      title: 'Are you sure?',
      acceptText: nextProps.isOwner ? 'Delete Frame' : 'Leave Frame',
      cancelText: 'Cancel',
      acceptHandler: nextProps.isOwner ? ::this._doDelete : ::this._doLeave,
      isOpen: nextProps.isOpen
    });
  }

  afterOpenModal() {
    this.refs.name.focus();
  }

  _close() {
    this.props.resetForm();
    this.setState({
      confirmAction: false
    });
    this.props.updateVisibleModal(null);
  }

  _handleConfirmableClick(e) {
    e.preventDefault();
    this.setState({
      confirmAction: true,
      isOpen: false
    });
  }

  _doDelete() {
    let { deleteFrameRequest, frame } = this.props;
    deleteFrameRequest(frame.id);
    this._close();
  }

  _doLeave() {
    let { removeFromFrameRequest, frame } = this.props;
    removeFromFrameRequest(frame.id);
    this._close();
  }

  _cancelAction() {
    this.setState({
      confirmAction: false,
      isOpen: true
    });
  }

  _renderConfirmAction() {
    return (
      <ConfirmDialogComponent
          isOpen={this.state.confirmAction}
          body={this.state.body}
          title={this.state.title}
          acceptText={this.state.acceptText}
          cancelText={this.state.cancelText}
          acceptHandler={this.state.acceptHandler}
          cancelHandler={::this._cancelAction}
           />
    );
  }

  render() {
    let {fields: {name, managers}, frame, handleSubmit, errorMessage, isOwner, owner} = this.props;

    let extensions = frame ? Object.keys(frame.extensions).map(key => key) : null;

    let errorClasses = 'row-errors ';
    errorClasses += errorMessage ? 'show' : 'hide';

    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          shouldCloseOnOverlayClick={true}
          onAfterOpen={::this.afterOpenModal}
          onRequestClose={::this._close}
          className="of-modal modal-dialog"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={500}
          >
          <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <button className="close" onClick={::this._close} type=
                      "button">&times;</button>
                    <h3 className="modal-title">Frame settings</h3>
                </div>
                <div className="modal-body">
                    <div className={errorClasses}>
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Frame name</label>
                        <input
                          ref={name.name}
                          type="text"
                          className="form-control"
                          name="name" id="Framename"
                          placeholder="name"
                          autoFocus={true}
                          autoCapitalize="off"
                          disabled={!isOwner}
                          {...name} />
                    </div>
                    { !isOwner
                      ? <div className="form-group">
                          <label htmlFor="owner">Owner</label>
                          <input
                            type="text"
                            className="form-control"
                            name="owner"
                            disabled={true}
                            value={owner.username} />
                        </div>
                      : null
                    }
                    <div className="form-group">
                        <label className="with-fFne-copy" htmlFor="Managers">Additional curators</label>
                        <CustomSelectComponent
                            {...managers}
                            disabled={!isOwner}
                            placeholder={isOwner ? 'Add by username...' : 'No additional curators'}
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
                <div className="modal-footer">
                  { isOwner
                    ? <div>
                        <button type="submit" className="btn btn-default btn-fw">Save Changes</button>
                        <button className="btn btn-destructive btn-fw" onClick={::this._handleConfirmableClick}>Delete Frame</button>
                      </div>
                    : <button className="btn btn-destructive btn-fw" onClick={::this._handleConfirmableClick}>Leave this Frame</button>
                  }
                </div>
              </form>
          </div>
        </Modal>
        { ::this._renderConfirmAction() }
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
    let managerUsers = getUserList(state.user.byId, frame && frame.managers ? frame.managers : []);
    let managers = managerUsers.map(user => ({
      label: user.username,
      value: user.id
    }));

    console.log('----->', frame && frame.ownerId, state.user.current);

    return { // mapStateToProps
      frame: frame,
      owner: frame && frame.ownerId ? getById(state.user.byId, frame.ownerId) : {},
      isOwner: frame && frame.ownerId === state.user.current,
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

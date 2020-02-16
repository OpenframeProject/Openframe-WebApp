'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form';
import { debounce } from 'lodash';

// import Select from 'react-select';
// import 'react-select/dist/react-select.css';

import CustomSelectComponent from '../form/CustomSelectComponent';
import CustomInputComponent from '../form/CustomInputComponent';
import ConfirmDialogComponent from '../common/ConfirmDialogComponent';
import { getById } from '../../reducers/index';
import { getUserList } from '../../reducers/user/index';

import { users } from '../../sources/api';

import PubSub from '../../services/pubsub';

require('styles//frame/FrameSettingsModal.scss');

class FrameSettingsModalComponent extends React.Component {
  constructor(props) {
    super(props);

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
          callback(response.map(user => {
            let option = {
              value: user.id,
              label: user.username
            };
            return option;
          }));
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
    // this.refs.frameName.getRenderedComponent().focus();
  }

  _close() {
    this.props.reset();
    this.setState({
      confirmAction: false
    });
    this.props.updateVisibleModal(null);
  }

  _onExtensionBlur(e) {
    console.log(e.target.value);
    let { frame } = this.props;
    PubSub.publish(`/frame/${frame.id}/install_extension`, {
      extension: e.target.value
    });
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
    deleteFrameRequest(frame);
    this._close();
  }

  _doLeave() {
    let { removeFromFrameRequest, frame } = this.props;
    removeFromFrameRequest(frame);
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
    let {frame, handleSubmit, errorMessage, isOwner, owner} = this.props;

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

                    {!isOwner && <div className="alert alert-info">You are a curator for this frame.</div>}

                    <Field
                      autoFocus
                      ref="frameName"
                      name="name"
                      component={CustomInputComponent}
                      type="text"
                      placeholder="name"
                      label="Name"
                      disabled={!isOwner} />

                    { /* Sitting outside redux-form */ }
                    { !isOwner
                      ? <div className="form-group">
                          <label>Owner</label>
                          <input
                            type="text"
                            className="form-control"
                            name="owner"
                            disabled={true}
                            value={owner.username} />
                        </div>
                      : null
                    }

                    <Field
                      name="managers"
                      component={CustomSelectComponent}
                      label="Additional curators"
                      placeholder={isOwner ? 'Add by username...' : 'No additional curators'}
                      help="Curators can push art to this frame, but can't modify settings."
                      disabled={!isOwner}
                      isMulti
                      isClearable={false}
                      selectAsync
                      loadOptions={::this.fetchOptions} />

                    <div className="form-group">
                        <label>Extensions installed in this frame</label>
                        <ul className="frame-settings-modal__extensions">
                        {
                          extensions && extensions.map(name => <li key={name} className="frame-settings-modal__extension">{name}</li>)
                        }
                        </ul>
                    </div>
                    {/*
                    <Field
                      name="extension"
                      component={CustomInputComponent}
                      type="text"
                      placeholder="add extension"
                      label="Add Extension"
                      disabled={!isOwner}
                      onBlur={::this._onExtensionBlur} />
                    */}
                  </div>
                <div className="modal-footer">
                  { isOwner
                    ? <div>
                        <button type="submit" className="btn btn-default btn-fw">Save Changes</button>
                        <button className="btn btn-destructive btn-fw" onClick={::this._handleConfirmableClick}>Delete Frame</button>
                      </div>
                    : <button className="btn btn-destructive btn-fw" onClick={::this._handleConfirmableClick}>Leave Frame</button>
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

FrameSettingsModalComponent = reduxForm({
    form: 'frameSettings'
  })(FrameSettingsModalComponent);

FrameSettingsModalComponent = connect(
  state => {
    let frame = getById(state.frames.byId, state.frames.settingsFrameId);
    let managerUsers = getUserList(state.user.byId, frame && frame.managers ? frame.managers : []);
    let managers = managerUsers.map(user => ({
      label: user.username,
      value: user.id
    }));

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
  }
)(FrameSettingsModalComponent);

FrameSettingsModalComponent.displayName = 'FrameSettingsModalComponent';

// Uncomment properties you need
FrameSettingsModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// FrameSettingsModalComponent.defaultProps = {};

export default FrameSettingsModalComponent;

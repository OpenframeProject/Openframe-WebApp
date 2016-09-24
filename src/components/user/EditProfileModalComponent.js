'use strict';

import React from 'react';
import Modal from 'react-modal';

import EditProfileFormComponent from './EditProfileFormComponent';
import StandardModalComponent from '../common/StandardModalComponent';

require('styles/user/EditProfileModal.scss');

class EditProfileModalComponent extends React.Component {
  _close() {
    this.props.updateVisibleModal(null);
  }

  render() {
    const { isOpen, modalError, onSubmit, updateVisibleModal } = this.props;

    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={100}
        >

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this._close} type=
            "button">&times;</button>
            <h3 className="modal-title">Edit Profile</h3>
          </div>
          <div className="modal-body">
            <div className={errorClasses}>
              <div className="alert alert-danger" role="alert">
                {modalError}
              </div>
            </div>

              <EditProfileFormComponent
                onSubmit={onSubmit}
                updateVisibleModal={updateVisibleModal}
                submitText="Save Profile"
                ref="form" />

          </div>
        </div>

      </Modal>
    );
  }
}

EditProfileModalComponent.displayName = 'EditProfileModalComponent';

// Uncomment properties you need
// EditProfileModalComponent.propTypes = {};
// EditProfileModalComponent.defaultProps = {};

export default EditProfileModalComponent;

'use strict';

import React from 'react';
import Modal from 'react-modal';

import EditArtworkFormComponent from './EditArtworkFormComponent';

require('styles/artwork/AddArtworkModal.scss');

class AddArtworkModalComponent extends React.Component {
  _close() {
    this.props.updateVisibleModal(null);
  }

  render() {
    const { isOpen, modalError, onSubmit } = this.props;

    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this._close} type=
            "button">&times;</button>
            <h3 className="modal-title">Add Artwork</h3>
          </div>
          <div className="modal-body">
            <div className={errorClasses}>
              <div className="alert alert-danger" role="alert">
                {modalError}
              </div>
            </div>

            <EditArtworkFormComponent
              onSubmit={onSubmit}
              submitText="Add Artwork"
              ref="form" />
          </div>
        </div>

      </Modal>
    );
  }
}

AddArtworkModalComponent.displayName = 'ArtworkAddArtworkModalComponent';

// Uncomment properties you need
// AddArtworkModalComponent.propTypes = {};
// AddArtworkModalComponent.defaultProps = {};

export default AddArtworkModalComponent;

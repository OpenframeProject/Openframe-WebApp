'use strict';

import React from 'react';
import Modal from 'react-modal';

import EditArtworkFormComponent from './EditArtworkFormComponent';
import ConfirmDialogComponent from '../common/ConfirmDialogComponent';

require('styles/artwork/AddArtworkModal.scss');

class EditArtworkModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmAction: false
    };
  }

  _close() {
    this.props.updateVisibleModal(null);
  }

  _handleDeleteClick(e) {
    e.preventDefault();
    this.setState({
      confirmAction: true
    });
  }

  _doDelete() {
    let { deleteArtworkRequest, artwork } = this.props;
    deleteArtworkRequest(artwork);
    this._close();
  }

  _cancelAction() {
    this.setState({
      confirmAction: false
    });
  }

  _renderConfirmAction() {
    return (
      <ConfirmDialogComponent
        isOpen={this.state.confirmAction}
        title="Are you sure?"
        body="Deleting this artwork cannot be undone."
        acceptText="Delete Artwork"
        cancelText="Cancel"
        acceptHandler={::this._doDelete}
        cancelHandler={::this._cancelAction} />
    );
  }

  render() {
    const { modalError, onSubmit, title, submitText, clear } = this.props;

    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';
    return (
      <div>
        <Modal
          isOpen={!this.state.confirmAction}
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
              <h3 className="modal-title">{title}</h3>
            </div>
            <div className="modal-body">
              <div className={errorClasses}>
                <div className="alert alert-danger" role="alert">
                  {modalError && modalError.message}
                </div>
              </div>

              <EditArtworkFormComponent
                onSubmit={onSubmit}
                submitText={submitText}
                handleDelete={::this._handleDeleteClick}
                clear={clear}
                ref="form" />
            </div>
          </div>

        </Modal>
        { ::this._renderConfirmAction() }
      </div>
    );
  }
}

EditArtworkModalComponent.displayName = 'ArtworkEditArtworkModalComponent';

// Uncomment properties you need
// EditArtworkModalComponent.propTypes = {};
// EditArtworkModalComponent.defaultProps = {};

export default EditArtworkModalComponent;

'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';

require('styles/common/ConfirmDialog.scss');

class ConfirmDialogComponent extends React.Component {
  doAccept() {
    console.log('Accepted');
    const { acceptAction, hideConfirmDialog } = this.props;
    if (acceptAction) {
      hideConfirmDialog(acceptAction);
    }
  }

  doCancel() {
    console.log('Cancel');
    const { cancelAction, hideConfirmDialog } = this.props;
    hideConfirmDialog(cancelAction || null);
  }

  afterOpenModal() {
    console.log('afterOpenModal');
  }

  closeModal() {
    console.log('closeModal');
  }

  render() {
    const { isOpen, title, body, acceptText, cancelText } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={::this.afterOpenModal}
        onRequestClose={::this.closeModal}
        className="of-confirm-dialog modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{ title }</h3>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                { body }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default btn-fw" onClick={ ::this.doAccept }>{ acceptText }</button>
            <button className="btn btn-secondary btn-fw" onClick={ ::this.doCancel }>{ cancelText }</button>
          </div>
        </div>

      </Modal>
    );
  }
}

ConfirmDialogComponent.displayName = 'CommonConfirmDialogComponent';

// Uncomment properties you need
ConfirmDialogComponent.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  acceptText: PropTypes.string,
  cancelText: PropTypes.string,
  acceptAction: PropTypes.object.isRequired,
  cancelAction: PropTypes.object
};
// ConfirmDialogComponent.defaultProps = {};

export default ConfirmDialogComponent;

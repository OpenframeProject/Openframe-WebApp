'use strict';

import React from 'react';
import Modal from 'react-modal';

require('styles/common/CreateAccountNotice.scss');

class CreateAccountNoticeComponent extends React.Component {
  _close() {
    this.props.updateVisibleModal(null);
  }

  render() {
    const { updateVisibleModal } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog create-account-notice"
        overlayClassName="modal-backdrop create-account-notice-backdrop"
        closeTimeoutMS={300}
        >

        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={::this._close} type=
            "button">&times;</button>
            <h3 className="modal-title">Create an account</h3>
          </div>
          <div className="modal-body">
            <p className="create-account-notice__copy">Create an account to collect artwork, add artwork to the public stream, and push artwork to a frame.</p>

            <ul className="create-account-notice__links">
              <li><a href="" onClick={(e) => { e.preventDefault(); updateVisibleModal('create-account'); } }> Create an account </a></li>
              <li><a href="http://docs.openframe.io/frame-setup-guide" target="_blank">Learn how to set up a frame</a></li>
            </ul>
          </div>
        </div>

      </Modal>
    );
  }
}

CreateAccountNoticeComponent.displayName = 'CommonCreateAccountNoticeComponent';

// Uncomment properties you need
// CreateAccountNoticeComponent.propTypes = {};
// CreateAccountNoticeComponent.defaultProps = {};

export default CreateAccountNoticeComponent;

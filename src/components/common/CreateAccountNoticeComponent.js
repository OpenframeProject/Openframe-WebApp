'use strict';

import React from 'react';
import Modal from 'react-modal';

require('styles/common/CreateAccountNotice.scss');

class CreateAccountNoticeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    }
  }

  // Allow opening from parent component
  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  _close() {
    this.setState({
      isOpen: false
    });
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  _openCreateAccountModal(e) {
    e.preventDefault();
    this.props.openCreateAccountModal();
    this._close();
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this._close}
        className="of-modal modal-dialog create-account-notice"
        overlayClassName="modal-backdrop"
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
              <li><a href="#" onClick={::this._openCreateAccountModal}> Create an account </a></li>
              <li><a href="https://github.com/OpenframeProject/Openframe/wiki/Openframe-User-Guide" target="_blank">Learn how to set up a frame</a></li>
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

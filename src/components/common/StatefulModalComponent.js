'use strict';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';

require('styles/common/StatefulModal.scss');

class StatefulModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.initialOpenState
    };
  }

  componentDidUpdate() {
    let modal = this.refs['modal-instance'].node;
    console.log('componentDidUpdate', modal);
    // let overlay = modal.getElementsByClassName('ReactModal__Overlay')[0];
    // overlay.scrollTop = 0;
  }

  closeModal() {
  }

  onRequestClose() {
    document.body.style.maxWidth = 'none'
    document.body.style.height   = '100%'
    document.body.style.overflow = 'auto'

    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }

    this.setState({isOpen: false});
    setTimeout(() => {
      browserHistory.push(this.props.returnTo);
    }, 250);
  }

  onAfterOpen() {
    document.body.style.maxWidth = document.body.clientWidth + 'px'
    document.body.style.height   = '100%'
    document.body.style.overflow = 'hidden'

    if (this.props.onAfterOpen) {
      this.props.onAfterOpen()
    }
  }

  render() {
    let { showHeader, allowClose, title } = this.props;
    let { isOpen } = this.state;
    // true unless explicitly false
    showHeader = showHeader === false ? false : true;
    allowClose = allowClose === false ? false : true;
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this.onRequestClose}
        onAfterOpen={::this.onAfterOpen}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        ref="modal-instance"
        >
        <div className="modal-content">
          { showHeader
            ? <div className="modal-header">
                { allowClose
                  ? <button className="close" onClick={::this.closeModal} type="button">&times;</button>
                  : null
                }
                <h3 className="modal-title">{title}</h3>
              </div>
            : null
          }
          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  }
}

StatefulModalComponent.displayName = 'CommonStatefulModalComponent';

// Uncomment properties you need
StatefulModalComponent.propTypes = {
  returnTo: PropTypes.string.isRequired
};
// StatefulModalComponent.defaultProps = {};

export default StatefulModalComponent;

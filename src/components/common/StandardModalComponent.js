'use strict';

import React, { PropTypes, createElement, cloneElement } from 'react';
import Modal from 'react-modal';

import ConfirmDialogComponent from './ConfirmDialogComponent';

require('styles/common/StandardModal.scss');
/**
 * USAGE
 *
 *  let userActions = [
 *    {
 *      text: 'Do it',
 *      className: 'btn-default',
 *      onClick: ::this._handleStandardDoIt,
 *      confirmConfig: {
 *        body: 'Srsly tho?',
 *        title: 'Are you sure?',
 *        acceptText: 'Alright, do it.',
 *        cancelText: 'No, no!'
 *      }
 *    }
 *  ];
 *  let body = (
 *    <div>
 *      <p className="create-account-notice__copy">Create an account to collect artwork, add artwork to the public stream, and push artwork to a frame.</p>
 *      <ul className="create-account-notice__links">
 *        <li><a href="" onClick={(e) => { e.preventDefault(); this.props.actions.updateVisibleModal('create-account'); } }> Create an account </a></li>
 *        <li><a href="https://github.com/OpenframeProject/Openframe/wiki/Openframe-User-Guide" target="_blank">Learn how to set up a frame</a></li>
 *      </ul>
 *    </div>
 *  );
 *  return <StandardModalComponent
 *    isOpen={true}
 *    title="Standard Modal"
 *    subTitle="Just a modal, you know?"
 *    body={body} />
 */
class StandardModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      isConfirmOpen: false,
      confirmConfig: null
    }
  }

  componentWillMount() {
    console.log('componentWillMount', this.props.body);
  }

  /**
   * Get a reference to the body component instance
   * @return {object}
   */
  getBodyComponent() {
    if (this.refs.body) {
      return this.refs.body;
    }
  }

  _close() {
    this.setState({
      isOpen: false,
      isConfirmOpen: false
    });
    // this.props.updateVisibleModal(null);
  }

  _confirmAction(action) {
    action.confirmConfig.acceptHandler = action.confirmConfig.acceptHandler || action.onClick;
    return function() {
      this.setState({
        confirmConfig: action.confirmConfig,
        isConfirmOpen: true,
        isOpen: false
      });
    }.bind(this);
  }

  _cancelAction() {
    this.setState({
      isConfirmOpen: false,
      isOpen: true
    });
  }

  _renderConfirmAction() {
    return <ConfirmDialogComponent
        {...this.state.confirmConfig}
        isOpen={true}
        cancelHandler={::this._cancelAction} />;
  }

  _renderUserAction(action) {
    let className = action.className;
    let onClick = action.confirmConfig ? ::this._confirmAction(action) : action.onClick;

    return (
      <button
        key={action.text}
        type="submit"
        className={'btn btn-fw ' + className}
        onClick={onClick}
      >
        {action.text}
      </button>
    );
  }

  render() {
    let { allowClose, title, subTitle, body, modalError, userActions } = this.props;

    console.log('body', typeof body, body);

    let bodyProps = this.props.bodyProps || {};

    if (typeof body === 'object') {
      body = cloneElement(body, {
        ...bodyProps,
        ref: 'body'
      });
    }

    if (typeof body === 'function') {
      body = createElement(body, {
        ...bodyProps,
        ref: 'body'
      });
    }

    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
          onAfterOpen={this.props.onAfterOpen}
          onRequestClose={::this._close}
          className={'of-modal modal-dialog ' + this.props.modalClassName || ''}
          overlayClassName={'modal-backdrop ' + this.props.overlayClassName || ''}
          closeTimeoutMS={500}
          >
            <div className="modal-content">

              <div className="modal-header">
                { allowClose && <button className="close" onClick={::this._close} type="button">&times;</button> }
                { title && <h3 className="modal-title">{title}</h3> }
                { subTitle && <p className="modal-subtitle">{subTitle}</p> }
              </div>

              <div className="modal-body">
                {
                  modalError
                  &&
                  <div className="error">
                    <div className="alert alert-danger" role="alert">
                      { modalError }
                    </div>
                  </div>
                }
                {body}
              </div>

              <div className="modal-footer">
                { userActions && userActions.map(action => ::this._renderUserAction(action)) }
              </div>
            </div>
        </Modal>
        { this.state.isConfirmOpen && ::this._renderConfirmAction() }
      </div>
    );
  }
}

StandardModalComponent.displayName = 'CommonStandardModalComponent';

// Uncomment properties you need
StandardModalComponent.propTypes = {
  allowClose: PropTypes.bool.isRequired,
  body: PropTypes.object.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  modalError: PropTypes.string,
  userActions: PropTypes.array
};
StandardModalComponent.defaultProps = {
  allowClose: true
};

export default StandardModalComponent;

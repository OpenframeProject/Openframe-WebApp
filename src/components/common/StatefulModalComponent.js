import React from 'react';
import history from '../../services/history'
import PropTypes from 'prop-types'
import Modal from 'react-modal';

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
  }

  closeModal() {
    this.onRequestClose();
  }

  onRequestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }

    this.setState({isOpen: false});
    setTimeout(() => {
      history.push(this.props.returnTo)
    }, 250);
  }

  onAfterOpen() {
    if (this.props.onAfterOpen) {
      this.props.onAfterOpen()
    }
  }

  render() {
    let { showHeader, allowClose, title, extraClasses} = this.props;
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
        className={`of-modal modal-dialog stateful-modal ${extraClasses}`}
        overlayClassName="modal-backdrop stateful-modal-backdrop"
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
            { allowClose
              ? <button className="close" onClick={::this.closeModal} type="button">&times;</button>
              : null
            }
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

import React from 'react';
import history from '../../services/history'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import ArtworkDetailContainer from '../../containers/ArtworkDetailContainer';

require('styles/common/StatefulModal.scss');

class ArtworkDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isOpen: props.initialOpenState
      isOpen: true
    };
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', 'ArtworkDetailModal!!!!!!');
    // let modal = this.refs['modal-instance'].node;
  }

  closeModal() {
    this.onRequestClose();
  }

  onRequestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }

    console.log('onRequestClose', this.props.returnTo)

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
    let { showHeader, allowClose, params, returnTo } = this.props;
    const { isOpen } = this.state;

    // true unless explicitly false
    showHeader = showHeader === false ? false : true;
    allowClose = allowClose === false ? false : true;


    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={::this.onRequestClose}
        onAfterOpen={::this.onAfterOpen}
        className="of-modal modal-dialog artwork-detail-modal"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        ref="modal-instance"
        >
        <div className="modal-content">
          <div className="modal-body">
            { allowClose && (
                <button className="close" onClick={::this.closeModal} type="button">
                  &times;
                </button>
              )}
            <ArtworkDetailContainer params={params} returnTo={returnTo} />
          </div>
        </div>
      </Modal>
    );
  }
}

ArtworkDetailModal.displayName = 'CommonArtworkDetailModal';

// Uncomment properties you need
ArtworkDetailModal.propTypes = {
  returnTo: PropTypes.string.isRequired
};
// ArtworkDetailModal.defaultProps = {};

export default ArtworkDetailModal;

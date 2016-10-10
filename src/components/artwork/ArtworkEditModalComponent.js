'use strict';

import React from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';

require('styles/artwork/ArtworkEditModal.scss');

class ArtworkEditModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmAction: false
    };
  }

  afterOpenModal() {
    this.refs.username.focus();
  }

  closeModal() {
    this.props.closeArtworkEditModal();
  }

  _doDelete() {

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
    return (
      <div>
        <Modal
          isOpen={!this.state.confirmAction}
          shouldCloseOnOverlayClick={true}
          onAfterOpen={::this.afterOpenModal}
          onRequestClose={::this.closeModal}
          className="of-modal modal-dialog"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={500}
          >

          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={::this.closeModal} type=
              "button">&times;</button>
              <h3 className="modal-title">Log In</h3>
            </div>
              <div className="modal-body container container-centered-form">
                  <div className="row row-errors hide">
                      <div className="col-md-12">
                          <div className="alert alert-danger" role="alert">

                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <form id="EditForm">
                              <div className="form-group">
                                  <label htmlFor="Author">Author</label>
                                  <input type="text" className="form-control" name="author_name" id="Author" placeholder="Author" autocapitalize="off" autofocus />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="Title">Artwork title</label>
                                  <input type="text" className="form-control" name="title" id="Title" placeholder="Title" autocapitalize="off" />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="Format">Artwork format</label>
                                  <select className="form-control" name="format" id="FormatSelect">
                                      <option value="openframe-image">Image (jpeg, png)</option>
                                      <option value="openframe-website">Website</option>
                                      <option value="openframe-glslviewer">Shader</option>
                                      <option value="openframe-video">Video (mp4)</option>
                                      <option value="other">Other</option>
                                  </select>
                              </div>

                              <div className="form-group format-other-wrap hide">
                                  <label htmlFor="FormatOther">Specify format (name of the extension's NPM package)</label>
                                  <input type="text" className="form-control" name="format_other" id="FormatOther" placeholder="Other format..." autocapitalize="off" />
                              </div>

                              <div className="form-group aspect-mode-wrap hide">
                                  <label htmlFor="AspectMode">Select artwork display mode</label>
                                  <select className="form-control" name="aspect_mode" id="AspectMode">
                                      <option value="fill">fill (default)</option>
                                      <option value="fit">fit</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="url">URL where the artwork is hosted</label>
                                  <input type="text" className="form-control" name="url" id="URL" autocapitalize="off" placeholder="http://server.com/here.jpg" />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="thumb_url">URL of a preview image</label>
                                  <input type="text" className="form-control" name="thumb_url" id="ThumbURL" autocapitalize="off" placeholder="http://server.com/thumbnail.jpg" />
                              </div>
                              <div className="form-group">
                                  <label className="radio-inline"><input type="radio" name="is_public" value="false" />Keep private</label>
                                  <label className="radio-inline"><input type="radio" name="is_public" value="true" />Publish to Stream</label>
                              </div>
                              <div className="form-group">
                                  <button id="EditButton" href="#" className="btn btn-default">Save changes</button>
                              </div>
                              <div className="switch-text">
                                  <p><a href="#" >Click here</a> to delete this artwork</p>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </Modal>
        { ::this._renderConfirmAction() }
      </div>
    );
  }
}

ArtworkEditModalComponent = reduxForm({   // <----- THIS IS THE IMPORTANT PART!
  form: 'artworkEdit',                    // a unique name for this form
  fields: ['username', 'password']  // all the fields in your form
})(ArtworkEditModalComponent);

ArtworkEditModalComponent.displayName = 'ArtworkArtworkEditModalComponent';

// Uncomment properties you need
// ArtworkEditModalComponent.propTypes = {};
// ArtworkEditModalComponent.defaultProps = {};

export default ArtworkEditModalComponent;

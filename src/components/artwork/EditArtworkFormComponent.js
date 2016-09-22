'use strict';

import React from 'react';
import {reduxForm} from 'redux-form';
import { Creatable } from 'react-select';

import { getCurrentUser } from '../../reducers/user/index';
import { getById } from '../../reducers/index';

require('styles/artwork/EditArtworkForm.scss');

class EditArtworkFormComponent extends React.Component {
  componentWillMount() {
    this.options = [
        { value: 'openframe-image', label: 'Image (jpeg, png)' },
        { value: 'openframe-website', label: 'Website' },
        { value: 'openframe-glslviewer', label: 'Shader' },
        { value: 'openframe-video', label: 'Video (mp4)' }
    ];
  }

  _handleConfirmableClick(e) {
    e.preventDefault();
  }

  render() {
    const {
      fields: {
      author_name,
      title,
      description,
      format,
      url,
      thumb_url
      }, handleSubmit, submitText, currentUser, artwork } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Author">Author</label>
            <label className="checkbox"><input type="checkbox" checked />Is Me</label>
            <input type="text" className="form-control" name="author_name" id="Author" placeholder="Author" autoCapitalize="off" {...author_name} />
        </div>
        <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input type="text" className="form-control" name="title" id="Title" placeholder="Title" autoCapitalize="off" {...title}/>
        </div>
        <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" value="true" name="title" id="Title" placeholder="Title" autoCapitalize="off" {...description}/>
        </div>

        <div className="form-group">
            <label htmlFor="Format">Artwork format</label>

            <Creatable
                {...format}
                name='format'
                placeholder='Format...'
                options={this.options}
            />
        </div>

        <div className="form-group">
            <label htmlFor="url">URL where the artwork is hosted</label>
            <input type="text" className="form-control" autoCapitalize="off" placeholder="https://..." {...url} />
        </div>

        <div className="form-group">
            <label htmlFor="thumb_url">URL of a preview image</label>
            <input type="text" className="form-control" autoCapitalize="off" placeholder="https://..." {...thumb_url} />
        </div>
        <div className="form-group">
            <label className="radio-inline"><input type="radio" name="is_public" value="false" checked/>Keep private</label>
            <label className="radio-inline"><input type="radio" name="is_public" value="true" />Publish to Stream</label>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-default btn-fw">{submitText}</button>
            { artwork
              ? <button className="btn btn-destructive btn-fw" onClick={::this._handleConfirmableClick}>Delete Artwork</button>
              : null
            }
        </div>
    </form>
    );
  }
}


EditArtworkFormComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'profile',                           // a unique name for this form
    fields: [
      'author_name',
      'title',
      'description',
      'format',
      'url',
      'thumb_url'
    ] // all the fields in your form
  },
  state => {
    let currentUser = getCurrentUser(state.user);
    return { // mapStateToProps
      initialValues: {
        ...getById(state.artwork.byId, state.artwork.editingId),
        author_name: currentUser ? currentUser.full_name : null
      },
      currentUser: getCurrentUser(state.user),
      artwork: getById(state.artwork.byId, state.artwork.editingId)
    };
  })(EditArtworkFormComponent);


EditArtworkFormComponent.displayName = 'ArtworkEditArtworkFormComponent';

// Uncomment properties you need
// EditArtworkFormComponent.propTypes = {};
// EditArtworkFormComponent.defaultProps = {};

export default EditArtworkFormComponent;

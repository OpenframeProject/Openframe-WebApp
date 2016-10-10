'use strict';

import React from 'react';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { connect } from 'react-redux';

import CustomInputComponent from '../form/CustomInputComponent';
import CustomSelectComponent from '../form/CustomSelectComponent';
import { getCurrentUser } from '../../reducers/user/index';
import { getById } from '../../reducers/index';
import { find } from 'lodash';

require('styles/artwork/EditArtworkForm.scss');

const defaultFormatOptions = [
    { value: 'openframe-image', label: 'Image (jpeg, png)' },
    { value: 'openframe-website', label: 'Website' },
    { value: 'openframe-glslviewer', label: 'Shader' },
    { value: 'openframe-video', label: 'Video (mp4)' }
];

class EditArtworkFormComponent extends React.Component {
  componentWillMount() {
    this.options = [].concat(defaultFormatOptions);
    // if an existing unsupported format is present , add it to the options
    if (!find(defaultFormatOptions, { value: this.props.format.value })) {
      this.options.unshift(this.props.format);
    }
    this.prevAuthorName = '';
  }

  componentDidMount() {
    setTimeout(function() {
      this.refs.title.getRenderedComponent().focus();
    }.bind(this), 0);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.is_author) {
    //   // this.refs.authorName.onChange(currentUser.full_name);
    //   let name = (nextProps.currentUser && nextProps.currentUser.full_name) || nextProps.currentUser.username;
    //   console.log('Attempting to set the author name', name);
    //   this.refs.authorName.getRenderedComponent().props.input.onChange(name);
    // }
  }

  _handleConfirmableClick(e) {
    e.preventDefault();
  }

  _authorNameOnChange(e) {
    this.prevAuthorName = e.target.value;
  }

  _isAuthorOnChange(e) {
    const { currentUser } = this.props;
    if (e.target.checked) {
      // this.refs.authorName.onChange(currentUser.full_name);
      this.refs.authorName.getRenderedComponent().props.input.onChange(currentUser.full_name || currentUser.username);
    } else {
      this.refs.authorName.getRenderedComponent().props.input.onChange(this.prevAuthorName);
      this.refs.isPublic.getRenderedComponent().props.input.onChange("false");
      setTimeout(function() {
        this.refs.authorName.getRenderedComponent().focus();
      }.bind(this), 0);
    }
  }

  render() {
    const { handleSubmit, handleDelete, is_author, submitText, artwork } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Author</label>
          <div>
            <label className="checkbox-inline"><Field withRef ref="isAuthor" name="is_author" component={CustomInputComponent} type="checkbox" raw onChange={::this._isAuthorOnChange} />I am the author of this work</label>
            <Field withRef ref="authorName" name="author_name" component={CustomInputComponent} type="text" placeholder="Author" raw disabled={is_author} onChange={::this._authorNameOnChange} />
          </div>
        </div>

        <Field withRef ref="title" name="title" component={CustomInputComponent} type="text" placeholder="Title" label="Title" />

        <Field name="description" component={CustomInputComponent} type="text" placeholder="description" label="Description" />

        <div className="form-group">

            <Field
              name="format"
              component={CustomSelectComponent}
              type="creatable"
              label="Artwork format"
              placeholder="format"
              help="Select a format or enter the name of the npm package for a format extension, e.g. 'openframe-of'"
              options={this.options} />

        </div>

        <Field name="url" component={CustomInputComponent} type="text" placeholder="https://" label="URL where the artwork is hosted" />

        <Field name="thumb_url" component={CustomInputComponent} type="text" placeholder="https://" label="URL of a preview image" />

        <div className="form-group">
          <label className="radio-inline"><Field withRef ref="isPublic" name="is_public" component={CustomInputComponent} type="radio" value="false" raw disabled={!is_author} /> Keep private</label>
          <label className="radio-inline"><Field name="is_public" component={CustomInputComponent} type="radio" value="true" raw disabled={!is_author} /> Publish to Stream</label>
          <p className="fine-copy">Only works that are your own can be published to the stream.</p>

        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-default btn-fw">{submitText}</button>
        </div>
        { artwork
          &&
          <div className="form-group">
            <button className="btn btn-destructive btn-fw" onClick={handleDelete}>Delete Artwork</button>
          </div>

        }
    </form>
    );
  }
}


EditArtworkFormComponent = reduxForm({
  form: 'profile'
})(EditArtworkFormComponent);

const selector = formValueSelector('profile');
EditArtworkFormComponent = connect(
  (state, ownProps) => {
    let currentUser = getCurrentUser(state.user);
    let artwork = ownProps.clear ? null : getById(state.artwork.byId, state.artwork.editingArtworkId);
    let formatValue = artwork && artwork.format || 'openframe-image';
    let formatOpt = find(defaultFormatOptions, { value: formatValue });
    let formatLabel = formatOpt ? formatOpt.label : formatValue;

    let initialValues = ownProps.clear
    ? {
        author_name: currentUser ? currentUser.full_name : null,
        is_author: artwork && artwork.is_public || true,
        is_public: artwork && artwork.is_public ? 'true' : 'false'
      }
    : {
        author_name: currentUser ? currentUser.full_name : null,
        is_author: artwork && artwork.is_public,
        ...artwork,
        format: {
          value: formatValue,
          label: formatLabel
        },
        is_public: artwork && artwork.is_public ? 'true' : 'false'
    };

    return { // mapStateToProps
      initialValues: initialValues,
      is_author: selector(state, 'is_author'),
      currentUser: getCurrentUser(state.user),
      artwork: artwork,
      format: {
        value: formatValue,
        label: formatLabel
      }
    };
  }
)(EditArtworkFormComponent);


EditArtworkFormComponent.displayName = 'ArtworkEditArtworkFormComponent';

// Uncomment properties you need
// EditArtworkFormComponent.propTypes = {};
// EditArtworkFormComponent.defaultProps = {};

export default EditArtworkFormComponent;

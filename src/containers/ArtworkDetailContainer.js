import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getById } from '../reducers/index';

require('styles/artwork/ArtworkDetail.scss');

class ArtworkDetailContainer extends Component {
  componentDidMount() {
    const {actions, params} = this.props;
    actions.fetchSingleArtworkRequest(params.artworkId);
  }

  render() {
    const {artwork, params} = this.props;
    let singleArtwork = getById(artwork.byId, params.artworkId);
    if (!singleArtwork) {
      // artwork wasn't present, fetch it...
      return (<div>ART NOT FOUND</div>);
    }
    return (
      <div className="artwork-detail">
        <div className="row">
          <div className="col-md-8">
            <div className="artwork-detail__image-wrap">
              <img className="artwork-detail__img" src={singleArtwork.thumb_url} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="artwork-detail__info">
              <div className="artwork-detail__label">Author</div>
              <div className="artwork-detail__author">{singleArtwork.author_name}</div>

              <div className="artwork-detail__label">Title</div>
              <div className="artwork-detail__title">{singleArtwork.title}</div>

              <div className="artwork-detail__format">{singleArtwork.format}</div>
              {
                singleArtwork.resolution
                ? <div className="artwork-detail__resolution">{singleArtwork.resolution}</div>
                : null
              }

              <div className="artwork-detail__description">{singleArtwork.description}</div>

              {
                singleArtwork.owner
                ? <div className="artwork-detail__added-by">Added by {singleArtwork.owner.name} on {singleArtwork.created}</div>
                : null
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArtworkDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    ui: state.ui,
    artwork: state.artwork
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchSingleArtworkRequest: require('../actions/artwork/fetchSingleArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetailContainer);

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import CollectionDetailSubMenuComponent from '../components/collection/CollectionDetailSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getById } from '../reducers/index';
import { getArtworkForCollection } from '../reducers/collections/index';
import { getCurrentArtwork } from '../reducers/frame/index';
import { isLiked } from '../reducers/user/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class CollectionDetailContainer extends Component {
  componentDidMount() {
    const {actions, params} = this.props;
    actions.fetchSingleCollectionRequest(params.collectionId);
  }

  render() {
    const {collection, artwork, user, auth, actions, isFetching, location, currentArtwork} = this.props;
    return (
      <div className="container">
        {
          isFetching
          ? <LoadingIndicatorComponent />
          : (<div>
              <CollectionDetailSubMenuComponent collection={collection} user={user} />
                <div className="row">
                  {
                  <Masonry
                    options={masonryOptions}>
                  {
                    artwork.map(artwork => (
                        <ArtworkListItemComponent
                          isAuthenticated={auth.isAuthenticated}
                          key={artwork.id}
                          artwork={artwork}
                          currentArtwork={currentArtwork}
                          location={location}
                          pushArtwork={actions.pushArtwork}
                          likeArtwork={actions.likeArtwork}
                          unlikeArtwork={actions.unlikeArtwork}
                          isLiked={isLiked(user, artwork.id)} />
                    ))
                  }
                  </Masonry>
                  }
                </div>
            </div>)
        }
      </div>
    );
  }
}

CollectionDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, { params }) {
  const props = {
    collection: getById(state.collections.byId, params.collectionId),
    artwork: getArtworkForCollection(state,params.collectionId),
    isFetching: state.collections.isFetching,
    user: state.user,
    auth: state.auth,
    userLikesById: state.user.userLikedArtworksById,
    currentArtwork: getCurrentArtwork(state.frames)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchSingleCollectionRequest: require('../actions/collections/fetchSingleCollectionRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetailContainer);

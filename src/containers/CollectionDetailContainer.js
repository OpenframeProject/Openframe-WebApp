import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import CollectionDetailSubMenuComponent from '../components/collection/CollectionDetailSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getById } from '../reducers/index';
import { getArtworkForCollection } from '../reducers/collections/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class CollectionDetailContainer extends Component {
  componentDidMount() {
    const {actions, params} = this.props;
    actions.fetchSingleCollectionRequest(params.collectionId);
  }

  render() {
    const {collection, artwork, user, actions, isFetching, location} = this.props;
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
                          user={user}
                          key={artwork.id}
                          artwork={artwork}
                          location={location}
                          pushArtwork={actions.pushArtwork} />
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
    user: state.user
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchSingleCollectionRequest: require('../actions/collections/fetchSingleCollectionRequest.js').default
    // pushArtwork: require('../actions/artwork/pushArtwork.js').default,
    // openArtworkDetail: require('../actions/artwork/openArtworkDetail.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetailContainer);

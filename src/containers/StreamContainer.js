import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import InfiniteMasonryComponent from '../components/common/InfiniteMasonryComponent';

import { getArtworkList } from '../reducers/artwork/index';
import { getCurrentArtwork } from '../reducers/frame/index';
import { isLiked } from '../reducers/user/index';

class StreamContainer extends Component {
  componentWillMount() {
    this._loadArtworks(0);
  }

  componentWillUpdate(newProps) {
    // console.log('UPDATING STREAM CONTAINER', this.props, newProps, this.props.userLikesById === newProps.userLikesById);
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  _loadArtworks(page) {
    const { actions } = this.props;
    actions.fetchStreamRequest(page);
  }

  render() {
    const { artworkList, userState, auth, actions, isFirstLoad, location, currentArtwork, streamHasMore, featureFlags } = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent featureFlags={featureFlags} />
        <div className="added-container__title visible-xs">Stream</div>
        {
          isFirstLoad
          ? <LoadingIndicatorComponent options={{ radius: 60, scale: .25 }}/>
          : (<div className="row">
                <InfiniteMasonryComponent
                  loadMore={::this._loadArtworks}
                  hasMore={streamHasMore}
                  endComponent={<div>That's all, folks.</div>} >
                {
                  artworkList.map(artwork => {
                    // console.log('artwork', artwork.id, isLiked(userState, artwork.id));
                    return (
                      <ArtworkListItemComponent
                        isAuthenticated={auth.isAuthenticated}
                        key={artwork.id}
                        artwork={artwork}
                        currentArtwork={currentArtwork}
                        location={location}
                        pushArtwork={actions.pushArtwork}
                        likeArtwork={actions.likeArtwork}
                        unlikeArtwork={actions.unlikeArtwork}
                        isLiked={isLiked(userState, artwork.id)} />
                    )
                  })
                }
                </InfiniteMasonryComponent>
              </div>)
        }
      </div>
    );
  }
}

StreamContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    artworkList: getArtworkList(state.artwork.streamIds, state.artwork.byId),
    streamHasMore: state.artwork.streamHasMore,
    auth: state.auth,
    userState: state.user,
    userLikesById: state.user.userLikedArtworksById,
    isFetching: state.artwork.isFetching,
    currentArtwork: getCurrentArtwork(state.frames),
    isFirstLoad: state.artwork.isFirstLoad,
    featureFlags: state.featureFlags
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchStreamRequest: require('../actions/artwork/fetchStreamRequest.js'),
    openArtworkDetail: require('../actions/artwork/openArtworkDetail.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

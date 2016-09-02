import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getById } from '../reducers/index';
import { getArtworkList } from '../reducers/artwork/index';
import { getCurrentArtwork } from '../reducers/frame/index';
import { isLiked, getCurrentUser } from '../reducers/user/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class StreamContainer extends Component {
  componentWillMount() {
    const {actions} = this.props;
    actions.fetchStreamRequest();
  }

  componentWillUpdate(newProps) {
    // console.log('UPDATING STREAM CONTAINER', this.props, newProps, this.props.userLikesById === newProps.userLikesById);
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  render() {
    const {artworkList, userState, auth, actions, isFirstLoad, location, currentArtwork } = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent />
        {
          isFirstLoad
          ? <LoadingIndicatorComponent />
          : (<div className="row">
                <Masonry
                  options={masonryOptions}>
                {
                  artworkList.map(artwork => {
                    // console.log('artwork owner', artwork.id, getById(userState.byId, artwork.ownerId));
                    return (
                      <ArtworkListItemComponent
                        isAuthenticated={auth.isAuthenticated}
                        key={artwork.id}
                        artwork={artwork}
                        currentArtwork={currentArtwork}
                        owner={getById(userState.byId, artwork.ownerId)}
                        location={location}
                        pushArtwork={actions.pushArtwork}
                        likeArtwork={actions.likeArtwork}
                        unlikeArtwork={actions.unlikeArtwork}
                        isLiked={isLiked(userState, artwork.id)} />
                    )
                  })
                }
                </Masonry>
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
    auth: state.auth,
    userState: state.user,
    userLikesById: state.user.userLikedArtworksById,
    isFetching: state.artwork.isFetching,
    currentArtwork: getCurrentArtwork(state.frames),
    isFirstLoad: state.artwork.isFirstLoad
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchStreamRequest: require('../actions/artwork/fetchStreamRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

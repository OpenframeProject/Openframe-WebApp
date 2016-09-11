import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import InfiniteMasonryComponent from '../components/common/InfiniteMasonryComponent';

import { getProfileUser, getCurrentUser, getUserLikes, isLiked } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

class LikesContainer extends Component {
  _loadArtworks(page) {
    const { actions } = this.props;
    actions.fetchUserLikesRequest('current', page);
  }

  render() {
    const { actions, userState, user, currentUser, isFetching, auth, artworkList, location, likesHasMore } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} openEditProfileModal={actions.openEditProfileModal} />

        <div className="container">
          <YouSubMenuComponent location={location} user={user} currentUser={currentUser} />
          <div className="added-container__title visible-xs">Likes</div>
          {
            isFetching
            ? <LoadingIndicatorComponent />
            : (<div>

                <div className="row">
                  <InfiniteMasonryComponent
                    loadMore={::this._loadArtworks}
                    hasMore={likesHasMore} >
                  {
                    artworkList.map(artwork => {
                      return (
                        <ArtworkListItemComponent
                          isAuthenticated={auth.isAuthenticated}
                          key={artwork.id}
                          artwork={artwork}
                          location={location}
                          pushArtwork={actions.pushArtwork}
                          likeArtwork={actions.likeArtwork}
                          unlikeArtwork={actions.unlikeArtwork}
                          isLiked={isLiked(userState, artwork.id)} />
                      )
                    })
                  }
                  </InfiniteMasonryComponent>
                </div>

              </div>)
            }
          </div>
      </div>
    );
  }
}

LikesContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state.user);
  const currentUserId = currentUser ? currentUser.id : null;
  const props = {
    userState: state.user,
    user: getProfileUser(state.user),
    currentUser: currentUser,
    artworkList: getArtworkList(getUserLikes(state.user, currentUserId), state.artwork.byId),
    auth: state.auth,
    isFetching: state.artwork.isFetching
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    openEditProfileModal: require('../actions/ui/openEditProfileModal.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js'),
    fetchUserLikesRequest: require('../actions/user/fetchUserLikesRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesContainer);

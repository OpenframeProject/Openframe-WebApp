import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';

import { getProfileUser, getCurrentUser, getUserLikes, isLiked } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class LikesContainer extends Component {

  render() {
    const { actions, userState, user, currentUser, isFetching, auth, artworkList, location } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} openEditProfileModal={actions.openEditProfileModal} />

        <div className="container">
          {
            currentUser && user && user.id === currentUser.id
            ? <YouSubMenuComponent location={location} user={user} />
            : null
          }
          {
            isFetching
            ? <LoadingIndicatorComponent />
            : (<div>

                <div className="row">
                  <Masonry
                    options={masonryOptions}>
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
                  </Masonry>
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
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesContainer);

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArtworkListItemContainer from './artwork/ArtworkListItemContainer';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import InfiniteMasonryComponent from '../components/common/InfiniteMasonryComponent';

import { getProfileUser, getCurrentUser, getUserLikes } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

class LikesContainer extends Component {
  _loadArtworks(page) {
    const { actions } = this.props;
    actions.fetchUserLikesRequest('current', page);
  }

  render() {
    const { actions, user, currentUser, isFetching, artworkList, location, likesHasMore } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} updateVisibleModal={actions.updateVisibleModal} />

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
                        <ArtworkListItemContainer
                          key={artwork.id}
                          location={location}
                          artwork={artwork} />
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
    user: getProfileUser(state.user),
    currentUser: currentUser,
    likesHasMore: state.user.likesHasMore,
    artworkList: getArtworkList(getUserLikes(state.user, currentUserId), state.artwork.byId),
    isFetching: state.artwork.isFetching
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserLikesRequest: require('../actions/user/fetchUserLikesRequest.js').default,
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesContainer);

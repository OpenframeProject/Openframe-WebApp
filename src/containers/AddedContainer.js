import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';

import { getProfileUser, getCurrentUser, isLiked } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

require('styles/user/AddedContainer.scss');

const masonryOptions = {
    transitionDuration: '0.2s'
};

class AddedContainer extends Component {
  render() {
    const { actions, userState, user, currentUser, isFetching, auth, artworkList, location } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} />

        <div className="container">
          {
            currentUser && user && user.id === currentUser.id
            ? <YouSubMenuComponent location={location} user={user} />
            : null
          }
          <div className="added-container__title visible-xs">Artworks</div>
          {
            // isFetching
            false
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

AddedContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    user: getProfileUser(state.user),
    userState: state.user,
    currentUser: getCurrentUser(state.user),
    isFetching: state.artwork.isFetching,
    artworkList: getArtworkList(state.user.profileArtworkIds, state.artwork.byId),
    auth: state.auth
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserArtworkRequest: require('../actions/user/fetchUserArtworkRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedContainer);

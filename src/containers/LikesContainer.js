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

import { getProfileUser, getCurrentUser } from '../reducers/users/index';
import { getArtworkList } from '../reducers/artwork/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class LikesContainer extends Component {

  render() {
    const { actions, user, currentUser, isFetching, auth, artworkList, location } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} />

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
                          pushArtwork={actions.pushArtwork}
                          openArtworkDetail={actions.openArtworkDetail} />
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
  const props = {
    user: getProfileUser(state.user),
    currentUser: getCurrentUser(state.user),
    artworkList: getArtworkList(state.user.likedArtworkIds, state.artwork.byId),
    auth: state.auth,
    isFetching: state.artwork.isFetching
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    openArtworkDetail: require('../actions/artwork/openArtworkDetail.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesContainer);

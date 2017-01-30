import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';
import AddArtworkBlockComponent from '../components/artwork/AddArtworkBlockComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import ArtworkListItemContainer from './artwork/ArtworkListItemContainer';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import InfiniteMasonryComponent from '../components/common/InfiniteMasonryComponent';

import { getProfileUser, getCurrentUser, getUserArtworks } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

require('styles/user/AddedContainer.scss');

class AddedContainer extends Component {
  _loadArtworks(page) {
    const { actions, user } = this.props;
    actions.fetchUserArtworkRequest(user.id, page);
  }

  render() {
    const { actions, user, currentUser, artworkList, userArtworkHasMore, location } = this.props;

    // TODO: probably not best practice...
    if (user && currentUser && user.id === currentUser.id && (artworkList.length === 0 || artworkList[0].type !== 'add')) {
      this.props.artworkList.unshift({
        type: 'add'
      });
    }

    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} updateVisibleModal={actions.updateVisibleModal} />

        <div className="container">
          <YouSubMenuComponent location={location} user={user} currentUser={currentUser} />
          <div className="added-container__title visible-xs">Artworks</div>
          {
            // isFetching
            false
            ? <LoadingIndicatorComponent />
            : (<div>

                <div className="row">
                  <InfiniteMasonryComponent
                    loadMore={::this._loadArtworks}
                    hasMore={userArtworkHasMore} >
                  {
                    artworkList.map(artwork => {
                      if (artwork.type === 'add') {
                        return (
                          <AddArtworkBlockComponent
                            key={artwork.type}
                            updateVisibleModal={actions.updateVisibleModal} />
                        );
                      }
                      return (
                        <ArtworkListItemContainer
                          key={artwork.id}
                          artwork={artwork}
                          location={location} />
                      );
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

AddedContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const profileUser = getProfileUser(state.user);
  const profileUserId = profileUser ? profileUser.id : null;
  const props = {
    user: profileUser,
    currentUser: getCurrentUser(state.user),
    userArtworkHasMore: state.user.userArtworkHasMore,
    artworkList: getArtworkList(getUserArtworks(state.user, profileUserId), state.artwork.byId)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserArtworkRequest: require('../actions/user/fetchUserArtworkRequest.js'),
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedContainer);

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

import { getProfileUser, getCurrentUser } from '../reducers/users/index';
import { getArtworkList } from '../reducers/artwork/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class AddedContainer extends Component {
  render() {
    const { actions, user, currentUser, isFetching, auth, artworkList } = this.props;

    return (
      <div>
        <ProfileHeaderComponent user={user} />

        <div className="container">
          {
            currentUser && user && user.id === currentUser.id
            ? <YouSubMenuComponent user={user} />
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

AddedContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    user: getProfileUser(state.user),
    currentUser: getCurrentUser(state.user),
    isFetching: state.artwork.isFetching,
    artworkList: getArtworkList(state.user.profileArtworkIds, state.artwork.byId),
    auth: state.auth
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserArtworkRequest: require('../actions/user/fetchUserArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedContainer);

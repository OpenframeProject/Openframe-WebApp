import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import ArtworkListItemContainer from './artwork/ArtworkListItemContainer';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';

import { getProfileUser, getCurrentUser } from '../reducers/user/index';
import { getArtworkList } from '../reducers/artwork/index';

require('styles/user/AddedContainer.scss');

const masonryOptions = {
    transitionDuration: '0.2s'
};

class AddedContainer extends Component {
  render() {
    const { actions, user, currentUser, artworkList, location } = this.props;
    return (
      <div>
        <ProfileHeaderComponent user={user} currentUser={currentUser} openEditProfileModal={actions.openEditProfileModal} />

        <div className="container">
          <YouSubMenuComponent location={location} user={user} currentUser={currentUser} />
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
                        <ArtworkListItemContainer
                          key={artwork.id}
                          artwork={artwork}
                          location={location} />
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
    artworkList: getArtworkList(state.user.profileArtworkIds, state.artwork.byId)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserArtworkRequest: require('../actions/user/fetchUserArtworkRequest.js'),
    openEditProfileModal: require('../actions/ui/openEditProfileModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedContainer);

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArtworkListItemComponent from '../../components/artwork/ArtworkListItemComponent';

import { getCurrentArtwork } from '../../reducers/frame/index';
import { isLiked, getCurrentUser } from '../../reducers/user/index';

class ArtworkListItemContainer extends Component {
  render() {
    return <ArtworkListItemComponent {...this.props} />;
  }
}

ArtworkListItemContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let curUser = getCurrentUser(state.user);
  let isOwner = curUser && curUser.id === ownProps.artwork.ownerId;
  const props = {
    currentArtwork: getCurrentArtwork(state.frames),
    location: ownProps.location,
    artwork: ownProps.artwork,
    isLiked: isLiked(state.user, ownProps.artwork.id),
    isOwner: isOwner,
    isAuthenticated: state.auth.isAuthenticated
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    pushArtwork: require('../../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../../actions/artwork/unlikeArtworkRequest.js'),
    editArtwork: require('../../actions/artwork/editArtwork.js'),
    updateVisibleModal: require('../../actions/ui/updateVisibleModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkListItemContainer);

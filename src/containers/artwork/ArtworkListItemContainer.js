import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArtworkListItemComponent from '../../components/artwork/ArtworkListItemComponent';

import { getCurrentArtwork } from '../../reducers/frame/index';
import { isLiked } from '../../reducers/user/index';

class ArtworkListItemContainer extends Component {
  render() {
    return <ArtworkListItemComponent {...this.props} />;
  }
}

ArtworkListItemContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const props = {
    currentArtwork: getCurrentArtwork(state.frames),
    location: ownProps.location,
    artwork: ownProps.artwork,
    isLiked: isLiked(state.user, ownProps.artwork.id),
    isAuthenticated: state.auth.isAuthenticated
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    pushArtwork: require('../../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../../actions/artwork/unlikeArtworkRequest.js'),
    updateVisibleModal: require('../../actions/ui/updateVisibleModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkListItemContainer);

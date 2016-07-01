import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';

class ArtworkList extends Component {
  render() {
    const {actions, artwork, frames, user, ui} = this.props;

    return (
      <Main
        actions={actions}
        artwork={artwork}
        frames={frames}
        user={user}/>
    );
  }
}

ArtworkList.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    artwork: state.artwork,
    frames: state.frames,
    user: state.user
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    editArtwork: require('../actions/artwork/editArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtwork.js'),
    previewArtwork: require('../actions/artwork/previewArtwork.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtwork.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkList);

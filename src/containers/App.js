/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, artwork, frames, user} = this.props;
    return (
      <Main
        actions={actions}
        artwork={artwork}
        frames={frames}
        user={user}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  artwork: PropTypes.object.isRequired,
  frames: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    artwork: state.artwork,
    frames: state.frames,
    user: state.user
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    addArtwork: require('../actions/artwork/addArtwork.js'),
    removeArtwork: require('../actions/artwork/removeArtwork.js'),
    editArtwork: require('../actions/artwork/editArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtwork.js'),
    previewArtwork: require('../actions/artwork/previewArtwork.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtwork.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    fetchArtworkRequest: require('../actions/artwork/fetchArtworkRequest.js'),
    fetchArtworkSuccess: require('../actions/artwork/fetchArtworkSuccess.js'),
    fetchArtworkFailure: require('../actions/artwork/fetchArtworkFailure.js'),
    fetchFramesRequest: require('../actions/frame/fetchFramesRequest.js'),
    fetchFramesSuccess: require('../actions/frame/fetchFramesSuccess.js'),
    fetchFramesFailure: require('../actions/frame/fetchFramesFailure.js'),
    loginRequest: require('../actions/user/loginRequest.js'),
    loginSuccess: require('../actions/user/loginSuccess.js'),
    loginFailure: require('../actions/user/loginFailure.js'),
    logoutRequest: require('../actions/user/logoutRequest.js'),
    logoutSuccess: require('../actions/user/logoutSuccess.js'),
    logoutFailure: require('../actions/user/logoutFailure.js'),
    selectFrame: require('../actions/frame/selectFrame.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

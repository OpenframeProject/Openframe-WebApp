import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrameItemComponent from '../../components/frame/FrameItemComponent';

import { getById } from '../../reducers/index';

class FrameItemContainer extends Component {
  render() {
    return <FrameItemComponent {...this.props} />;
  }
}

FrameItemContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  frame: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const props = {
    ...ownProps,
    currentArtwork: getById(state.artwork.byId, ownProps.frame.current_artwork),
    isSelected: ownProps.frame.id === state.frames.selectedFrameId,
    isPushing: state.frames.isPushing
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    openFrameSettingsModal: require('../../actions/ui/openFrameSettingsModal.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameItemContainer);

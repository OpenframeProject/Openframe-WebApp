import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SidebarComponent from '../../components/sidebar/SidebarComponent';

import { getSelectedFrame, getFramesList } from '../../reducers/frame';
import { getCurrentUser } from '../../reducers/user/index';


class SidebarContainer extends Component {
  render() {
    const { actions, currentUser, frames, ui, artwork } = this.props;
    let selectedFrameId = frames.selectedFrameId;
    let selectedFrame = getSelectedFrame(frames.byId, selectedFrameId, artwork.byId);
    return (
      <div className='sidebar-wrap'>
        <SidebarComponent
          user={currentUser}
          frames={getFramesList(frames.ids, frames.byId)}
          selectedFrame={selectedFrame}
          isOpen={ui.sidebarOpen}
          closeSidebar={actions.closeSidebar}
          selectFrame={actions.selectFrame}
          openEditProfileModal={actions.openEditProfileModal}
          openFrameSettingsModal={actions.openFrameSettingsModal}
          logoutRequest={actions.logoutRequest} />
      </div>
    );
  }
}

SidebarContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    frames: state.frames,
    currentUser: getCurrentUser(state.user),
    ui: state.ui,
    artwork: state.artwork
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    closeSidebar: require('../../actions/ui/closeSidebar.js'),
    selectFrame: require('../../actions/frame/selectFrame.js'),
    openEditProfileModal: require('../../actions/ui/openEditProfileModal.js'),
    openFrameSettingsModal: require('../../actions/ui/openFrameSettingsModal.js'),
    logoutRequest: require('../../actions/auth/logoutRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);

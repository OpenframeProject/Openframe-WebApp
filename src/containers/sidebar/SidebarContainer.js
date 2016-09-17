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
    const { actions, currentUser, frames, ui, artwork, location } = this.props;
    let selectedFrameId = frames.selectedFrameId;
    return (
      <div className='sidebar-wrap'>
        <SidebarComponent
          user={currentUser}
          frames={getFramesList(frames.byId, frames.ids)}
          selectedFrameId={selectedFrameId}
          isOpen={ui.sidebarOpen}
          selectFrame={actions.selectFrame}
          editFrameSettings={actions.editFrameSettings}
          updateSidebarState={actions.updateSidebarState}
          updateVisibleModal={actions.updateVisibleModal}
          logoutRequest={actions.logoutRequest}
          location={location} />
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
    updateVisibleModal: require('../../actions/ui/updateVisibleModal.js'),
    updateSidebarState: require('../../actions/ui/updateSidebarState.js'),
    selectFrame: require('../../actions/frame/selectFrame.js'),
    editFrameSettings: require('../../actions/frame/editFrameSettings.js'),

    logoutRequest: require('../../actions/auth/logoutRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);

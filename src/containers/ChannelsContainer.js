import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChannelListItemComponent from '../components/channel/ChannelListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';

class ChannelsContainer extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchChannelsRequest();
  }

  render() {
    const {channels, auth, actions} = this.props;
    let items = channels.items;
    return (
      <div className="container">
        <BrowseSubMenuComponent />

        <div className="row">
          {
            items.map(channel => (
                <ChannelListItemComponent
                  isAuthenticated={auth.isAuthenticated}
                  key={channel.id}
                  channel={channel}
                  pushChannel={actions.pushChannel} />
            ))
          }
        </div>
      </div>

    );
  }
}

ChannelsContainer.propTypes = {
  channels: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    channels: state.channels,
    auth: state.auth
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchChannelsRequest: require('../actions/channels/fetchChannelsRequest.js').default,
    fetchChannelsSuccess: require('../actions/channels/fetchChannelsSuccess.js').default,
    fetchChannelsFailure: require('../actions/channels/fetchChannelsFailure.js').default,
    pushChannel: require('../actions/channels/pushChannel.js').default,

  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer);

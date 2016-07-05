import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChannelsContainer extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchChannelsRequest();
  }

  render() {
    const {channels} = this.props;
    let items = channels.items;
    return (
      <div>
        {
          items.map(channel => (
              <div key={channel.id}>{channel.name}</div>
          ))
        }
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
    channels: state.channels
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchChannelsRequest: require('../actions/channels/fetchChannelsRequest.js'),
    fetchChannelsSuccess: require('../actions/channels/fetchChannelsSuccess.js'),
    fetchChannelsFailure: require('../actions/channels/fetchChannelsFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer);

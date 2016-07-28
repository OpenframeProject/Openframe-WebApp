'use strict';

import React, { PropTypes } from 'react';
import PushButtonComponent from '../common/PushButtonComponent';

require('styles//channel/ChannelListItem.scss');

class ChannelsListItemComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  handlePushClick() {
    let {channel, pushChannel} = this.props;
    pushChannel(channel.id);
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }

  render() {
    let {channel, isAuthenticated} = this.props;

    var divStyle = {
      backgroundImage: 'url(' + channel.thumb_url + ')'
    };

    return (
      <div className="col-xs-12 col-sm-4 col-md-3">
        <div className="channel-list-item" onMouseOver={::this.toggleHover} onMouseOut={::this.toggleHover}>
          <div className="channel-list-item__thumb-wrap">
            <div className="channel-list-item__thumb" style={divStyle}>
              { isAuthenticated
                ? <PushButtonComponent handleClick={::this.handlePushClick} show={this.state.hover} />
                : null
              }
            </div>
          </div>
          <div className="channel-list-item__info">
            <div className="channel-list-item__name">{channel.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

ChannelsListItemComponent.displayName = 'ChannelsListItemComponent';

// Uncomment properties you need
ChannelsListItemComponent.propTypes = {
  channel: PropTypes.object.isRequired,
  pushChannel: PropTypes.func.isRequired
  // saveChannel: PropTypes.func.isRequired
};
// ChannelsListItemComponent.defaultProps = {};

export default ChannelsListItemComponent;

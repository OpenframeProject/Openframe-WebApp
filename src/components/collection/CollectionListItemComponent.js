'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router'

import PushButtonComponent from '../common/PushButtonComponent';

require('styles//collection/CollectionListItem.scss');

let rightCaret = require('../../images/right_caret.svg');

class CollectionListItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  handlePushClick() {
    let {channel, pushCollection} = this.props;
    pushCollection(channel.id);
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }

  render() {
    let {collection, isAuthenticated} = this.props;

    var divStyle = {
      backgroundImage: 'url(' + collection.thumb_url + ')'
    };

    return (
      <div className="col-xs-12 col-sm-4 col-md-3">
        <Link to={'/collections/'+collection.id}>
          <div className="list-item collection-list-item" onMouseOver={::this.toggleHover} onMouseOut={::this.toggleHover}>
            <div className="collection-list-item__flex-wrap">
              <div className="collection-list-item__thumb" style={divStyle}>
              </div>
              <div className="collection-list-item__info">
                <div className="collection-list-item__name">{collection.name}</div>
                <div className="collection-list-item__count">{collection.count} artworks</div>
              </div>
              <div className="collection-list-item__open-btn">
                <img src={rightCaret} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

CollectionListItemComponent.displayName = 'CollectionListItemComponent';

// Uncomment properties you need
CollectionListItemComponent.propTypes = {
  collection: PropTypes.object.isRequired,
  pushCollection: PropTypes.func.isRequired
};
// CollectionListItemComponent.defaultProps = {};

export default CollectionListItemComponent;

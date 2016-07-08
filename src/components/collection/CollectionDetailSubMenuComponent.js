'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router'

require('styles/collection/CollectionDetailSubMenu.scss');

class CollectionDetailSubMenuComponent extends React.Component {
  handlePlayClick() {
    let { collection, playCollection } = this.props;
    if (playCollection) {
      playCollection(collection.id);
    }
  }

  render() {
    let { collection } = this.props;
    if (!collection) return null;
    return (
      <div className="collection-detail-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="collection-detail-sub-menu__wrap">
            <div className="collection-detail-sub-menu__name">{collection.name}</div>
            <Link to="/collections" className="collection-detail-sub-menu__back" >Back to Collections</Link>
            <a href="#" className="collection-detail-sub-menu__play-btn" onClick={::this.handlePlayClick}>Play this collection</a>
          </div>
        </div>
      </div>
    );
  }
}

CollectionDetailSubMenuComponent.displayName = 'CollectionCollectionDetailSubMenuComponent';

// Uncomment properties you need
CollectionDetailSubMenuComponent.propTypes = {
  collection: PropTypes.object,
  playCollection: PropTypes.func
};
// CollectionDetailSubMenuComponent.defaultProps = {};

export default CollectionDetailSubMenuComponent;

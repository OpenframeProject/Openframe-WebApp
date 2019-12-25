'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

require('styles/collection/CollectionDetailSubMenu.scss');

class CollectionDetailSubMenuComponent extends React.Component {
  handlePlayClick() {
    let { collection, playCollection } = this.props;
    if (playCollection) {
      playCollection(collection.id);
    }
  }

  render() {
    let { collection, user } = this.props;
    if (!collection) return null;
    return (
      <div className="collection-detail-sub-menu row hidden-xs">
        <div className="col-md-12">
          <div className="collection-detail-sub-menu__wrap">
            <Link to="/collections" className="collection-detail-sub-menu__back" >Back to Collections</Link>
            <div className="collection-detail-sub-menu__name">{collection.name}</div>
            {
              user.current
              ? <a href="#" className="collection-detail-sub-menu__play-btn" onClick={::this.handlePlayClick}>Play this collection</a>
              : null
            }

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
  user: PropTypes.object,
  playCollection: PropTypes.func
};
// CollectionDetailSubMenuComponent.defaultProps = {};

export default CollectionDetailSubMenuComponent;

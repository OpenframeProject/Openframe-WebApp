'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

require('styles//collection/CollectionList.scss');

class CollectionListComponent extends Component {
  render() {
    return (
      <div className="collection-list">
        {this.props.collection.map(
            artwork => (<ArtworkItemComponent artwork={artwork} />)
        )}
      </div>
    );
  }
}

CollectionListComponent.displayName = 'CollectionListComponent';

// Uncomment properties you need
CollectionListComponent.propTypes = {
  collection: PropTypes.array.isRequired
};

CollectionListComponent.defaultProps = {
    collection: []
};

export default CollectionListComponent;

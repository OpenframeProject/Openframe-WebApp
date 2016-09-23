'use strict';

import React from 'react';

require('styles/artwork/AddArtworkBlock.scss');

class AddArtworkBlockComponent extends React.Component {
  _openAddModal() {
    const { updateVisibleModal } = this.props;
    updateVisibleModal('add-artwork');
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="add-artwork-block list-item" onClick={::this._openAddModal}>
          <div>Add artwork</div>
        </div>
      </div>
    );
  }
}

AddArtworkBlockComponent.displayName = 'ArtworkAddArtworkBlockComponent';

// Uncomment properties you need
// AddArtworkBlockComponent.propTypes = {};
// AddArtworkBlockComponent.defaultProps = {};

export default AddArtworkBlockComponent;

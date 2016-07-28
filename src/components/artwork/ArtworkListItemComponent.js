'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router'

require('styles/artwork/ArtworkListItem.scss');
// let settingsBtnImage = require('../../images/artwork-settings.svg');

// TODO: move calculated properties out of here... should all happen via normalizr & reselect

class ArtworkListItemComponent extends Component {

  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }

  _formatDisplayName(format) {
    switch (format) {
        case 'openframe-glslviewer':
            return 'shader';
        default:
            return format.replace('openframe-', '');
    }
  }

  render() {
    let { artwork } = this.props;

    return (
        <div className="col-xs-12 col-sm-4 col-lg-3">
          <Link to={'/artwork/'+artwork.id}>
            <div className="artwork-list-item" onMouseOver={::this.toggleHover} onMouseOut={::this.toggleHover}>
              <div className="artwork-list-item__thumb">
                <img className="artwork-list-item__thumb-img" src={artwork.thumb_url} />
              </div>
              <div className="artwork-list-item__info">
                <div className="artwork-list-item__author">{artwork.author_name}</div>
                <div className="artwork-list-item__title">{artwork.title}</div>
                <div className="artwork-list-item__format">{this._formatDisplayName(artwork.format)}</div>
              </div>
            </div>
          </Link>
        </div>
    );
  }
}

ArtworkListItemComponent.displayName = 'ArtworkListItemComponent';

// Uncomment properties you need
ArtworkListItemComponent.propTypes = {
  artwork: PropTypes.object.isRequired,
  user: PropTypes.object
};

ArtworkListItemComponent.defaultProps = {
};

export default ArtworkListItemComponent;

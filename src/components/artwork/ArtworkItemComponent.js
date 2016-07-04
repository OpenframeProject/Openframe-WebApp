'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

require('styles/artwork/ArtworkItem.scss');
let settingsBtnImage = require('../../images/artwork-settings.svg');

// TODO: move calculated properties out of here... should all happen via normalizr & reselect

class ArtworkItemComponent extends Component {

  _formatDisplayName(format) {
    switch (format) {
        case 'openframe-glslviewer':
            return 'shader';
        default:
            return format.replace('openframe-', '');
    }
  }

  _renderSettingsBtn() {
    let { artwork, currentUserId } = this.props;
    let settingsBtn = '';
    // add settings btn if owner is current user
    if (currentUserId === artwork.ownerId) {
      settingsBtn = (
        <div className="btn btn-artwork-settings btn-hover-action" data-artworkid={ artwork.id } data-toggle="modal" data-target="#EditArtworkModal">
          <img src={ settingsBtnImage } />
        </div>
      );
    }
    return settingsBtn;
  }

  _renderLikeBtn() {
    let { artwork, currentUserId, likes } = this.props;
    let likeBtn = '';
    // add settings btn if owner is current user
    if (currentUserId !== artwork.ownerId) {
      let btnClass = 'btn btn-circle btn-hover-action btn';
      btnClass += likes.indexOf(artwork.id) !== -1 ? '-unlike' : 'like';
      likeBtn = <div className={btnClass} data-artworkid={ artwork.id }></div>;
    }
    return likeBtn;
  }

  _renderPushBtn() {
    let { currentArtworkId, artwork } = this.props;
    let btnClass = 'btn btn-circle';

    btnClass += currentArtworkId === artwork.id ? ' btn-displaying' : ' btn btn-circle btn-push btn-hover-action';

    return <div className={btnClass} data-artworkid={ artwork.id }></div>;
  }


  render() {
    let { artwork } = this.props;

    return (
        <div className="artworkitem tile-item tile-artwork hover-actions {{ if (isCurrent) { }} tile-artwork--current {{ } }}" data-artworkid="{{- id }}">
            <div className="bg-image">
                <img
                    src={ artwork.thumb_url }
                    className="artwork__preview-image"
                    onerror="this.onerror=null;this.src='/img/preview-missing.png'" />
                <div className="artwork-interface">
                    { ::this._renderSettingsBtn() }

                    // author / title
                    <div className="artist-label"><h4>{ artwork.author_name }</h4></div>
                    <div className="artwork-label"><h4>{ artwork.title } <span className="artwork-format">{ this._formatDisplayName(artwork.format) }</span></h4></div>

                    // actions
                    <div className="artwork__actions">

                        { ::this._renderLikeBtn() }

                        { ::this._renderPushBtn() }

                    </div>
                </div>
            </div>
        </div>
    );
  }
}

ArtworkItemComponent.displayName = 'ArtworkArtworkItemComponent';

// Uncomment properties you need
ArtworkItemComponent.propTypes = {
    currentArtworkId: PropTypes.string.isRequired,
    artwork: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
};

ArtworkItemComponent.defaultProps = {
  likes: []
};

export default ArtworkItemComponent;

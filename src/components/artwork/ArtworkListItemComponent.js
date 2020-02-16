'use strict';

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import PushButtonComponent from '../common/PushButtonComponent';
import LikeButtonComponent from '../common/LikeButtonComponent';
import EditButtonComponent from '../common/EditButtonComponent';

import noThumbImg from '../../images/preview-missing.png'
import lockIcon from '../../images/icon_lock.svg'

require('styles/artwork/ArtworkListItem.scss');
// let settingsBtnImage = require('../../images/artwork-settings.svg');

// TODO: move calculated properties out of here... should all happen via normalizr & reselect

class ArtworkListItemComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      hover: false,
      style: {
        visibility: 'hidden',
        height: '400px'
      },
      thumb_url: this._generateThumbUrl(props.artwork.thumb_url)
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

  _handlePushClick(e) {
    e.preventDefault();
    let {artwork, actions, isAuthenticated} = this.props;
    if (isAuthenticated) {
      actions.pushArtwork(artwork.id);
    } else {
      actions.updateVisibleModal('create-account-notice');
    }
  }

  _handleEditClick(e) {
    e.preventDefault();
    this.props.actions.editArtwork(this.props.artwork.id);
  }

  _handleLikeClick(e) {
    e.preventDefault();
    let {artwork, actions, isAuthenticated, isLiked } = this.props;
    if (isAuthenticated) {
      if (isLiked) {
        actions.unlikeArtwork(artwork.id);
      } else {
        actions.likeArtwork(artwork.id);
      }
    } else {
      actions.updateVisibleModal('create-account-notice');
    }
  }

  _generateThumbUrl(url) {
    if (!url) {
      return noThumbImg;
    }
    return url;
    // let parser = document.createElement('a');
    // parser.href = url;
    // let newHost = parser.hostname + '.rsz.io';
    // let newSearch = parser.search ? parser.search + '&width=300' : '?width=300';
    // let newUrl = 'http://' + newHost + parser.port + parser.pathname + newSearch;

    // return newUrl;
    // parser.protocol; // => "http:"
    // parser.hostname; // => "example.com"
    // parser.port;     // => "3000"
    // parser.pathname; // => "/pathname/"
    // parser.search;   // => "?search=test"
    // parser.hash;     // => "#hash"
    // parser.host;     // => "example.com:3000"
  }

  _imageLoaded() {
    this.setState({
      style: {
        visibility: 'visible',
        'height': 'auto'
      }
    });
  }

  _imageError() {
    this.setState({
      style: {
        visibility: 'visible',
        'height': 'auto'
      },
      thumb_url: noThumbImg
    });
  }

  render() {
    let { artwork, currentArtwork, isLiked, isOwner, location } = this.props;

    let isCurrentClass = 'selected-frame-indicator';
    isCurrentClass += artwork.id === currentArtwork ? ' selected-frame-indicator--connected' : '';

    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" style={this.state.style}>
          <Link to={{
              pathname: '/artwork/'+artwork.id,
              // This is the trick! This link sets
              // the `background` in location state.
              state: {
                background: location,
                returnTo: location.pathname
              }
              // state: { modal: true, returnTo: this.props.location.pathname }
            }}>
            <div className="list-item artwork-list-item" onMouseOver={::this.toggleHover} onMouseOut={::this.toggleHover}>
              <div className="artwork-list-item__thumb">
                <img className="artwork-list-item__thumb-img" src={this.state.thumb_url} onLoad={::this._imageLoaded} onError={::this._imageError} />
              </div>
              <div className="artwork-list-item__info">
                <div className="artwork-list-item__author">{artwork.author_name}</div>
                <div className="artwork-list-item__title">{artwork.title}</div>
                <div className="artwork-list-item__format">{this._formatDisplayName(artwork.format)}</div>
                {
                  !artwork.is_public && <img src={lockIcon} alt="Private artwork" />
                }
              </div>
              <div className="artwork-list-item__actions">
                <div className="artwork-list-item__action" title="Push to frame">
                  <PushButtonComponent handleClick={::this._handlePushClick} show={this.state.hover} />
                </div>
                <div className="artwork-list-item__action" title="Like artwork">
                  <LikeButtonComponent handleClick={::this._handleLikeClick} show={this.state.hover} initialLikedState={isLiked}/>
                </div>
              </div>
              { artwork.id === currentArtwork
                ? <div className="artwork-list-item__current-indicator">
                    <span className='selected-frame-indicator--connected'>&bull;</span>
                  </div>
                : null
              }
              { isOwner &&
                <div className="artwork-list-item__action artwork-list-item__action--edit" title="Edit artwork">
                  <EditButtonComponent
                    handleClick={::this._handleEditClick}
                    invert={true} />
                </div>
              }
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
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoadingImages: PropTypes.bool
};

ArtworkListItemComponent.defaultProps = {
};

export default ArtworkListItemComponent;

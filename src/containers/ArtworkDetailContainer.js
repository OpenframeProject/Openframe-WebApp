import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import NotFoundComponent from '../components/common/NotFoundComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import PushButtonComponent from '../components/common/PushButtonComponent';
import LikeButtonComponent from '../components/common/LikeButtonComponent';
import EditButtonComponent from '../components/common/EditButtonComponent';

import { getById } from '../reducers/index';
import { isLiked } from '../reducers/user/index';

let noThumbImg = require('./../images/preview-missing.png');

require('styles/artwork/ArtworkDetail.scss');

class ArtworkDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumb_url: props.singleArtwork && props.singleArtwork.thumb_url
    };
  }

  componentWillMount() {
    const {actions, params} = this.props;
    actions.fetchSingleArtworkRequest(params.artworkId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      thumb_url: nextProps.singleArtwork && nextProps.singleArtwork.thumb_url || noThumbImg
    });
  }

  componentDidUpdate() {
    if (this.canvas && !this.glslCanvas) {
      this.glslCanvas = new GlslCanvas(this.canvas);
    }
  }

  _formatDisplayName(format) {
    switch (format) {
        case 'openframe-glslviewer':
            return 'shader';
        default:
            return format.replace('openframe-', '');
    }
  }

  _getPreviewElement() {
    const url = this.props.singleArtwork.url;
    const re = /thebookofshaders\.com/i;
    const bos = url.match(re);
    if (bos) {
      return (<canvas
        ref={(canvas) => { this.canvas = canvas; }}
        className="artwork-detail__canvas"
        data-fragment-url={url}
        width="1000"
        height="1000"></canvas>);

    } else {
      return (<img className="artwork-detail__img" src={this.state.thumb_url} onError={::this._imageError} />);
    }
  }

  _handlePushClick(e) {
    e.preventDefault();
    let {params, actions, isAuthenticated} = this.props;
    if (isAuthenticated) {
      actions.pushArtwork(params.artworkId);
    } else {
      actions.updateVisibleModal('create-account-notice');
    }
  }

  _handleLikeClick(e) {
    e.preventDefault();
    let {artwork, params, user, actions, isAuthenticated } = this.props;
    let singleArtwork = getById(artwork.byId, params.artworkId);
    if (isAuthenticated) {
      if (isLiked(user, singleArtwork.id)) {
        actions.unlikeArtwork(singleArtwork.id);
      } else {
        actions.likeArtwork(singleArtwork.id);
      }
    } else {
      actions.updateVisibleModal('create-account-notice');
    }
  }

  _handleEditClick(e) {
    e.preventDefault();
    this.props.actions.editArtwork(this.props.singleArtwork.id);
  }

  _imageError() {
    this.setState({
      thumb_url: noThumbImg
    });
  }

  render() {
    const {artwork, singleArtwork, user } = this.props;
    let owner = singleArtwork && getById(user.byId, singleArtwork.ownerId);
    owner = owner || (singleArtwork && singleArtwork.owner ? getById(user.byId, singleArtwork.owner) : null);
    let ownerUrl = owner ? `/${owner.username}` : null;

    if (artwork.isFetching && !singleArtwork) {
      return (<LoadingIndicatorComponent />);
    }

    if (!singleArtwork) {
      return (<NotFoundComponent />);
    }

    return (
      <div className="artwork-detail-wrap">
        <div className="artwork-detail-bg">
          <div className="artwork-detail">
            <div className="artwork-detail__wrap">

              <div className="artwork-detail__heading">
                <div className="artwork-detail__title">{singleArtwork.title}</div>
                <div className="artwork-detail__author">by {singleArtwork.author_name}</div>
              </div>

              {
                ::this._getPreviewElement(this.state.thumb_url)
              }

              <div className="artwork-detail__info">

                <div className="artwork-detail__format">{this._formatDisplayName(singleArtwork.format)}</div>
                {
                  singleArtwork.resolution
                  ? <div className="artwork-detail__resolution">{singleArtwork.resolution}</div>
                  : null
                }

                <div className="artwork-detail__description">{singleArtwork.description}</div>

                {
                  owner
                  ? <div className="artwork-detail__added-by">Added by <Link to={ownerUrl} activeClassName="active">{owner.username}</Link> on {moment(singleArtwork.created).format('L')}</div>
                  : null
                }

                <div className="artwork-detail__actions">
                  <div className="artwork-detail__action" title="Push to frame">
                    <PushButtonComponent handleClick={::this._handlePushClick} show={true} />
                  </div>
                  <div className="artwork-detail__action" title="Like artwork">
                    <LikeButtonComponent handleClick={::this._handleLikeClick} show={true} initialLikedState={isLiked(user, singleArtwork.id)}/>
                  </div>
                  { user.current === singleArtwork.ownerId
                    ? <div className="artwork-detail__action" title="Edit artwork">
                        <EditButtonComponent
                          handleClick={::this._handleEditClick}
                          show={true} />
                      </div>
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          owner
          ? <div className="artwork-detail__artist-profile">
              <Link to={ownerUrl} className="link">
                See more by {owner.username}
              </Link>
            </div>
          : null
        }

      </div>

    );
  }
}

ArtworkDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const props = {
    ui: state.ui,
    artwork: state.artwork,
    singleArtwork: getById(state.artwork.byId, ownProps.params.artworkId),
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateVisibleModal: require('../actions/ui/updateVisibleModal.js'),
    fetchSingleArtworkRequest: require('../actions/artwork/fetchSingleArtworkRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js'),
    editArtwork: require('../actions/artwork/editArtwork.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetailContainer);

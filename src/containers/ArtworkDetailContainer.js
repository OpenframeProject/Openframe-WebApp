import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
import Modal from 'react-modal';

import NotFoundComponent from '../components/common/NotFoundComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import PushButtonComponent from '../components/common/PushButtonComponent';
import LikeButtonComponent from '../components/common/LikeButtonComponent';
import EditButtonComponent from '../components/common/EditButtonComponent';

import { getById } from '../reducers/index';
import { isLiked } from '../reducers/user/index';

require('styles/artwork/ArtworkDetail.scss');

class ArtworkDetailContainer extends Component {
  componentWillMount() {
    const {actions, params} = this.props;
    actions.fetchSingleArtworkRequest(params.artworkId);
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
    let {params, actions, isAuthenticated} = this.props;
    if (isAuthenticated) {
      actions.pushArtwork(params.artworkId);
    } else {
      // TODO: user-facing notice about what pushing an artwork means.
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
      // TODO: user-facing notice about what liking an artwork means.
    }
  }

  _handleEditClick(e) {
    e.preventDefault();
    console.log('edit me');
  }

  render() {
    const {artwork, user, params} = this.props;
    let singleArtwork = getById(artwork.byId, params.artworkId);
    let owner = getById(user.byId, singleArtwork.ownerId);
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

              <img className="artwork-detail__img" src={singleArtwork.thumb_url} />

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

function mapStateToProps(state) {
  const props = {
    ui: state.ui,
    artwork: state.artwork,
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchSingleArtworkRequest: require('../actions/artwork/fetchSingleArtworkRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetailContainer);

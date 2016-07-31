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

import { getById } from '../reducers/index';


require('styles/artwork/ArtworkDetail.scss');

class ArtworkDetailContainer extends Component {
  componentWillMount() {
    const {artwork, actions, params} = this.props;
    let singleArtwork = getById(artwork.byId, params.artworkId);
    if (!singleArtwork) {
      actions.fetchSingleArtworkRequest(params.artworkId);
    }
  }

  render() {
    const {artwork, user, params} = this.props;
    let singleArtwork = getById(artwork.byId, params.artworkId);
    let owner = singleArtwork && singleArtwork.owner ? getById(user.byId, singleArtwork.owner) : null;
    let ownerUrl = owner ? `/${owner.username}` : null;

    if (artwork.isFetching) {
      return (<LoadingIndicatorComponent />);
    }

    if (!singleArtwork) {
      return (<NotFoundComponent />);
    }

    return (
      <div className="artwork-detail-bg">
        <div className="artwork-detail">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

              <div className="artwork-detail__wrap">

                <div className="artwork-detail__heading">
                  <div className="artwork-detail__title">{singleArtwork.title}</div>
                  <div className="artwork-detail__author">by {singleArtwork.author_name}</div>
                </div>

                <img className="artwork-detail__img" src={singleArtwork.thumb_url} />

                <div className="artwork-detail__info">

                  <div className="artwork-detail__format">{singleArtwork.format}</div>
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
                </div>
              </div>

            </div>
          </div>
        </div>
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
    user: state.user
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchSingleArtworkRequest: require('../actions/artwork/fetchSingleArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetailContainer);

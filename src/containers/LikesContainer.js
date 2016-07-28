import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import ProfileHeaderComponent from '../components/user/ProfileHeaderComponent';

import { getArtworkList } from '../reducers/artwork/index';
import { getCurrentUser } from '../reducers/users/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class LikesContainer extends Component {
  componentWillMount() {
    const {actions, user, params} = this.props;
    if (user && user.username !== params.username) {
      browserHistory.push('/');
      return;
    }
    actions.fetchArtworkRequest();
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  render() {
    const {artworkList, auth, actions, isFetching, user} = this.props;
    return (
      <div>

        <ProfileHeaderComponent user={user} />

        <div className="container">
          <YouSubMenuComponent user={user} />
          {
            isFetching
            ? <LoadingIndicatorComponent />
            : (<div>

                <div className="row">
                  <Masonry
                    options={masonryOptions}>
                  {
                    artworkList.map(artwork => {
                      return (
                        <ArtworkListItemComponent
                          isAuthenticated={auth.isAuthenticated}
                          key={artwork.id}
                          artwork={artwork}
                          pushArtwork={actions.pushArtwork}
                          openArtworkDetail={actions.openArtworkDetail} />
                      )
                    })
                  }
                  </Masonry>
                </div>

              </div>)
            }
          </div>
      </div>
    );
  }
}

LikesContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    artworkList: getArtworkList(state),
    auth: state.auth,
    user: getCurrentUser(state.user),
    isFetching: state.artwork.isFetching
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchArtworkRequest: require('../actions/artwork/fetchArtworkRequest.js'),
    fetchArtworkSuccess: require('../actions/artwork/fetchArtworkSuccess.js'),
    fetchArtworkFailure: require('../actions/artwork/fetchArtworkFailure.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    openArtworkDetail: require('../actions/artwork/openArtworkDetail.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesContainer);

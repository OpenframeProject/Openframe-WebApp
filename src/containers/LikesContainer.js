import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import YouSubMenuComponent from '../components/common/YouSubMenuComponent';
import MobileSubMenuComponent from '../components/common/MobileSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getArtworkList } from '../reducers/artwork/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class LikesContainer extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchArtworkRequest();
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  render() {
    const {artworkList, auth, actions, isFetching, user} = this.props;
    return (
      <div>
        <YouSubMenuComponent user={user.current} />
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
        <MobileSubMenuComponent />
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
    user: state.user,
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

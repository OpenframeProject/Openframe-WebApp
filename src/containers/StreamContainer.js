import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getArtworkList } from '../reducers/artwork/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class StreamContainer extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchArtworkRequest();
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  render() {
    const {artworkList, auth, actions, isFetching} = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent />
        {
          isFetching
          ? <LoadingIndicatorComponent />
          : (<div className="row">
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
              </div>)
        }
      </div>
    );
  }
}

StreamContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    artworkList: getArtworkList(state.artwork.ids, state.artwork.byId),
    auth: state.auth,
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

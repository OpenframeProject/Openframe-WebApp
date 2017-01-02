import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import ArtworkListItemContainer from './artwork/ArtworkListItemContainer';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';
import InfiniteMasonryComponent from '../components/common/InfiniteMasonryComponent';

import { getArtworkList } from '../reducers/artwork/index';
import { getCurrentUser } from '../reducers/user/index';

class StreamContainer extends Component {
  componentWillMount() {
    this._loadArtworks(0);
  }

  _loadArtworks(page) {
    const { actions } = this.props;
    actions.fetchStreamRequest(page);
  }

  render() {
    const { artworkList, isFirstLoad, location, streamHasMore, featureFlags } = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent featureFlags={featureFlags} />
        <div className="added-container__title visible-xs">Stream</div>
        {
          isFirstLoad
          ? <LoadingIndicatorComponent options={{ radius: 60, scale: .25 }}/>
          : (<div className="row">
                <InfiniteMasonryComponent
                  loadMore={::this._loadArtworks}
                  hasMore={streamHasMore}
                  endComponent={<div>That's all, folks.</div>} >
                {
                  artworkList.map(artwork => {
                    return (
                      <ArtworkListItemContainer
                        key={artwork.id}
                        location={location}
                        artwork={artwork} />
                    )
                  })
                }
                </InfiniteMasonryComponent>
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
    currentUser: getCurrentUser(state.user),
    artworkList: getArtworkList(state.artwork.streamIds, state.artwork.byId),
    streamHasMore: state.artwork.streamHasMore,
    isFirstLoad: state.artwork.isFirstLoad,
    featureFlags: state.featureFlags
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchStreamRequest: require('../actions/artwork/fetchStreamRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

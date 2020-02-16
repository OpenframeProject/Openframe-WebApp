import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CollectionListItemComponent from '../components/collection/CollectionListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';

import { getCollectionList } from '../reducers/collections/index';


class CollectionsContainer extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.fetchCollectionsRequest();
  }

  render() {
    const { collectionList, auth, actions } = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent />

        <div className="row">
          {
            collectionList.map(collection => (
                <CollectionListItemComponent
                  isAuthenticated={auth.isAuthenticated}
                  key={collection.id}
                  collection={collection}
                  pushCollection={actions.pushCollection} />
            ))
          }
        </div>
      </div>
    );
  }
}

CollectionsContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    collectionList: getCollectionList(state),
    auth: state.auth
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchCollectionsRequest: require('../actions/collections/fetchCollectionsRequest.js').default,
    fetchCollectionsSuccess: require('../actions/collections/fetchCollectionsSuccess.js').default,
    fetchCollectionsFailure: require('../actions/collections/fetchCollectionsFailure.js').default,
    pushCollection: require('../actions/collections/pushCollection.js').default
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer);

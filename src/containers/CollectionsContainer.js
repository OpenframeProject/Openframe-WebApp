import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CollectionsContainer extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.fetchCollectionsRequest();
  }

  render() {
    const {collections} = this.props;
    let items = collections.items;
    return (
      <div>
        {
          items.map(collection => (
              <div key={collection.id}>{collection.name}</div>
          ))
        }
      </div>
    );
  }
}

CollectionsContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    collections: state.collections
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchCollectionsRequest: require('../actions/collections/fetchCollectionsRequest.js'),
    fetchCollectionsSuccess: require('../actions/collections/fetchCollectionsSuccess.js'),
    fetchCollectionsFailure: require('../actions/collections/fetchCollectionsFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer);

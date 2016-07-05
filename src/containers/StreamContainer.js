import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class StreamContainer extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchArtworkRequest();
  }

  render() {
    const {artwork} = this.props;
    let items = artwork.items;
    return (
      <div>
        {
          items.map(work => (
              <div key={work.id}>
                {work.title}
              </div>
          ))
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
    artwork: state.artwork
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchArtworkRequest: require('../actions/artwork/fetchArtworkRequest.js'),
    fetchArtworkSuccess: require('../actions/artwork/fetchArtworkSuccess.js'),
    fetchArtworkFailure: require('../actions/artwork/fetchArtworkFailure.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);

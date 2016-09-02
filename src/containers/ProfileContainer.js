import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotFoundComponent from '../components/common/NotFoundComponent';
import Modal from 'react-modal';
import ArtworkDetailContainer from './ArtworkDetailContainer';

import { getProfileNotFound, getCurrentUser } from '../reducers/user/index';

class ProfileContainer extends Component {
  fetchUser(username) {
    const {actions} = this.props;
    actions.fetchUserRequest(username);
  }

  componentWillMount() {
    const {location, params} = this.props;
    this.fetchUser(params.username);
    this.artworkModal = null;
    console.log('componentWillMount', location, params);
    if (location.pathname.indexOf(`${params.username}/artwork/`) > 0) {
      console.log('OPEN THE MODAL!');
      this.artworkDetail = <ArtworkDetailContainer params={params} />;
      // this is an artwork detail page, let's load the correct children
      this.artworkModal = (
        <Modal
          isOpen={true}
          shouldCloseOnOverlayClick={true}
          className="of-modal modal-dialog"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={500}
          ref="modal-instance"
          >
          <div className="modal-content">
            <div className="modal-body">
              {this.artworkDetail}
            </div>
          </div>
        </Modal>
      );
    }
  }

  // componentWillUpdate() {
  //   this.fetchUser();
  // }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    const {params} = this.props;
    let username = params.username;

    if (nextProps.params.username !== username) {
      this.fetchUser(nextProps.params.username);
    }
  }

  render() {
    const { profileNotFound, location, params, route } = this.props;


    let isModal = (
      location.state &&
      location.state.modal
    );

    console.log('ProfileContainer', isModal, location, params, route);


    return (
      <div className="profile-container">
        { isModal
          ? this.artworkDetail
          : ( profileNotFound
              ? <NotFoundComponent></NotFoundComponent>
              : this.props.children
            )
        }




        { this.artworkModal }
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    profileNotFound: getProfileNotFound(state.user)
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUserRequest: require('../actions/user/fetchUserRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

'use strict';

import React, { PropTypes } from 'react';

import EditButtonComponent from '../common/EditButtonComponent';

require('styles/user/ProfileHeader.scss');

class ProfileHeaderComponent extends React.Component {

  _handleEditClick(e) {
    e.preventDefault();
    let { currentUser } = this.props;
  }


  render() {
    const { user, currentUser } = this.props;

    if (!user) return null;

    return (
      <div className="profile-header">
        <div className="profile-header__name">{user.full_name}</div>
        <div className="profile-header__social">{user.website} <span className="bullet">&nbsp; &bull; &nbsp;</span> {user.twitter}</div>
        <div className="profile-header__bio">{user.bio}</div>

        <div className="profile-header__actions">
          { user.id === currentUser.id
            ? <EditButtonComponent handleClick={::this._handleEditClick} />
            : null
          }
        </div>
      </div>
    );
  }
}

ProfileHeaderComponent.displayName = 'UserProfileHeaderComponent';

// Uncomment properties you need
ProfileHeaderComponent.propTypes = {
  user: PropTypes.object
};
// ProfileHeaderComponent.defaultProps = {};

export default ProfileHeaderComponent;

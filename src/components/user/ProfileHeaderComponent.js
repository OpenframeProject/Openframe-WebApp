'use strict';

import React, { PropTypes } from 'react';

require('styles/user/ProfileHeader.scss');

class ProfileHeaderComponent extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <div className="profile-header">
        <div className="profile-header__name">{user.full_name}</div>
        <div className="profile-header__social">{user.website} &bull; {user.twitter}</div>
        <div className="profile-header__bio">{user.bio}</div>
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

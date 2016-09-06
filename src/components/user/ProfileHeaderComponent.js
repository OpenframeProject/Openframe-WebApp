'use strict';

import React, { PropTypes } from 'react';

import EditButtonComponent from '../common/EditButtonComponent';

require('styles/user/ProfileHeader.scss');

class ProfileHeaderComponent extends React.Component {

  _handleEditClick(e) {
    e.preventDefault();
    let { openEditProfileModal } = this.props;
    console.log(openEditProfileModal);
    openEditProfileModal();
  }


  render() {
    const { user, currentUser } = this.props;

    if (!user) return null;

    return (
      <div className="profile-header">
        <div className="profile-header__name">{user.full_name}</div>
        { user.website || user.twitter
          ? <div className="profile-header__social">
            { user.website
              ? <a href={user.website} target="_blank">{user.website}</a>
              : null
            }
            { user.twitter
              ? <span> <span className="profile-header__bullet">&bull;</span>
                  <a href={`http://twitter.com/${user.twitter}`} target="_blank">@{user.twitter}</a>
                </span> : null
            }
            </div>
          : null
        }

        <div className="profile-header__bio">{user.bio}</div>

        <div className="profile-header__actions">
          { currentUser && user.id === currentUser.id
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

'use strict';

import React, { PropTypes } from 'react';

import { urlify } from '../../services/util';

import EditButtonComponent from '../common/EditButtonComponent';

require('styles/user/ProfileHeader.scss');

class ProfileHeaderComponent extends React.Component {
  render() {
    const { user, currentUser, updateVisibleModal } = this.props;

    if (!user) return null;

    return (
      <div className="profile-header">
        <div className="profile-header__name">{user.full_name || user.username}</div>
        { user.website || user.twitter
          ? <div className="profile-header__social">
            { user.website
              ? <a href={urlify(user.website)} target="_blank">{user.website}</a>
              : null
            }
            { user.website && user.twitter
              ? <span className="profile-header__bullet">&bull;</span>
              : null
            }
            { user.twitter
              ? <a href={`http://twitter.com/${user.twitter}`} target="_blank">@{user.twitter}</a>
              : null
            }
            </div>
          : null
        }
        <div className="profile-header__bio">{user.bio}</div>

        <div className="profile-header__actions">
          { currentUser && user.id === currentUser.id
            ? <EditButtonComponent handleClick={() => updateVisibleModal('edit-profile')} />
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

import {CREATE_ACCOUNT_SUCCESS} from './../const';
import updateNoticeBanner from '../ui/updateNoticeBanner';

module.exports = function(user, password) {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT_SUCCESS,
      user
    });

    let notice = {
      message: 'On it! A verification email has been sent to the address you provided. Please follow the link in the email to complete setting up your account.',
      type: 'info',
      dismissible: false
    };
    dispatch(updateNoticeBanner(notice));
  };
};
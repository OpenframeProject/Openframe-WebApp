import {PASSWORD_RESET_SUCCESS} from './../const';
import updateNoticeBanner from '../ui/updateNoticeBanner';

export default function(email) {
  return dispatch => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
    let notice = {
      message: `A password reset link has been sent to ${email}.`,
      type: 'info',
      dismissible: true
    };
    dispatch(updateNoticeBanner(notice));
  }
};
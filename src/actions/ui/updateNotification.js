import {UPDATE_NOTIFICATION} from './../const';

module.exports = function(notice) {
  const noticeAction = {
    type: UPDATE_NOTIFICATION,
    notice
  };
  return dispatch => {
    setTimeout(() => dispatch(noticeAction), 500);
  };
};

import {UPDATE_NOTICE_BANNER} from './../const';

module.exports = function(notice) {
  const noticeAction = {
    type: UPDATE_NOTICE_BANNER,
    notice
  };
  return dispatch => {
    setTimeout(() => dispatch(noticeAction), 500);
  };
};

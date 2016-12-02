import {UPDATE_NOTICE_BANNER} from './../const';

module.exports = function(notice) {
  const noticeAction = {
    type: UPDATE_NOTICE_BANNER,
    notice
  };
  return dispatch => {
    // if we want to animate, we need to delay the action
    // setTimeout(() => dispatch(noticeAction), 500);

    dispatch(noticeAction);
  };
};

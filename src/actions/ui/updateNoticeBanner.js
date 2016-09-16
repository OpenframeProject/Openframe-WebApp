import {UPDATE_NOTICE_BANNER} from './../const';

module.exports = function(notice) {
  return {
    type: UPDATE_NOTICE_BANNER,
    notice
  };
};

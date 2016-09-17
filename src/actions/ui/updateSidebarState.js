import {UPDATE_SIDEBAR_STATE} from './../const';

module.exports = function(open) {
  return {
    type: UPDATE_SIDEBAR_STATE,
    open
  };
};

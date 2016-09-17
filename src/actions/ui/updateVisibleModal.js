import {UPDATE_VISIBLE_MODAL} from './../const';

module.exports = function(modalSlug) {
  return {
    type: UPDATE_VISIBLE_MODAL,
    modalSlug
  };
};

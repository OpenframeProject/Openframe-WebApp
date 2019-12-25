import {UPDATE_VISIBLE_MODAL} from './../const';

export default function(modalSlug) {
  return {
    type: UPDATE_VISIBLE_MODAL,
    modalSlug
  };
};

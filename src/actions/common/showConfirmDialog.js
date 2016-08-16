import { SHOW_CONFIRM_DIALOG } from './../const';

module.exports = function(body, acceptAction, cancelAction) {
  return {
    type: SHOW_CONFIRM_DIALOG,
    payload: { body, acceptAction, cancelAction }
  };
};

import { SHOW_CONFIRM_DIALOG } from './../const';

export default function(body, acceptAction, cancelAction) {
  return {
    type: SHOW_CONFIRM_DIALOG,
    payload: { body, acceptAction, cancelAction }
  };
};

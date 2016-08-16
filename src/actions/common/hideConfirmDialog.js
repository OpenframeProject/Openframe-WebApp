import { HIDE_CONFIRM_DIALOG } from './../const';

module.exports = function(action) {
  return dispatch => {
    dispatch({
      type: HIDE_CONFIRM_DIALOG
    });

    // If closing the confirm dialog should trigger another action, dispatch it:
    if (action) {
      dispatch(action);
    }
  }
};

import {DELETE_ARTWORK_SUCCESS} from './../const';
const updateNotification = require('../ui/updateNotification.js');

module.exports = function(artwork) {
  return (dispatch) => {
    dispatch({ type: DELETE_ARTWORK_SUCCESS, artwork: artwork });
    let notification = {
      text: `<strong style="text-transform: uppercase;">${artwork.title}</strong> has been <strong>deleted</strong>.`,
      type: 'info',
      dismissible: true
    }
    dispatch(updateNotification(notification));
  };
};

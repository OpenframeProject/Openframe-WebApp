import {DELETE_ARTWORK_SUCCESS} from './../const';
const updateNoticeBanner = require('../ui/updateNoticeBanner.js');

module.exports = function(artwork) {
  return (dispatch) => {
    dispatch({ type: DELETE_ARTWORK_SUCCESS, artwork: artwork });
    dispatch(updateNoticeBanner(`<strong style="text-transform: uppercase;">${artwork.title}</strong> has been <strong>deleted</strong>.`));
  };
};

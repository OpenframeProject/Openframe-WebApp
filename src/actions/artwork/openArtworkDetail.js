import {OPEN_ARTWORK_DETAIL} from './../const';

module.exports = function(artworkId) {
  return { type: OPEN_ARTWORK_DETAIL, artworkId };
};

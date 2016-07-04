import {FETCH_COLLECTIONS_SUCCESS} from './../const';

module.exports = function(collections) {
  return { type: FETCH_COLLECTIONS_SUCCESS, collections };
};

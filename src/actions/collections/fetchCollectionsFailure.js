import {FETCH_COLLECTIONS_FAILURE} from './../const';

module.exports = function(collectionId) {
  return { type: FETCH_COLLECTIONS_FAILURE, collectionId };
};

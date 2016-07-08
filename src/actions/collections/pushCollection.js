import {PUSH_COLLECTION} from './../const';

module.exports = function(collectionId) {
  return { type: PUSH_COLLECTION, collectionId };
};

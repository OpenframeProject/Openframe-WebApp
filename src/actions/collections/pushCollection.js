import {PUSH_COLLECTION} from './../const';

export default function(collectionId) {
  return { type: PUSH_COLLECTION, collectionId };
};

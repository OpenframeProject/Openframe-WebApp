import { normalize } from 'normalizr';
import * as schema from '../schema';
import {FETCH_COLLECTIONS_SUCCESS} from './../const';

module.exports = function(response) {
  return {
    type: FETCH_COLLECTIONS_SUCCESS,
    response: normalize(response, schema.arrayOfCollections)
  };
};

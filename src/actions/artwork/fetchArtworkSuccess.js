import { normalize } from 'normalizr';
import * as schema from '../schema';
import {FETCH_ARTWORK_SUCCESS} from './../const';

module.exports = function(response) {
  return {
    type: FETCH_ARTWORK_SUCCESS,
    response: normalize(response, schema.arrayOfArtworks)
  };
};

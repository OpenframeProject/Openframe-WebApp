import { normalize } from 'normalizr';
import * as schema from '../schema';
import {FETCH_SINGLE_ARTWORK_SUCCESS} from './../const';

module.exports = function(response) {
  console.log('normalized', normalize(response, schema.artwork));
  return {
    type: FETCH_SINGLE_ARTWORK_SUCCESS,
    response: normalize(response, schema.artwork)
  };
};

import { normalize } from 'normalizr';
import * as schema from '../schema';
import {UPDATE_ARTWORK_SUCCESS} from './../const';

module.exports = function(response) {
  return {
    type: UPDATE_ARTWORK_SUCCESS,
    response: normalize(response, schema.artwork)
  };
};

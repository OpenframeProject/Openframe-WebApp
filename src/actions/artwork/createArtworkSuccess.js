import { normalize } from 'normalizr';
import * as schema from '../schema';
import {CREATE_ARTWORK_SUCCESS} from './../const';

module.exports = function(response) {
  return {
    type: CREATE_ARTWORK_SUCCESS,
    response: normalize(response, schema.artwork)
  };
};

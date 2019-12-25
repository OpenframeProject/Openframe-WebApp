import { normalize } from 'normalizr';
import * as schema from '../schema';
import {UPDATE_ARTWORK_SUCCESS} from './../const';

export default function(response) {
  return {
    type: UPDATE_ARTWORK_SUCCESS,
    response: normalize(response, schema.artwork)
  };
};

import { normalize } from 'normalizr';
import * as schema from '../schema';
import {FETCH_SINGLE_ARTWORK_SUCCESS} from './../const';

export default function(response) {
  return {
    type: FETCH_SINGLE_ARTWORK_SUCCESS,
    response: normalize(response, schema.artwork)
  };
};

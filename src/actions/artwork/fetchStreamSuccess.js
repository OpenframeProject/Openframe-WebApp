import { normalize } from 'normalizr';
import * as schema from '../schema';
import {FETCH_STREAM_SUCCESS} from './../const';

export default function(response) {
  return {
    type: FETCH_STREAM_SUCCESS,
    response: normalize(response, [schema.artwork])
  };
};

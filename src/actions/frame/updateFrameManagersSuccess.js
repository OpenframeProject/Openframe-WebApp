import {UPDATE_FRAME_MANAGERS_SUCCESS} from './../const';

import { normalize } from 'normalizr';
import * as schema from '../schema';

export default function(response) {
  return dispatch => {
    dispatch({ type: UPDATE_FRAME_MANAGERS_SUCCESS, response: normalize(response.frame, schema.frame) });
  }
};
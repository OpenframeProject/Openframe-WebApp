import { FRAME_UPDATED } from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';

module.exports = function(frame) {
  return { type: FRAME_UPDATED, response: normalize(frame, schema.frame) };
};

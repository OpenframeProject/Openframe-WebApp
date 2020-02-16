import { FRAME_UPDATED } from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';

export default function(frame) {
  console.log('FRAME', frame);
  return { type: FRAME_UPDATED, response: normalize(frame, schema.frame) };
}

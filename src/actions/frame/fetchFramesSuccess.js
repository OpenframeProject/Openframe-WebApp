import {FETCH_FRAMES_SUCCESS} from './../const';


import { normalize } from 'normalizr';
import * as schema from '../schema';


module.exports = function(response) {
  // frames = normalize(response.frames, schema.arrayOfFrames)
  let frames = response.frames;
  return { type: FETCH_FRAMES_SUCCESS, frames };
};

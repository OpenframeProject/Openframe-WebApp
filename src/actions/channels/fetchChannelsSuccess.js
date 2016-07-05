import {FETCH_CHANNELS_SUCCESS} from './../const';

module.exports = function(channels) {
  return { type: FETCH_CHANNELS_SUCCESS, channels };
};

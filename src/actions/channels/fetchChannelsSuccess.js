import {FETCH_CHANNELS_SUCCESS} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_CHANNELS_SUCCESS, parameter };
};

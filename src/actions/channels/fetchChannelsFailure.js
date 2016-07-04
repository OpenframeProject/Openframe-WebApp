import {FETCH_CHANNELS_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_CHANNELS_FAILURE, parameter };
};

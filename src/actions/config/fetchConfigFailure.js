import {FETCH_CONFIG_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_CONFIG_FAILURE, parameter };
};

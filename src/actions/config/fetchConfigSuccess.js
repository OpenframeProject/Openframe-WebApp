import {FETCH_CONFIG_SUCCESS} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_CONFIG_SUCCESS, parameter };
};

import {FETCH_CONFIG_REQUEST} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_CONFIG_REQUEST, parameter };
};

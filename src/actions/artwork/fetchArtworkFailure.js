import {FETCH_ARTWORK_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_ARTWORK_FAILURE, parameter };
};

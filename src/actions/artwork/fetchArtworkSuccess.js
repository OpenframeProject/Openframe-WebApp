import {FETCH_ARTWORK_SUCCESS} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_ARTWORK_SUCCESS, parameter };
};

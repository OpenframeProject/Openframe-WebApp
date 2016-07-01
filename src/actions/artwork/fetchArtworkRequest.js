import {FETCH_ARTWORK_REQUEST} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_ARTWORK_REQUEST, parameter };
};

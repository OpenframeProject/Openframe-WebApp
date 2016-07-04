import {FETCH_COLLECTIONS_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_COLLECTIONS_FAILURE, parameter };
};

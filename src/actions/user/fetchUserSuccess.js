import {FETCH_USER_SUCCESS} from './../const';

module.exports = function(user) {
  return { type: FETCH_USER_SUCCESS, user };
};

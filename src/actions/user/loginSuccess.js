import {LOGIN_SUCCESS} from './../const';

module.exports = function(accessToken) {
  return { type: LOGIN_SUCCESS, accessToken };
};

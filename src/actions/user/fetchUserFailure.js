import {FETCH_USER_FAILURE} from './../const';
import {clearToken} from '../../services/auth';
module.exports = function(parameter) {
  clearToken();
  return { type: FETCH_USER_FAILURE, parameter };
};

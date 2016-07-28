import {FETCH_CURRENT_USER_FAILURE} from './../const';
import {clearToken} from '../../services/auth';
module.exports = function(error) {
  clearToken();
  return { type: FETCH_CURRENT_USER_FAILURE, error };
};

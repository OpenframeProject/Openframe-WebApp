import {FETCH_CURRENT_USER_FAILURE} from './../const';
import {clearToken} from '../../services/auth';
export default function(error) {
  clearToken();
  return { type: FETCH_CURRENT_USER_FAILURE, error };
};

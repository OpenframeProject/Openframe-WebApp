import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  LOGOUT_SUCCESS
} from '../../actions/const';

export const isFetching = function(state = false, action) {

  switch(action.type) {
    case FETCH_USER_REQUEST:
    case FETCH_CURRENT_USER_REQUEST:
      return true;

    case FETCH_USER_SUCCESS:
    case FETCH_CURRENT_USER_SUCCESS:
    case FETCH_USER_FAILURE:
    case FETCH_CURRENT_USER_FAILURE:
    case LOGOUT_SUCCESS:
      return false;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

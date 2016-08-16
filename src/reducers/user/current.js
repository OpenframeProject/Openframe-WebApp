import {
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  LOGOUT_SUCCESS
} from '../../actions/const'

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_CURRENT_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return action.response.result;

    case FETCH_CURRENT_USER_FAILURE:
      return null;

    case LOGOUT_SUCCESS:
      return  null;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
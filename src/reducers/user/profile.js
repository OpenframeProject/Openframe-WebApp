import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT_SUCCESS
} from '../../actions/const'

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return action.response.result[0];

    case FETCH_USER_FAILURE:
    case LOGOUT_SUCCESS:
      return null;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
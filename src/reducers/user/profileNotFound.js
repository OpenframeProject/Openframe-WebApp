import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../../actions/const'

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return false;

    case FETCH_USER_FAILURE:
      return true;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
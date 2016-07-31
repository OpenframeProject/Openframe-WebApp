import {
  FETCH_USER_LIKES_SUCCESS
} from '../../actions/const'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_LIKES_SUCCESS:
      return action.response.result;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
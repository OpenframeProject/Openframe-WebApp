import {
  FETCH_USER_LIKES_SUCCESS,
  LOGOUT_SUCCESS
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_LIKES_SUCCESS:
      return {
        ...state,
        [action.userId]: action.response.result
      };
    case LOGOUT_SUCCESS:
      return {};
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
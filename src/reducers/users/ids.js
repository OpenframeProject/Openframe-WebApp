/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_USER_SUCCESS,
  FETCH_CURRENT_USER_SUCCESS
} from '../../actions/const'

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_SUCCESS: {
      // if the user isn't already in our list of ids, add it
      return state.indexOf(action.response.result) === -1
        ? [
          ...state,
          action.response.result
        ]
        : state
      ;
    }
    case FETCH_CURRENT_USER_SUCCESS: {
      // if the user isn't already in our list of ids, add it
      return state.indexOf(action.response.result) === -1
        ? [
          ...state,
          action.response.result
        ]
        : state
      ;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
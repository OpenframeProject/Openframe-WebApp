/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE
} from '../actions/const'

const initialState = {
  isFetching: false,
  items: []
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case FETCH_COLLECTIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.collections
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

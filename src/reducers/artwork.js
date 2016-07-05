/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_ARTWORK_REQUEST,
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORK_FAILURE
} from '../actions/const'

const initialState = {
  isFetching: false,
  items: []
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case FETCH_ARTWORK_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case FETCH_ARTWORK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.artwork
      };
    }
    case FETCH_ARTWORK_FAILURE: {
      return {
        ...state,
        isFetching: false
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

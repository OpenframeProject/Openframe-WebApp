/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from '../actions/const';

const initialState = {};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        current: action.user
      };

    case FETCH_USER_FAILURE:
      // Modify next state depending on the action and return it
      return {
        ...state,
        user: null,
        isFetching: false
      };

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

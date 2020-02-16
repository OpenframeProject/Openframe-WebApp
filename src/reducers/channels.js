/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE
} from '../actions/const'


const initialState = {
  isFetching: false,
  items: []
};

export default function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case FETCH_CHANNELS_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case FETCH_CHANNELS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.channels
      };
    }
    case FETCH_CHANNELS_FAILURE: {
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

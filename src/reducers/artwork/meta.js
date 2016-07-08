/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  FETCH_ARTWORK_REQUEST,
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORK_FAILURE,
  FETCH_SINGLE_ARTWORK_REQUEST,
  FETCH_SINGLE_ARTWORK_SUCCESS,
  FETCH_SINGLE_ARTWORK_FAILURE
} from '../../actions/const'

export const lastUpdated = function(state = null, action) {
  switch(action.type) {
    case FETCH_ARTWORK_SUCCESS: {
      return Date.now();
    }
    case FETCH_ARTWORK_FAILURE: {
      return Date.now();
    }
    case FETCH_SINGLE_ARTWORK_SUCCESS: {
      return Date.now();
    }
    case FETCH_SINGLE_ARTWORK_FAILURE: {
      return Date.now();
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

export const isFetching = function(state = false, action) {
  switch(action.type) {
    case FETCH_ARTWORK_REQUEST: {
      return true;
    }
    case FETCH_ARTWORK_SUCCESS: {
      return false;
    }
    case FETCH_ARTWORK_FAILURE: {
      return false;
    }
    case FETCH_SINGLE_ARTWORK_REQUEST: {
      return true;
    }
    case FETCH_SINGLE_ARTWORK_SUCCESS: {
      return false;
    }
    case FETCH_SINGLE_ARTWORK_FAILURE: {
      return false;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
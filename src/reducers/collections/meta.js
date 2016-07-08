/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  FETCH_SINGLE_COLLECTION_REQUEST,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  FETCH_SINGLE_COLLECTION_FAILURE
} from '../../actions/const'

export const lastUpdated = function(state = null, action) {
  switch(action.type) {
    case FETCH_COLLECTIONS_SUCCESS: {
      return Date.now();
    }
    case FETCH_COLLECTIONS_FAILURE: {
      return Date.now();
    }
    case FETCH_SINGLE_COLLECTION_SUCCESS: {
      return Date.now();
    }
    case FETCH_SINGLE_COLLECTION_FAILURE: {
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
    case FETCH_COLLECTIONS_REQUEST: {
      return true;
    }
    case FETCH_COLLECTIONS_SUCCESS: {
      return false;
    }
    case FETCH_COLLECTIONS_FAILURE: {
      return false;
    }
    case FETCH_SINGLE_COLLECTION_REQUEST: {
      return true;
    }
    case FETCH_SINGLE_COLLECTION_SUCCESS: {
      return false;
    }
    case FETCH_SINGLE_COLLECTION_FAILURE: {
      return false;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
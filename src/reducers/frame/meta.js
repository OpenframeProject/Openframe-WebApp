/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  FETCH_FRAMES_REQUEST,
  FETCH_FRAMES_SUCCESS,
  FETCH_FRAMES_FAILURE,
  FRAME_UPDATED,
  PUSH_ARTWORK
} from '../../actions/const'

export const lastUpdated = function(state = null, action) {
  switch(action.type) {
    case FETCH_FRAMES_SUCCESS:
    case FETCH_FRAMES_FAILURE:
    case FRAME_UPDATED: {
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
    case FETCH_FRAMES_REQUEST: {
      return true;
    }
    case FETCH_FRAMES_SUCCESS:
    case FETCH_FRAMES_FAILURE: {
      return false;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

export const isPushing = function(state = false, action) {
  switch(action.type) {
    case PUSH_ARTWORK: {
      return true;
    }
    case FRAME_UPDATED: {
      return false;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
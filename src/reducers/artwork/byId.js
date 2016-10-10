/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_STREAM_SUCCESS,
  FETCH_SINGLE_ARTWORK_SUCCESS,
  UPDATE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_SUCCESS,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  FETCH_USER_ARTWORK_SUCCESS,
  FETCH_USER_LIKES_SUCCESS,
  FETCH_FRAMES_SUCCESS,
  CREATE_ARTWORK_SUCCESS,
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_STREAM_SUCCESS:
    case CREATE_ARTWORK_SUCCESS:
    case UPDATE_ARTWORK_SUCCESS:
    case FETCH_SINGLE_COLLECTION_SUCCESS:
    case FETCH_USER_ARTWORK_SUCCESS:
    case FETCH_USER_LIKES_SUCCESS:
    case FETCH_SINGLE_ARTWORK_SUCCESS:
    case FETCH_FRAMES_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.artwork
      };
    }
    case DELETE_ARTWORK_SUCCESS: {
      let newState = {
        ...state
      };
      delete newState[action.artwork.id];
      return newState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
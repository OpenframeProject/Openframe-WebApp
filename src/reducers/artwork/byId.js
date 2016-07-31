/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_STREAM_SUCCESS,
  FETCH_SINGLE_ARTWORK_SUCCESS,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  FETCH_USER_ARTWORK_SUCCESS,
  FETCH_USER_LIKES_SUCCESS
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_STREAM_SUCCESS:
    case FETCH_SINGLE_COLLECTION_SUCCESS:
    case FETCH_USER_ARTWORK_SUCCESS:
    case FETCH_USER_LIKES_SUCCESS:
    case FETCH_SINGLE_ARTWORK_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.artwork
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
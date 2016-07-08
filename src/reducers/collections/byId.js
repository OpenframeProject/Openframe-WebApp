/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_SINGLE_COLLECTION_SUCCESS
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.collection
      };
    }
    case FETCH_SINGLE_COLLECTION_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.collection
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
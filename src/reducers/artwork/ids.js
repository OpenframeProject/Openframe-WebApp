/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { uniq } from 'lodash';

import {
  FETCH_STREAM_SUCCESS,
  CREATE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_SUCCESS,
  FETCH_SINGLE_ARTWORK_SUCCESS,
  FETCH_USER_ARTWORK_SUCCESS
} from '../../actions/const'

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {

    // Array of artworks... concat with state and make sure entries are unique
    case FETCH_STREAM_SUCCESS:
    case FETCH_USER_ARTWORK_SUCCESS: {
      let ids = [
        ...state,
        ...action.response.result
      ];
      return uniq(ids);
    }

    // Single artwork... push onto state and make sure entries are unique
    case FETCH_SINGLE_ARTWORK_SUCCESS:
    case CREATE_ARTWORK_SUCCESS: {
      let ids = [
        ...state,
        action.response.result
      ];
      return uniq(ids);
    }

    case DELETE_ARTWORK_SUCCESS: {
      let ids = [
        ...state
      ];
      let index = ids.indexOf(action.artwork.id);
      if (index > -1) {
          ids.splice(index, 1);
      }
      return ids;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
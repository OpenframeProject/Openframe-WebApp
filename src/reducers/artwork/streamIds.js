/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { uniq } from 'lodash';

import {
  FETCH_STREAM_SUCCESS
} from '../../actions/const'

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {

    // Array of artworks... concat with state and make sure entries are unique
    case FETCH_STREAM_SUCCESS: {
      let ids = [
        ...state,
        ...action.response.result
      ];
      return uniq(ids);
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
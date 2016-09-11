/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  FETCH_STREAM_SUCCESS
} from '../../actions/const'

const initialState = true;

export default function(state = initialState, action) {
  switch(action.type) {

    // Array of artworks... concat with state and make sure entries are unique
    case FETCH_STREAM_SUCCESS: {
        return action.response.result.length !== 0;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  EDIT_ARTWORK,
  DELETE_ARTWORK_SUCCESS
} from '../../actions/const'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case EDIT_ARTWORK:
      return action.artworkId;
    case DELETE_ARTWORK_SUCCESS:
      return null;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
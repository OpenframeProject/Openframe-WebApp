/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  EDIT_FRAME_SETTINGS
} from '../../actions/const'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case EDIT_FRAME_SETTINGS:
      return action.frameId;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
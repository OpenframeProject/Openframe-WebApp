/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  OPEN_FRAME_SETTINGS_MODAL
} from '../../actions/const'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_FRAME_SETTINGS_MODAL:
      return action.frameId;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
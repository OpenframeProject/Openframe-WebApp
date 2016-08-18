/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  SELECT_FRAME,
  LOGOUT_SUCCESS
} from '../../actions/const'

// pull selected frame id from localStorage, if present
let _selectedFrameId = null;
try {
    _selectedFrameId = localStorage.getItem('selectedFrameId');
} catch(e) {
}

const initialState = _selectedFrameId;

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_FRAME:
      return action.frameId;
    case LOGOUT_SUCCESS:
      return null;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {OPEN_SIDEBAR, CLOSE_SIDEBAR} from '../actions/const';

const initialState = {
  sidebarOpen: false
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: true
      };
    }
    case CLOSE_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: false
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_FRAMES_SUCCESS,
  FRAME_UPDATED
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_FRAMES_SUCCESS:
    case FRAME_UPDATED: {
      return {
        ...state,
        ...action.response.entities.frames
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_USER_SUCCESS,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_SINGLE_ARTWORK_SUCCESS,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  UPDATE_USER_SUCCESS,
  FETCH_FRAMES_SUCCESS,
  UPDATE_FRAME_MANAGERS_SUCCESS
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
    case FETCH_CURRENT_USER_SUCCESS:
    case FETCH_SINGLE_COLLECTION_SUCCESS:
    case FETCH_SINGLE_ARTWORK_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case FETCH_FRAMES_SUCCESS:
    case UPDATE_FRAME_MANAGERS_SUCCESS:
      // if we already have some data for incoming user, merge the properties rather than replacing
      // entire object
      let incomingUsers = action.response.entities.user;
      let updatedUsers = {};
      if (incomingUsers) {
        Object.keys(incomingUsers).map(id => {
          updatedUsers[id] = state[id] ? {...state[id], ...incomingUsers[id] } : incomingUsers[id];
        });
      }
      return {
        ...state,
        ...updatedUsers
      };
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
import {
  FETCH_USER_LIKES_SUCCESS,
  DELETE_ARTWORK_SUCCESS,
  LOGOUT_SUCCESS
} from '../../actions/const'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_LIKES_SUCCESS:
      return action.response.result;
    case LOGOUT_SUCCESS:
      return [];
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
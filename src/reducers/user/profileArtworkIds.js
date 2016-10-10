import { uniq } from 'lodash';

import {
  FETCH_USER_ARTWORK_SUCCESS,
  LOGOUT_SUCCESS,
  CREATE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_SUCCESS
} from '../../actions/const'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_ARTWORK_SUCCESS:
      return action.response.result;
    case CREATE_ARTWORK_SUCCESS:
      let ids = [
        action.response.result,
        ...state
      ];
      return uniq(ids);
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
    case LOGOUT_SUCCESS:
      return [];
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
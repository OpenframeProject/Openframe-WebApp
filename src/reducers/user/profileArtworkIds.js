import { uniq } from 'lodash';

import {
  FETCH_USER_ARTWORK_SUCCESS,
  LOGOUT_SUCCESS,
  CREATE_ARTWORK_SUCCESS
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
    case LOGOUT_SUCCESS:
      return [];
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
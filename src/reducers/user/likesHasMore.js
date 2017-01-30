import config from 'config';

import {
  FETCH_USER_LIKES_SUCCESS
} from '../../actions/const'

const initialState = true;

export default function(state = initialState, action) {
  switch(action.type) {

    // if the incoming result # is 0, we're at the end.
    case FETCH_USER_LIKES_SUCCESS: {
        return action.response.result.length === config.perPage;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
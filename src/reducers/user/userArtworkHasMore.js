import config from 'config';

import {
  FETCH_USER_ARTWORK_SUCCESS
} from '../../actions/const'

const initialState = true;

export default function(state = initialState, action) {
  switch(action.type) {

    // if the incoming result # is < config.perPage, we're at the end.
    case FETCH_USER_ARTWORK_SUCCESS: {
        return action.response.result.length === config.perPage;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
import config from 'config';

import {
  FETCH_STREAM_SUCCESS
} from '../../actions/const'

const initialState = true;

export default function(state = initialState, action) {
  switch(action.type) {

    // Array of artworks... concat with state and make sure entries are unique
    case FETCH_STREAM_SUCCESS: {
        return action.response.result.length === config.perPage;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
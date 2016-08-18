/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE
} from '../actions/const';

const initialState = {
  isFetching: false,
  pubsub_url: null
};

module.exports = function(state = initialState, action) {
   switch(action.type) {

    case FETCH_CONFIG_REQUEST:
      return {...state,
        isFetching: true,
        pubsub_url: null
      };

    case FETCH_CONFIG_SUCCESS:
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        pubsub_url: action.config.pubsub_url
      };

    case FETCH_CONFIG_FAILURE:
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        pubsub_url: null,
        configError: 'Problem connecting to server.'
      };

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/const';
import {getToken} from '../services/auth';

const initialState = {
  isFetching: false,
  accessToken: getToken(),
  isAuthenticated: false
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

   switch(action.type) {

    case LOGIN_REQUEST:
      // Modify next state depending on the action and return it
      return {...state,
        isFetching: true,
        accessToken: null
      };

    case LOGIN_SUCCESS:
      // Modify next state depending on the action and return it
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        accessToken: action.token,
        isAuthenticated: true
      };

    case LOGIN_FAILURE:
      // Modify next state depending on the action and return it
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        accessToken: null,
        isAuthenticated: false
      };

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

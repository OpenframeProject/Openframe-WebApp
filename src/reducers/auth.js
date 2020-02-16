/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  FETCH_CURRENT_USER_SUCCESS
} from '../actions/const';
import {getToken} from '../services/auth';

const initialState = {
  isFetching: false,
  accessToken: getToken(),
  isAuthenticated: false
};

export default function(state = initialState, action) {
   switch(action.type) {

    case LOGIN_REQUEST:
      return {...state,
        isFetching: true,
        accessToken: null
      };

    case LOGIN_SUCCESS:
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        accessToken: action.token,
        isAuthenticated: true
      };

    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        accessToken: null,
        isAuthenticated: false
      };

    case FETCH_CURRENT_USER_SUCCESS:
      return {...state,
        isFetching: false,
        lastUpdated: Date.now(),
        isAuthenticated: true
      };

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

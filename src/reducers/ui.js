/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  OPEN_ARTWORK_DETAIL,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  OPEN_CREATE_ACCOUNT_MODAL,
  CLOSE_CREATE_ACCOUNT_MODAL,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  SELECT_FRAME
} from '../actions/const';

const initialState = {
  sidebarOpen: false,
  loginModalOpen: false,
  createError: null
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: true
      };
    }
    case CLOSE_SIDEBAR:
    case SELECT_FRAME:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        sidebarOpen: false
      };
    case OPEN_ARTWORK_DETAIL: {
      return {
        ...state,
        showArtworkDetail: true,
        artworkDetailId: action.artworkId
      }
    }
    case OPEN_LOGIN_MODAL: {
      return {
        ...state,
        loginModalOpen: true
      }
    }
    case CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        loginModalOpen: false
      }
    }
    case OPEN_CREATE_ACCOUNT_MODAL: {
      return {
        ...state,
        createAccountModalOpen: true,
        createError: null
      }
    }
    case CLOSE_CREATE_ACCOUNT_MODAL: {
      return {
        ...state,
        createAccountModalOpen: false,
        createError: null
      }
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginModalOpen: false
      }
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        createAccountModalOpen: false,
        createError: null
      }
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        createError: action.error
      }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {OPEN_SIDEBAR, CLOSE_SIDEBAR, OPEN_ARTWORK_DETAIL, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, LOGIN_SUCCESS} from '../actions/const';

const initialState = {
  sidebarOpen: false,
  loginModalOpen: false
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: true
      };
    }
    case CLOSE_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: false
      };
    }
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
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginModalOpen: false
      }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

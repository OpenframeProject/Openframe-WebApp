import { uniq, filter } from 'lodash';

import {
  FETCH_USER_LIKES_SUCCESS,
  LIKE_ARTWORK_REQUEST,
  UNLIKE_ARTWORK_REQUEST,
  LOGOUT_SUCCESS
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_LIKES_SUCCESS:
      return {
        ...state,
        [action.userId]: action.response.result
      };
    case LIKE_ARTWORK_REQUEST: {
      let ids = [
        ...state[action.userId],
        action.artworkId
      ];
      return {
        ...state,
        [action.userId]: uniq(ids)
      }
    }
    case UNLIKE_ARTWORK_REQUEST: {
      let ids = filter(state[action.userId], (n) => {
        return n !== action.artworkId
      });
      return {
        ...state,
        [action.userId]: uniq(ids)
      }
    }
    case LOGOUT_SUCCESS:
      return {};
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}